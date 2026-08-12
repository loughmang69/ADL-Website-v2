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
        <h1 className="font-display text-4xl font-semibold tracking-tight text-navy-deepest md:text-5xl">
          Legal Disclaimer
        </h1>
        <div className="mt-8 space-y-5 leading-relaxed text-navy-soft">
          <p>
            ADL Business Consulting, PC provides tax preparation and review,
            bookkeeping, and business advisory services for compensation.
            Content on this website, including blog posts, service descriptions,
            and any tools it may offer, is provided for general informational
            purposes only. It does not constitute tax, legal, financial, or
            accounting advice, and should not be relied upon as a substitute for
            advice from a qualified professional familiar with your specific
            facts and circumstances.
          </p>
          <p>
            Visiting this website, submitting a contact form, or exchanging
            general information with ADL Business Consulting, PC does not create
            a CPA-client relationship. A CPA-client relationship, and the
            confidentiality protections that come with it, begins only after
            both parties sign a written engagement letter defining the scope of
            services.
          </p>
          <p>
            Every business and tax situation is different, and outcomes for
            other clients do not guarantee similar results for you. ADL Business
            Consulting, PC makes no representation or warranty, express or
            implied, regarding the accuracy, completeness, or applicability of
            information on this site to your particular situation.
          </p>
          <p>
            Consult a qualified CPA, attorney, or financial advisor for advice
            specific to your circumstances before making any financial or legal
            decisions.
          </p>
          <p>
            Garrett Loughman holds an active California CPA license (License No.
            150109). The firm is incorporated in California as ADL Business
            Consulting, PC.
          </p>
          <p>
            This site may link to third-party websites or resources for
            convenience. ADL Business Consulting, PC does not control and is not
            responsible for the content, accuracy, or privacy practices of any
            third-party site.
          </p>
          <p>
            For questions, contact:{" "}
            <a
              href="mailto:info@adlbusinessconsulting.com"
              className="font-medium text-navy underline underline-offset-2 transition-colors hover:text-navy-deep"
            >
              info@adlbusinessconsulting.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
