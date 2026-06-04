import Link from "next/link";
import { InfoIcon } from "@phosphor-icons/react/dist/ssr";
import { DISCLAIMER_FOOTER_SENTENCE } from "@/data/content";

export default function DisclaimerBanner() {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-accent-dim px-4 py-3 text-sm text-navy">
      <InfoIcon
        size={20}
        weight="fill"
        className="mt-0.5 shrink-0 text-navy-soft"
        aria-hidden="true"
      />
      <p className="leading-relaxed">
        {DISCLAIMER_FOOTER_SENTENCE}{" "}
        <Link
          href="/disclaimer"
          className="font-semibold text-navy underline underline-offset-2 transition-colors hover:text-accent"
        >
          Full Disclaimer
        </Link>
      </p>
    </div>
  );
}
