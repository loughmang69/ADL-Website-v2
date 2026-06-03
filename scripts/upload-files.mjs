/**
 * One-off content loader: uploads featured images as Sanity assets and
 * creates+publishes three blog posts whose bodies were converted from the
 * Word drafts in the Marketing/Blog/Drafts folder.
 *
 * Reads credentials from .env.local. Uses createOrReplace against the
 * published document IDs (post-<slug>) so the posts go live immediately,
 * matching the existing five posts in the dataset.
 *
 * Run from the project root:
 *   node scripts/upload-files.mjs
 *
 * Idempotent: re-running re-uploads the images and replaces the documents.
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
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN in .env.local");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

// Bodies (Portable Text) were converted from the .docx drafts and frozen here.
const posts = JSON.parse(readFileSync(join(__dirname, "posts-data.json"), "utf8"));

// Per-post featured image: source file + alt text.
const images = {
  "post-quickbooks-setup-problems": {
    path: "C:/Users/lough/Downloads/quickbooks.jpg",
    alt: "A laptop showing accounting software, ready for QuickBooks setup",
  },
  "post-tax-preparation-vs-planning": {
    path: "C:/Users/lough/Downloads/tax.jpg",
    alt: "A desk with tax documents and a calculator for tax planning",
  },
  "post-choosing-a-business-entity": {
    path: "C:/Users/lough/Downloads/entity.jpg",
    alt: "A small business owner reviewing business entity formation paperwork",
  },
};

async function run() {
  for (const post of posts) {
    const img = images[post._id];
    if (!img) throw new Error(`No image mapping for ${post._id}`);

    process.stdout.write(`Uploading image for ${post._id}... `);
    const asset = await client.assets.upload("image", createReadStream(img.path), {
      filename: img.path.split("/").pop(),
    });
    console.log(`asset ${asset._id}`);

    const doc = {
      ...post,
      featuredImage: {
        _type: "image",
        alt: img.alt,
        asset: { _type: "reference", _ref: asset._id },
      },
    };

    await client.createOrReplace(doc);
    console.log(`  published ${post._id} (${post.body.length} blocks) -> /blog/${post.slug.current}`);
  }
  console.log("\nDone. All three posts are live.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
