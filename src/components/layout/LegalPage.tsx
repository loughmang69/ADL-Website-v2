import { LEGAL_EFFECTIVE_DATE } from "@/data/content";

/**
 * Shared shell for the Privacy Policy, Terms of Use, and Accessibility pages.
 * Matches the Disclaimer page layout so all four read as one set.
 */
export default function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white px-6 pb-24 pt-32">
      <div className="mx-auto max-w-prose">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-navy-deepest md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-sm text-navy-soft">
          Effective {LEGAL_EFFECTIVE_DATE}
        </p>
        <div className="legal-body mt-8 space-y-5 leading-relaxed text-navy-soft [&_a]:font-semibold [&_a]:text-navy [&_a]:underline [&_a]:underline-offset-2 [&_h2]:pt-4 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-navy-deepest [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1 [&_ul]:space-y-2">
          {children}
        </div>
      </div>
    </div>
  );
}
