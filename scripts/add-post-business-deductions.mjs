/**
 * Content loader for the "Business Deductions" post.
 *
 * Converts the approved markdown draft in the Marketing/Blog/Drafts folder to
 * Portable Text, uploads the branded thumbnail as a Sanity asset, and writes an
 * UNPUBLISHED DRAFT (drafts.post-<slug>) so it can be reviewed before going live.
 *
 * Unlike scripts/upload-files.mjs (which used createOrReplace against published
 * IDs), this deliberately targets the drafts.* ID. Nothing appears on the live
 * site until the draft is published in the Studio.
 *
 * Run from the project root:
 *   node scripts/add-post-business-deductions.mjs
 *
 * Idempotent: re-running re-uploads the image and replaces the draft.
 */
import { createClient } from "@sanity/client";
import { readFileSync, createReadStream } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

// --- Minimal .env.local parser (no extra dependency) ---
function loadEnv(file) {
  const out = {};
  for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  return out;
}
const env = loadEnv(join(root, ".env.local"));

const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";
const token = env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN in .env.local",
  );
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

const DRAFT_DIR =
  "C:/Users/lough/My Drive/ADL Business Consulting, PC/_My Business/Marketing/Blog/Drafts";
const SOURCE_MD = join(DRAFT_DIR, "business-deductions-missed-misunderstood.md");
const THUMBNAIL = join(DRAFT_DIR, "business-deductions-missed-misunderstood-thumb.png");

const SLUG = "business-deductions-missed-misunderstood";
const PUBLISHED_ID = `post-${SLUG}`;
const DRAFT_ID = `drafts.${PUBLISHED_ID}`;

const ALT =
  "Business Deductions: what you're missing and what you're misunderstanding";

// --- Markdown -> Portable Text -------------------------------------------------

let keySeq = 0;
const nextKey = (prefix) => `${prefix}${String(++keySeq).padStart(3, "0")}`;

/**
 * Splits a paragraph into Portable Text spans, turning markdown inline links
 * into link markDefs. Only links are supported because the approved copy has
 * no bold, italics, or code in the body.
 */
function toSpans(text) {
  const markDefs = [];
  const children = [];
  const linkRe = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m;

  while ((m = linkRe.exec(text)) !== null) {
    if (m.index > last) {
      children.push({
        _type: "span",
        _key: nextKey("s"),
        text: text.slice(last, m.index),
        marks: [],
      });
    }
    const markKey = nextKey("lnk");
    markDefs.push({ _key: markKey, _type: "link", href: m[2] });
    children.push({
      _type: "span",
      _key: nextKey("s"),
      text: m[1],
      marks: [markKey],
    });
    last = m.index + m[0].length;
  }
  if (last < text.length) {
    children.push({
      _type: "span",
      _key: nextKey("s"),
      text: text.slice(last),
      marks: [],
    });
  }
  return { markDefs, children };
}

function markdownToPortableText(md) {
  // Everything after the instruction comment block is the approved copy.
  const content = md.split("-->").slice(1).join("-->");
  const blocks = [];

  for (const raw of content.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) continue;

    // The h1 becomes the document title; the trailing rule and hand-written
    // "Related reading" list are dropped because <RelatedPosts /> renders them.
    if (line.startsWith("# ")) continue;
    if (line === "---") break;

    let style = "normal";
    let text = line;
    if (line.startsWith("### ")) {
      style = "h3";
      text = line.slice(4);
    } else if (line.startsWith("## ")) {
      style = "h2";
      text = line.slice(3);
    }

    const { markDefs, children } = toSpans(text);
    blocks.push({ _key: nextKey("b"), _type: "block", style, markDefs, children });
  }

  return blocks;
}

// --- Run -----------------------------------------------------------------------

async function run() {
  const body = markdownToPortableText(readFileSync(SOURCE_MD, "utf8"));

  const emDashes = JSON.stringify(body).match(/\u2014|\u2013/g);
  if (emDashes) throw new Error(`Found ${emDashes.length} em/en dash(es) in the body`);

  process.stdout.write("Uploading thumbnail... ");
  const asset = await client.assets.upload("image", createReadStream(THUMBNAIL), {
    filename: "business-deductions-missed-misunderstood-thumb.png",
  });
  console.log(`asset ${asset._id}`);

  const doc = {
    _id: DRAFT_ID,
    _type: "blogPost",
    title: "Business Deductions: What You're Missing and What You're Misunderstanding",
    slug: { _type: "slug", current: SLUG },
    publishedAt: "2026-08-19T16:00:00.000Z",
    category: "Tax",
    excerpt:
      "Two problems cost small business owners money: deductions they never claim, and deductions they claim the wrong way. Five of each, updated for 2026.",
    seoDescription:
      "Ten business deductions owners miss or misapply: the 2026 meals change under IRC 274(o), home office rules by entity, and the S Corp health insurance trap.",
    featuredImage: {
      _type: "image",
      alt: ALT,
      asset: { _type: "reference", _ref: asset._id },
    },
    body,
  };

  await client.createOrReplace(doc);

  const chars = body
    .flatMap((b) => b.children.map((c) => c.text))
    .join(" ").length;
  console.log(`Created DRAFT ${DRAFT_ID}`);
  console.log(`  ${body.length} blocks, computed read time ~${Math.round(chars / 5 / 200)} min`);
  console.log(`  Not published. Live site is unchanged.`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
