import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/layout/LegalPage";
import { SITE } from "@/data/content";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms that apply to your use of the ADL Business Consulting, PC website.",
  alternates: { canonical: `${SITE.url}/terms` },
  robots: { index: true, follow: true },
};

/**
 * Website terms of use. Also satisfies the Google Maps Platform requirement
 * that sites displaying Places API content post terms of use incorporating
 * Google's terms. Professional engagements are governed by engagement letters,
 * not by this page.
 */
export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use">
      <p>
        These terms apply to your use of {SITE.url.replace("https://", "")}{" "}
        (the &ldquo;site&rdquo;), operated by {SITE.name} (&ldquo;ADL,&rdquo;
        &ldquo;we,&rdquo; or &ldquo;us&rdquo;). By using the site, you agree to
        them. If you do not agree, please do not use the site.
      </p>

      <h2>Information only, not professional advice</h2>
      <p>
        Content on this site, including blog posts and service descriptions,
        is general information. It is not tax, legal, financial, or accounting
        advice for your situation. Our{" "}
        <Link href="/disclaimer">Legal Disclaimer</Link> is part of these
        terms.
      </p>

      <h2>No CPA-client relationship from using the site</h2>
      <p>
        Using the site, submitting a form, or exchanging general information
        with us does not make you a client. A CPA-client relationship begins
        only when both parties sign a written engagement letter, and that
        letter, not these terms, governs any services we provide, including
        fees, scope, and responsibilities.
      </p>

      <h2>Your submissions</h2>
      <p>
        When you submit a form, you agree that the information is accurate and
        that you have the right to share it. When you submit a testimonial and
        give permission to display it, you grant us a non-exclusive, royalty-free
        right to publish it on this site, with your name and any role you
        provide, and to make minor edits for length or formatting that do not
        change its meaning. You can withdraw that permission at any time by
        contacting us, and we will remove it within a reasonable time.
      </p>

      <h2>Acceptable use</h2>
      <p>
        Please do not use the site to send spam or unsolicited sales offers,
        submit false information, attempt to disrupt or gain unauthorized
        access to the site, or copy its content at scale by automated means.
      </p>

      <h2>Our content</h2>
      <p>
        The site&rsquo;s text, design, logo, and other original content belong
        to ADL. Some photographs are used under license from their owners. You
        may view and share pages for personal, non-commercial purposes, but you
        may not republish our content without permission.
      </p>

      <h2>Google Maps content</h2>
      <p>
        Our reviews section displays content from Google Maps. Your use of that
        content is subject to the{" "}
        <a
          href="https://maps.google.com/help/terms_maps/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Maps/Google Earth Additional Terms of Service
        </a>
        , the{" "}
        <a
          href="https://policies.google.com/terms"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Terms of Service
        </a>
        , and the{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Privacy Policy
        </a>
        , which are incorporated into these terms for that content. Reviews
        reflect the opinions of their authors, and results for other clients
        do not guarantee similar results for you.
      </p>

      <h2>Links to other websites</h2>
      <p>
        The site links to other websites for convenience. We do not control
        them and are not responsible for their content or privacy practices.
      </p>

      <h2>Disclaimer of warranties</h2>
      <p>
        The site is provided &ldquo;as is&rdquo; and &ldquo;as available.&rdquo;
        To the fullest extent the law allows, we make no warranties, express or
        implied, about the site or its content, including accuracy,
        completeness, or fitness for a particular purpose, and we do not
        promise the site will always be available or error-free.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent the law allows, ADL will not be liable for any
        indirect, incidental, special, or consequential damages arising from
        your use of the site or reliance on its content. This section does not
        limit any responsibilities we have under a signed engagement letter.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of the State of California. Any
        dispute about the site will be handled in the state or federal courts
        located in Alameda County, California.
      </p>

      <h2>Changes to these terms</h2>
      <p>
        We may update these terms from time to time. The updated version will
        be posted on this page with a new effective date.
      </p>

      <h2>Contact us</h2>
      <p>
        {SITE.name}
        <br />
        {SITE.locationLabel}
        <br />
        <a href={SITE.emailHref}>{SITE.email}</a> &middot;{" "}
        <a href={SITE.phoneHref}>{SITE.phone}</a>
      </p>
    </LegalPage>
  );
}
