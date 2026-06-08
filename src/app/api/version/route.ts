import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Reports the build id of the *currently deployed* code. The VersionWatcher
 * client component polls this and compares it against the build id baked into
 * the bundle it loaded; when they differ, a newer deployment is live and the
 * user is still running stale JavaScript.
 *
 * `NEXT_PUBLIC_BUILD_ID` is inlined at build time (see next.config.ts), so each
 * deployment's copy of this route returns that deployment's own id. The
 * no-store headers below are essential — a cached response here would defeat
 * the entire mechanism.
 */
export function GET() {
  return NextResponse.json(
    { id: process.env.NEXT_PUBLIC_BUILD_ID ?? "unknown" },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      },
    },
  );
}
