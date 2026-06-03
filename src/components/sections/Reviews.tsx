"use client";

import { useState } from "react";
import { GoogleLogoIcon } from "@phosphor-icons/react/dist/ssr";
import Button from "@/components/ui/Button";
import StarRating from "@/components/ui/StarRating";
import { SITE, GOOGLE_REVIEW } from "@/data/content";
import { initials, truncate } from "@/lib/utils";

export default function Reviews() {
  const [expanded, setExpanded] = useState(false);
  const isLong = GOOGLE_REVIEW.body.length > 220;
  const shown =
    expanded || !isLong ? GOOGLE_REVIEW.body : truncate(GOOGLE_REVIEW.body, 220);

  return (
    <section id="reviews" className="bg-surface-soft px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-bold uppercase tracking-[0.1em] text-navy-soft">
          Google Reviews
        </span>
        <h2 className="mt-2 text-3xl font-black tracking-tight text-navy-deepest md:text-4xl">
          What Clients Say on Google
        </h2>

        <div className="mt-10 rounded-2xl border border-navy-deepest/[0.08] bg-white p-8 text-left shadow-sm">
          <div className="flex items-center justify-between">
            <GoogleLogoIcon
              size={28}
              weight="bold"
              className="text-navy"
              aria-label="Google"
            />
            <StarRating value={GOOGLE_REVIEW.stars} size={20} />
          </div>

          <div className="mt-6 flex items-center gap-3">
            <span
              className="flex h-11 w-11 items-center justify-center rounded-full bg-navy text-sm font-bold text-white"
              aria-hidden="true"
            >
              {initials(GOOGLE_REVIEW.author)}
            </span>
            <span className="text-sm font-bold text-navy-deepest">
              {GOOGLE_REVIEW.author}
            </span>
          </div>

          <h3 className="mt-5 text-lg font-bold tracking-tight text-navy-deepest">
            {GOOGLE_REVIEW.title}
          </h3>
          <p className="mt-2 leading-relaxed text-navy-soft">{shown}</p>
          {isLong && (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="mt-2 rounded-sm text-sm font-semibold text-navy transition-colors hover:text-accent active:scale-[0.97]"
            >
              {expanded ? "Show less" : "Read full review"}
            </button>
          )}

          <p className="mt-6 border-t border-navy-deepest/10 pt-4 text-xs text-navy-soft">
            {GOOGLE_REVIEW.source}
          </p>
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href={SITE.googleReviewUrl} variant="primary" external>
            Leave Us a Review
          </Button>
          <Button href={SITE.googleProfileUrl} variant="secondary" external>
            View Google Profile
          </Button>
        </div>
      </div>
    </section>
  );
}
