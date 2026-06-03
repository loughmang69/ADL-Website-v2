import { QuotesIcon } from "@phosphor-icons/react/dist/ssr";
import type { Testimonial } from "@/lib/sanity/types";
import StarRating from "./StarRating";
import { initials } from "@/lib/utils";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const { name, role, stars, text } = testimonial;
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-navy-deepest/[0.08] bg-white p-7 shadow-sm">
      <QuotesIcon
        size={36}
        weight="fill"
        className="text-accent"
        aria-hidden="true"
      />
      <blockquote className="mt-4 flex-1 text-navy-soft leading-relaxed">
        {text}
      </blockquote>
      {typeof stars === "number" && stars > 0 && (
        <StarRating value={stars} size={18} className="mt-5" />
      )}
      <hr className="my-5 border-navy-deepest/10" />
      <figcaption className="flex items-center gap-3">
        <span
          className="flex h-11 w-11 items-center justify-center rounded-full bg-navy text-sm font-bold text-white"
          aria-hidden="true"
        >
          {initials(name)}
        </span>
        <span className="leading-tight">
          <span className="block text-sm font-bold text-navy-deepest">
            {name}
          </span>
          {role && (
            <span className="block text-xs text-navy-soft">{role}</span>
          )}
        </span>
      </figcaption>
    </figure>
  );
}
