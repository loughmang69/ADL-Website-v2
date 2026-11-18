#!/usr/bin/env node
/**
 * Site truth check. Runs before every build (npm "prebuild") and on demand
 * with `npm run check:truth`.
 *
 * Fails when the code starts doing something the Privacy Policy does not
 * describe:
 *   1. An outside domain appears in the code that is not in site-truth.json.
 *   2. A package is added to dependencies that is not in site-truth.json.
 *   3. A listed service that receives visitor data is not named on the
 *      Privacy Policy page.
 *   4. A forbidden pattern appears (cookies, browser storage, ad pixels, chat
 *      widgets, schedulers) that the Privacy Policy says the site doesn't use.
 *
 * A failure is not a bug to silence: it means a human decision is needed.
 * Read AGENTS.md, "Keeping the site truthful", before editing site-truth.json.
 * Uses only Node built-ins so it runs anywhere the build runs.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, extname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(import.meta.url), "..", "..");
const config = JSON.parse(readFileSync(join(root, "site-truth.json"), "utf8"));
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const privacyPath = join(root, "src", "app", "(site)", "privacy", "page.tsx");
const privacyText = readFileSync(privacyPath, "utf8");

const SCAN_DIRS = ["src", "public"];
const SCAN_FILES = ["next.config.ts", "vercel.json"];
const SCAN_EXT = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".css", ".html", ".json", ".txt"]);
// The Sanity Studio is owner-only and pulls in its own tooling; it is not
// served to visitors through the site's pages.
const SKIP = [join("src", "app", "studio")];

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const rel = relative(root, full);
    if (SKIP.some((s) => rel.startsWith(s))) continue;
    const st = statSync(full);
    if (st.isDirectory()) walk(full, out);
    else if (SCAN_EXT.has(extname(name))) out.push(full);
  }
  return out;
}

const files = [
  ...SCAN_DIRS.flatMap((d) => walk(join(root, d))),
  ...SCAN_FILES.map((f) => join(root, f)),
];

const problems = [];
const knownHosts = Object.keys(config.externalHosts);

function hostAllowed(host) {
  return knownHosts.some((h) =>
    h.startsWith("*.") ? host === h.slice(2) || host.endsWith(h.slice(1)) || host === h : host === h,
  );
}

// 1 + 4: scan source files.
const urlRe = /https?:\/\/([*a-zA-Z0-9.-]+)/g;
const forbidden = config.forbiddenPatterns.map((f) => ({ ...f, re: new RegExp(f.pattern, "i") }));
for (const file of files) {
  const rel = relative(root, file);
  const text = readFileSync(file, "utf8");
  for (const m of text.matchAll(urlRe)) {
    const host = m[1].toLowerCase().replace(/\.$/, "");
    if (!host || host === "localhost" || host.startsWith("127.")) continue;
    if (!hostAllowed(host)) {
      problems.push(
        `New outside domain "${host}" in ${rel}.\n` +
          `    Decide: does it load anything in visitors' browsers or receive their data?\n` +
          `    If yes, update the Privacy Policy first. Then add it to site-truth.json.`,
      );
    }
  }
  if (rel === "site-truth.json") continue;
  text.split("\n").forEach((line, i) => {
    for (const f of forbidden) {
      if (f.re.test(line)) {
        problems.push(`${rel}:${i + 1} matches a restricted pattern (${f.pattern}).\n    ${f.why}`);
      }
    }
  });
}

// 2: dependencies.
for (const dep of Object.keys(pkg.dependencies ?? {})) {
  if (!config.dependencies[dep]) {
    problems.push(
      `New package "${dep}" in package.json dependencies.\n` +
        `    Decide: does it run in visitors' browsers or send their data anywhere?\n` +
        `    If yes, update the Privacy Policy first. Then add it to site-truth.json.`,
    );
  }
}

// 3: every data-receiving service is named on the Privacy Policy page.
const mustName = new Set(
  [...Object.values(config.externalHosts), ...Object.values(config.dependencies)]
    .map((e) => e.disclosedAs)
    .filter(Boolean),
);
for (const name of mustName) {
  if (!privacyText.includes(name)) {
    problems.push(`The Privacy Policy page does not mention "${name}", which receives visitor data.`);
  }
}

// De-duplicate (the same host can appear many times in one file).
const unique = [...new Set(problems)];
if (unique.length) {
  console.error("\nSite truth check FAILED. The site would no longer match its Privacy Policy:\n");
  unique.forEach((p) => console.error(`  - ${p}\n`));
  console.error("See AGENTS.md, 'Keeping the site truthful'.\n");
  process.exit(1);
}
console.log(
  `Site truth check passed: ${files.length} files, ${knownHosts.length} approved domains, ` +
    `${Object.keys(config.dependencies).length} approved packages, ${mustName.size} services named in the Privacy Policy.`,
);
