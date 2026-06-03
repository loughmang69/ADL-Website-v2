"use client";

import { useState } from "react";
import { StarIcon } from "@phosphor-icons/react/dist/ssr";

interface StarRatingProps {
  /** Current value (1-5). */
  value: number;
  max?: number;
  /** When provided, renders an interactive, keyboard-accessible picker. */
  onChange?: (value: number) => void;
  size?: number;
  className?: string;
  /** Unique name for the radio group when interactive. */
  name?: string;
}

export default function StarRating({
  value,
  max = 5,
  onChange,
  size = 20,
  className = "",
  name = "rating",
}: StarRatingProps) {
  const [hover, setHover] = useState<number | null>(null);
  const stars = Array.from({ length: max }, (_, i) => i + 1);

  // Display-only
  if (!onChange) {
    return (
      <div
        className={`inline-flex items-center gap-0.5 text-accent ${className}`}
        role="img"
        aria-label={`${value} out of ${max} stars`}
      >
        {stars.map((n) => (
          <StarIcon
            key={n}
            size={size}
            weight={n <= value ? "fill" : "regular"}
            aria-hidden="true"
          />
        ))}
      </div>
    );
  }

  // Interactive picker (radio group — native keyboard support)
  const active = hover ?? value;
  return (
    <div
      role="radiogroup"
      aria-label="Star rating"
      className={`inline-flex items-center gap-1 ${className}`}
      onMouseLeave={() => setHover(null)}
    >
      {stars.map((n) => (
        <label
          key={n}
          className="cursor-pointer rounded-md text-accent"
          onMouseEnter={() => setHover(n)}
        >
          <input
            type="radio"
            name={name}
            value={n}
            checked={value === n}
            onChange={() => onChange(n)}
            className="sr-only peer"
          />
          <span className="block rounded-md peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-focus-visible:ring-offset-2">
            <StarIcon
              size={size}
              weight={n <= active ? "fill" : "regular"}
              aria-hidden="true"
            />
          </span>
          <span className="sr-only">
            {n} star{n === 1 ? "" : "s"}
          </span>
        </label>
      ))}
    </div>
  );
}
