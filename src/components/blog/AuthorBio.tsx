import Image from "next/image";
import { SITE } from "@/data/content";
import { asset } from "@/lib/assets";

export default function AuthorBio() {
  return (
    <aside className="mt-14 flex flex-col gap-5 rounded-2xl bg-surface-soft p-7 sm:flex-row sm:items-center">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full">
        {/*
          Square, face-centred crop of the hero headshot. The full portrait is
          1250x1436, so object-cover in an 80px circle scaled the whole frame
          (head, suit, and studio background) down to 80px wide and left the
          face about 37px across. This crop spends the circle on the face.
        */}
        <Image
          src={asset("/uploads/headshot-avatar.jpg")}
          alt={`${SITE.founderName}, CPA`}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.1em] text-navy-soft">
          Written by
        </p>
        <p className="mt-1 text-lg font-bold tracking-tight text-navy-deepest">
          {SITE.founderTitle}
        </p>
        <p className="mt-2 max-w-prose text-sm leading-relaxed text-navy-soft">
          Founder of {SITE.name}, a licensed California CPA ({SITE.license}) with
          15+ years in accounting, finance, and consulting, helping Bay Area
          small business owners make confident financial decisions.
        </p>
      </div>
    </aside>
  );
}
