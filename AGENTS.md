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
