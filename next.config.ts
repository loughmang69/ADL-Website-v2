import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

/**
 * Content-Security-Policy, shipped in Report-Only mode first: the browser
 * evaluates it and logs violations to the console but blocks nothing, so we
 * can confirm the allowlist is complete before switching to the enforcing
 * `Content-Security-Policy` header.
 *
 * 'unsafe-inline' is still required for script/style because Next.js injects
 * inline bootstrap scripts and inline styles without nonces; tightening that
 * needs nonce-based middleware and is the planned follow-up before enforcement.
 * Third parties allow-listed: Vercel Analytics/Speed Insights, Sanity's CDN,
 * Google reviewer profile photos (googleusercontent.com), and Cloudflare
 * Turnstile (script + challenge iframe on the contact form).
 * Scoped to exclude /studio (the Sanity Studio SPA needs a far looser policy).
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com https://challenges.cloudflare.com",
  "frame-src https://challenges.cloudflare.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://cdn.sanity.io https://*.googleusercontent.com",
  "font-src 'self' data:",
  "connect-src 'self' https://*.sanity.io https://va.vercel-scripts.com https://vitals.vercel-insights.com https://challenges.cloudflare.com",
  "upgrade-insecure-requests",
].join("; ");

/**
 * A single identifier that changes on every deployment, exposed as
 * `NEXT_PUBLIC_BUILD_ID` so the client-side VersionWatcher can compare the
 * build it booted with against the live deployment and prompt a refresh when
 * they diverge (the "open tab stuck on old version" case). `VERCEL_DEPLOYMENT_ID`
 * is a system variable on every Vercel plan (incl. Hobby). Falls back to the
 * git SHA, then a local dev stamp, when not on Vercel.
 *
 * Note: we intentionally do NOT set Next's `deploymentId` here. That only earns
 * its keep with Vercel Skew Protection (a Pro feature) enabled — without it, it
 * just appends a no-op `?dpl=` to every asset URL. The VersionWatcher below is
 * the plan-independent fix and works on its own.
 */
const buildId =
  process.env.VERCEL_DEPLOYMENT_ID ||
  process.env.VERCEL_GIT_COMMIT_SHA ||
  `dev-${Date.now()}`;

/**
 * Cloudflare Turnstile site key (public). The real key only works on
 * adlbusinessconsulting.com, so previews and local dev get Cloudflare's
 * documented always-pass test key instead. The matching secret is chosen the
 * same way in src/lib/security/turnstile.ts.
 */
const turnstileSiteKey =
  process.env.VERCEL_ENV === "production"
    ? "0x4AAAAAAGGgkOK0eyVyxoDV"
    : "1x00000000000000000000AA";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_BUILD_ID: buildId,
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: turnstileSiteKey,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/**",
      },
    ],
  },
  /**
   * The six service pages removed in the CPA-first repositioning. Permanent so
   * the existing search equity transfers rather than being dropped.
   *
   * Entity structure, payroll, QuickBooks/tech, and process work all fold into
   * Business Advisory, which is genuinely where that work now lives. Personal
   * Finance Education goes to the blog, since it is closer to an article topic
   * than a service. Website/app and AI work have no natural successor, so they
   * land on the services index: a 301 to a relevant hub preserves more equity
   * than one to the homepage.
   */
  async redirects() {
    return [
      {
        source: "/services/entity-structure-review",
        destination: "/services/business-advisory-fremont",
        permanent: true,
      },
      {
        source: "/services/payroll-setup-california",
        destination: "/services/business-advisory-fremont",
        permanent: true,
      },
      {
        source: "/services/quickbooks-setup-bay-area",
        destination: "/services/business-advisory-fremont",
        permanent: true,
      },
      {
        source: "/services/business-process-optimization",
        destination: "/services/business-advisory-fremont",
        permanent: true,
      },
      {
        source: "/services/personal-finance-education",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/services/website-app-development",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/services/ai-agent-implementation",
        destination: "/services",
        permanent: true,
      },
      /**
       * Legacy .html blog URLs from the pre-Next static site. Google still has
       * these indexed and was reporting them as redirect errors once they began
       * hard-404ing against /blog/[slug].
       *
       * Order matters: /blog/index.html is the directory index, so it belongs
       * at /blog. Without this entry the pattern below would rewrite it to
       * /blog/index, which is a 404, turning a plain 404 into a redirect chain
       * that ends in one.
       */
      {
        source: "/blog/index.html",
        destination: "/blog",
        permanent: true,
      },
      /**
       * One pattern rather than an entry per slug, so posts Google has not
       * re-crawled yet are covered too. The param is constrained to [^/]+ and
       * the ".html" suffix is required, so a clean URL like /blog/llc-vs-s-corp
       * cannot match and there is no redirect loop.
       */
      {
        source: "/blog/:slug([^/]+).html",
        destination: "/blog/:slug",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        // Everything except the Sanity Studio SPA at /studio.
        source: "/((?!studio).*)",
        headers: [
          {
            key: "Content-Security-Policy-Report-Only",
            value: contentSecurityPolicy,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
