import type { Metadata } from "next";
import { SITE } from "@/data/content";

export const metadata: Metadata = {
  title: "Legal Disclaimer",
  description:
    "Legal disclaimer for ADL Business Consulting, PC, a Fremont, CA CPA firm. Website content is informational only and not legal, tax, or financial advice.",
  alternates: { canonical: `${SITE.url}/disclaimer` },
  robots: { index: true, follow: true },
};

export default function DisclaimerPage() {
  return (
    <div className="bg-white px-6 pb-24 pt-32">
      <div className="mx-auto max-w-prose">
        <h1 className="text-4xl font-black tracking-tight text-navy-deepest md:text-5xl">
          Legal Disclaimer
        </h1>
        <div className="mt-8 space-y-5 leading-relaxed text-navy-soft">
          <p>
            ADL Business Consulting, PC provides tax, bookkeeping, general
            business consulting, and advisory services for compensation. Content
            on this website, including blog posts and service descriptions, is
            for informational purposes only. It does not constitute legal, tax,
            financial, or accounting advice and should not be relied upon as
            such.
          </p>
          <p>
            Every business situation is different. Consult a qualified CPA,
            attorney, or financial advisor for advice specific to your
            circumstances before making any financial or legal decisions.
          </p>
          <p>
            Garrett Loughman holds an active California CPA license (License No.
            150109). The firm is incorporated in California as ADL Business
            Consulting, PC, EIN 42-2067797.
          </p>
          <p>
            For questions, contact:{" "}
            <a
              href="mailto:info@adlbusinessconsulting.com"
              className="font-medium text-navy underline underline-offset-2 transition-colors hover:text-accent"
            >
              info@adlbusinessconsulting.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
