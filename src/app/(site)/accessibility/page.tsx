import type { Metadata } from "next";
import LegalPage from "@/components/layout/LegalPage";
import { SITE } from "@/data/content";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "ADL Business Consulting, PC's commitment to an accessible website, and how to reach us if something is hard to use.",
  alternates: { canonical: `${SITE.url}/accessibility` },
  robots: { index: true, follow: true },
};

/**
 * Deliberately states a goal ("aim to meet"), not a claim of full conformance,
 * so it never promises more than the site can back up.
 */
export default function AccessibilityPage() {
  return (
    <LegalPage title="Accessibility">
      <p>
        We want everyone to be able to use this website, including people who
        rely on screen readers, keyboard navigation, magnification, or other
        assistive technology.
      </p>

      <h2>What we do</h2>
      <p>
        We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.1 at
        Level AA. The site is built with that in mind, including:
      </p>
      <ul>
        <li>A &ldquo;skip to content&rdquo; link and full keyboard navigation.</li>
        <li>Labeled form fields with clear error messages.</li>
        <li>Text alternatives for meaningful images.</li>
        <li>Readable color contrast and text that resizes with your browser.</li>
        <li>Reduced motion for visitors who turn it on in their device settings.</li>
      </ul>
      <p>
        Accessibility is ongoing work, and some content, such as material from
        third parties, may not fully meet these standards.
      </p>

      <h2>Tell us if something doesn&rsquo;t work</h2>
      <p>
        If any part of this site is hard to use, or you need information in a
        different format, please contact us and we will help. Email{" "}
        <a href={SITE.emailHref}>{SITE.email}</a> or call{" "}
        <a href={SITE.phoneHref}>{SITE.phone}</a>. Let us know the page and the
        problem, and we will respond as soon as we can.
      </p>
    </LegalPage>
  );
}
