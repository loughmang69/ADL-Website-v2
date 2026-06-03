"use client";

import { useState } from "react";
import { GoogleLogoIcon } from "@phosphor-icons/react/dist/ssr";
import StarRating from "./StarRating";
import { initials, truncate } from "@/lib/utils";

interface ReviewCardProps {
  author: string;
  rating: number;
  text: string;
  /** e.g. "2 weeks ago" or "Verified Google Review". */
  meta?: string;
}

export default function ReviewCard({
  author,
  rating,
  text,
  meta,
}: ReviewCardProps) {
  const [expanded, setExpanded] = useState(false);
  const isLong = text.length > 240;
  const shown = expanded || !isLong ? text : truncate(text, 240);

  return (
    <figure className="flex h-full flex-col rounded-2xl border border-navy-deepest/[0.08] bg-white p-7 text-left shadow-sm">
      <div className="flex items-center justify-between">
        <GoogleLogoIcon
          size={26}
          weight="bold"
          className="text-navy"
          aria-label="Google"
        />
        <StarRating value={rating} size={18} />
      </div>

      <blockquote className="mt-5 flex-1 leading-relaxed text-navy-soft">
        {shown}
      </blockquote>
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="mt-2 self-start rounded-sm text-sm font-semibold text-navy transition-colors hover:text-accent active:scale-[0.97]"
        >
          {expanded ? "Show less" : "Read full review"}
        </button>
      )}

      <figcaption className="mt-5 flex items-center gap-3 border-t border-navy-deepest/10 pt-4">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-sm font-bold text-white"
          aria-hidden="true"
        >
          {initials(author)}
        </span>
        <span className="leading-tight">
          <span className="block text-sm font-bold text-navy-deepest">
            {author}
          </span>
          {meta && <span className="block text-xs text-navy-soft">{meta}</span>}
        </span>
      </figcaption>
    </figure>
  );
}
