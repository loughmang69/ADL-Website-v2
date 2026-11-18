"use client";

import { useState } from "react";
import StarRating from "./StarRating";
import { initials, truncate } from "@/lib/utils";

interface ReviewCardProps {
  author: string;
  rating: number;
  text: string;
  /** e.g. "2 weeks ago" or "Google Review". */
  meta?: string;
  /** Reviewer's Google Maps profile (live Google reviews only). */
  authorUri?: string;
  /** Reviewer's Google profile photo (live Google reviews only). */
  authorPhotoUri?: string;
  /** This review on Google Maps (live Google reviews only). */
  reviewUri?: string;
}

/**
 * Google Maps Platform requires live reviews to credit the author (photo,
 * name, and profile link when space allows) and to let visitors open the
 * original review on Google Maps. Those links render only when the data comes
 * from the Places API; the static fallback cards have neither.
 */
export default function ReviewCard({
  author,
  rating,
  text,
  meta,
  authorUri,
  authorPhotoUri,
  reviewUri,
}: ReviewCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [photoFailed, setPhotoFailed] = useState(false);
  const isLong = text.length > 240;
  const shown = expanded || !isLong ? text : truncate(text, 240);
  const showPhoto = !!authorPhotoUri && !photoFailed;

  return (
    <figure className="flex h-full flex-col rounded-2xl border border-navy-deepest/[0.08] bg-white p-7 text-left shadow-sm">
      <StarRating value={rating} size={18} />

      <blockquote className="mt-5 flex-1 whitespace-pre-line leading-relaxed text-navy-soft">
        {shown}
      </blockquote>
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="mt-2 self-start rounded-sm text-sm font-semibold text-navy transition-colors hover:text-navy-deep active:scale-[0.97]"
        >
          {expanded ? "Show less" : "Read full review"}
        </button>
      )}

      <figcaption className="mt-5 flex items-center gap-3 border-t border-navy-deepest/10 pt-4">
        {showPhoto ? (
          // Plain <img>: Google profile photos are served from Google's CDN and
          // must not be re-hosted or cached through the image optimizer.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={authorPhotoUri}
            alt=""
            width={40}
            height={40}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setPhotoFailed(true)}
            className="h-10 w-10 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-bold text-white"
            aria-hidden="true"
          >
            {initials(author)}
          </span>
        )}
        <span className="min-w-0 leading-tight">
          {authorUri ? (
            <a
              href={authorUri}
              target="_blank"
              rel="noopener noreferrer"
              className="block truncate rounded-sm text-sm font-bold text-navy-deepest underline-offset-2 hover:underline"
            >
              {author}
            </a>
          ) : (
            <span className="block truncate text-sm font-bold text-navy-deepest">
              {author}
            </span>
          )}
          <span className="block text-xs text-navy-soft">
            {meta}
            {reviewUri && (
              <>
                {meta ? " · " : ""}
                <a
                  href={reviewUri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-sm underline underline-offset-2 hover:text-navy"
                >
                  View on Google Maps
                </a>
              </>
            )}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
