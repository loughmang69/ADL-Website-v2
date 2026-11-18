# ADL Business Consulting — Agent Notes

Stack: **Next.js 15 (App Router) + React 19 + TypeScript (strict)**, Tailwind CSS **v3**,
Framer Motion, Sanity v3 (embedded Studio at `/studio`), Resend, Zod, Upstash rate limiting.
Deployed to Vercel. Built from `ADL_Website_Redesign_Prompt.md` (one directory up).

## Conventions

- Routes live under `src/app`. Marketing pages are in the `(site)` route group, which
  owns the Nav + Footer chrome. The root `layout.tsx` is intentionally minimal (html/body
  + fonts) so the Sanity Studio at `/studio` renders without site chrome.
- Phosphor icons: import the **`*Icon`-suffixed** names from `@phosphor-icons/react/dist/ssr`
  (the bare names are deprecated). Import the `Icon`/`IconProps` *types* from `@phosphor-icons/react`.
- Sanity reads go through `sanityFetch()` in `src/lib/sanity/client.ts` (fails soft to a
  fallback so the build works without a populated dataset). Writes use `getWriteClient()`
  (server-only token).
- Every read is tagged `"sanity"` and revalidates every 60s. For instant updates, a Sanity
  webhook POSTs to `/api/revalidate` (`SANITY_REVALIDATE_SECRET` bearer token), which calls
  `revalidateTag("sanity")` to purge the homepage preview, `/blog`, `/blog/[slug]`, and the
  sitemap at once. New posts therefore appear in both places automatically — no code change.
- Service data is in `src/data/services.ts`; pricing in `src/data/packages.ts` (empty by design).
  Verbatim site copy and NAP are in `src/data/content.ts` (items marked `TODO(verbatim)`).
- Animations: only `transform` + `opacity`; wrap motion in `useReducedMotion()`.

## Env

Copy `.env.example` → `.env.local`. `NEXT_PUBLIC_SANITY_PROJECT_ID` and `RESEND_API_KEY`
are set; `SANITY_API_TOKEN` (Editor) and Upstash creds are still needed for testimonial
writes and rate limiting respectively.

## Working on this site (process)

Garrett approves every change before it goes live. `main` auto-deploys to
production, so never push to `main` without his explicit OK.

1. Branch off `main`. Make the change.
2. Run `npm run check:truth`, `npx tsc --noEmit`, `npx next lint`, and
   `npx next build`. Then browser-test the affected pages (Playwright works).
3. Do the truth review below and write down what else the change touched.
4. Push the branch. Vercel builds a preview. Confirm it is READY and spot-check
   it, then send Garrett the preview link plus the truth-review list.
5. On his OK, fast-forward `main` (check `origin/main` hasn't moved first),
   wait for the production deploy, and verify the live site.

Local build notes:
- The build needs `NEXT_PUBLIC_SANITY_PROJECT_ID`. Any placeholder works
  (`sanityFetch` fails soft); without it the sitemap route throws.
- The contact form is on the home page (`/#contact`). There is no `/contact`.
- Locally and on previews, Turnstile uses Cloudflare's always-pass test key
  (see `next.config.ts`), so the form still submits. Locally, `RESEND_API_KEY`
  is unset, so a valid submission ends with "Email delivery failed": that
  means it passed validation and reached the send step.
- The blue "A new version of this site is available" banner in local
  screenshots is `VersionWatcher` comparing build IDs. Not a bug.

## Keeping the site truthful

Every change can make something else on the site untrue. Two layers guard
against that.

**Automatic: `scripts/check-site-truth.mjs`** runs before every build
(`prebuild`, including on Vercel) and fails if the code adds an outside
domain or package that isn't in `site-truth.json`, uses cookies or browser
storage, adds a known ad pixel, chat widget, or scheduler, or if the Privacy
Policy stops naming a service that receives visitor data. When it fails, do
not just add the entry to make it pass. Decide whether the new thing loads in
visitors' browsers or receives their data. If it does, update the Privacy
Policy (and `LEGAL_EFFECTIVE_DATE`) in the same change, tell Garrett, and
only then add it to `site-truth.json`. Tracking pixels, session replay, and
chat widgets also carry California wiretap (CIPA) lawsuit risk: they need
Garrett's decision, not just a policy update.

**Manual: the truth review.** Before sending a preview, check the change
against this map. If you change a fact, change it everywhere it appears:

| Fact | Where it appears |
|---|---|
| Outside services, scripts, embeds, what visitors' data goes where | `/privacy`, `site-truth.json`, the CSP in `next.config.ts`, `LEGAL_EFFECTIVE_DATE` |
| Form fields (what we collect) | `/privacy` "Information we collect", `src/lib/validations/*`, `src/lib/resend/templates/*` |
| Text of `/privacy`, `/terms`, `/accessibility` | `LEGAL_EFFECTIVE_DATE` in `src/data/content.ts` (bump it) |
| Accessibility features (skip link, reduced motion, labels) | `/accessibility` lists them; removing one makes that page untrue |
| Garrett's CPA license #150109, CPA since 2013 | `content.ts` (SITE, ABOUT_BIO), `Hero.tsx`, `HeadshotFrame.tsx`, `og-image.png/route.tsx`, `/disclaimer`, `public/llms.txt`, `public/.well-known/agents.json` |
| Firm license #10249 | `content.ts` (SITE.firmLicense), footer, `/disclaimer`, `public/llms.txt` |
| "15+ years" experience | `Hero.tsx`, `About.tsx`, `AuthorBio.tsx`, `content.ts`, `public/llms.txt` |
| Services offered | `src/data/services.ts`, `HELP_OPTIONS` (contact form and its validation), footer, `public/llms.txt` |
| Promises: free consultation, "Response within 2 business days", the ADL Approach steps | `content.ts` (ADL_APPROACH), `ContactForm.tsx` VALUE_PROPS, every "Request a Free Consultation" button |
| Phone, email, location | `SITE` in `content.ts` (pages read it), `src/lib/seo.ts`, `public/llms.txt`, plus Garrett's Google Business Profile |
| Google reviews display | Max 5 from the Places API (Google's cap). Keep the author photo, name, profile link, "View on Google Maps", the "Google Maps" attribution, and the ordering notice. `/privacy` and `/terms` reference Google's terms. Never hardcode a review count or rating. |

Claims rule: California Board of Accountancy rule 16 CCR 63 bars false or
misleading advertising. Every claim on the site must be something Garrett
actually does every time. When in doubt, ask him instead of writing it.

Writing rules for any site copy: no em dashes; say "layman's terms", never
"plain English"; "S Corp" capitalized when abbreviated, "S corporation" when
spelled out; warm, direct, no fluff.
