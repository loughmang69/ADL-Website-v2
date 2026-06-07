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
 * Third parties allow-listed: Vercel Analytics/Speed Insights and Sanity's CDN.
 * Scoped to exclude /studio (the Sanity Studio SPA needs a far looser policy).
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://cdn.sanity.io",
  "font-src 'self' data:",
  "connect-src 'self' https://*.sanity.io https://va.vercel-scripts.com https://vitals.vercel-insights.com",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/**",
      },
    ],
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
