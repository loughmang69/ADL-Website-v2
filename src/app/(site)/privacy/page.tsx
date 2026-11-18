import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/layout/LegalPage";
import { SITE } from "@/data/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How ADL Business Consulting, PC collects, uses, and protects the information you share through this website.",
  alternates: { canonical: `${SITE.url}/privacy` },
  robots: { index: true, follow: true },
};

/**
 * Written to satisfy the California Online Privacy Protection Act (Bus. & Prof.
 * Code 22575) and the Google Maps Platform requirement that sites displaying
 * Places API content post a privacy policy incorporating Google's.
 *
 * Every statement here must stay true of the site as built. If you add a
 * tracking pixel, chat widget, scheduler, or any new third-party script, or
 * start collecting new information, update this page and its effective date
 * (LEGAL_EFFECTIVE_DATE in src/data/content.ts) in the same change.
 */
export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>
        This policy explains what information {SITE.name} (&ldquo;ADL,&rdquo;
        &ldquo;we,&rdquo; or &ldquo;us&rdquo;) collects through{" "}
        {SITE.url.replace("https://", "")}, how we use it, and the choices you
        have. It covers this website only. Information you share with us as a
        client is governed by your engagement letter and by the professional
        confidentiality rules that apply to California CPAs.
      </p>

      <h2>Information we collect</h2>
      <p>We only collect what you choose to send us:</p>
      <ul>
        <li>
          <strong>Consultation requests.</strong> Your name and email address,
          and, if you provide them, your phone number, business type, the
          service you are interested in, your preferred contact method, and any
          notes you write.
        </li>
        <li>
          <strong>Testimonials.</strong> Your name, optional role or business,
          star rating, testimonial text, and your permission for us to display
          it.
        </li>
      </ul>
      <p>
        Please do not include Social Security numbers, bank or account numbers,
        or tax documents in a website form. If we work together, we will give
        you a secure way to share those.
      </p>
      <p>
        When you visit, our hosting provider also processes standard technical
        information such as your IP address, browser type, and the pages you
        view. We use it to deliver the site, keep it secure, and count visits
        in aggregate (see &ldquo;Analytics&rdquo; below).
      </p>

      <h2>How we use it</h2>
      <ul>
        <li>To respond to your inquiry and schedule a consultation.</li>
        <li>
          To review testimonials and, with your permission, display them on
          this site.
        </li>
        <li>
          To keep the site secure, including limiting repeated form submissions
          and filtering spam.
        </li>
        <li>To understand, in aggregate, how the site is used.</li>
      </ul>

      <h2>Who we share it with</h2>
      <p>
        We do not sell or rent your personal information, and we do not share
        it with anyone for their own marketing. We do not pass your inquiry to
        other businesses or referral partners. We share information only with
        the service providers that run this website for us, and only so they
        can do that work:
      </p>
      <ul>
        <li>
          <strong>Vercel</strong> hosts the website and provides our analytics.
        </li>
        <li>
          <strong>Resend</strong> delivers form submissions to our email inbox.
        </li>
        <li>
          <strong>Our email provider</strong> stores the inquiries we receive.
        </li>
        <li>
          <strong>Upstash</strong> briefly stores IP addresses to limit
          repeated form submissions.
        </li>
        <li>
          <strong>Sanity</strong> stores submitted testimonials and our blog
          content.
        </li>
      </ul>
      <p>
        We may also disclose information if the law requires it, or to protect
        our rights or the safety of others.
      </p>

      <h2>Google reviews</h2>
      <p>
        Our reviews section displays reviews from Google Maps using the Google
        Maps Platform. When that section loads, your browser may request
        reviewer profile photos directly from Google, which means Google
        receives your IP address and standard browser information. Google&rsquo;s
        handling of that information is covered by the{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Privacy Policy
        </a>
        , which is incorporated into this policy for that purpose.
      </p>

      <h2>Cookies and analytics</h2>
      <p>
        This website does not use cookies to track you. Our analytics, provided
        by Vercel, are cookie-free: they count page views and measure site
        performance without identifying individual visitors or following you
        across other websites. We do not use advertising pixels, retargeting,
        session recording, or social media trackers.
      </p>

      <h2>Do Not Track and third-party tracking</h2>
      <p>
        Some browsers send a &ldquo;Do Not Track&rdquo; signal. Because we do
        not track visitors over time or across other websites, every visitor is
        treated the same way whether or not the signal is on. We do not allow
        third parties to collect personal information about your activity on
        this site for tracking across other websites over time.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep inquiries and testimonials only as long as we reasonably need
        them for the purposes described above and for our business records.
        Rate-limiting data is kept for minutes, not days.
      </p>

      <h2>Security</h2>
      <p>
        We use reputable service providers and reasonable safeguards to protect
        the information you send us. No website or email system is perfectly
        secure, which is why we ask you not to send sensitive financial
        information through website forms.
      </p>

      <h2>Your choices</h2>
      <p>
        You can ask us what information we hold about you, ask us to correct
        it, or ask us to delete it, and you can withdraw permission to display
        a testimonial at any time. Email{" "}
        <a href={SITE.emailHref}>{SITE.email}</a> or call{" "}
        <a href={SITE.phoneHref}>{SITE.phone}</a>. We will respond within a
        reasonable time. Records we are legally or professionally required to
        keep may be retained where the law requires.
      </p>
      <p>
        California residents: we do not disclose personal information to third
        parties for their direct marketing purposes.
      </p>

      <h2>Children</h2>
      <p>
        This website is intended for adults and businesses. We do not knowingly
        collect personal information from children under 13.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If we change this policy, we will post the updated version on this page
        and update the effective date at the top.
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
      <p>
        See also our <Link href="/terms">Terms of Use</Link> and{" "}
        <Link href="/disclaimer">Legal Disclaimer</Link>.
      </p>
    </LegalPage>
  );
}
