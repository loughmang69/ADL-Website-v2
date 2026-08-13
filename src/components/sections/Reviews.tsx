import Button from "@/components/ui/Button";
import StarRating from "@/components/ui/StarRating";
import ReviewCard from "@/components/ui/ReviewCard";
import Reveal from "@/components/ui/Reveal";
import { SITE, GOOGLE_REVIEWS } from "@/data/content";
import { getGoogleReviews } from "@/lib/google/reviews";

function gridClass(count: number): string {
  if (count <= 1) return "mx-auto max-w-2xl";
  if (count === 2) return "grid gap-6 md:grid-cols-2 max-w-4xl mx-auto";
  return "grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
}

export default async function Reviews() {
  const data = await getGoogleReviews();
  const dynamic = data && data.reviews.length > 0;
  const profileUrl = data?.mapsUri ?? SITE.googleProfileUrl;

  return (
    <section id="reviews" className="bg-surface-soft px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <span className="text-xs font-bold uppercase tracking-[0.1em] text-navy-soft">
            Google Reviews
          </span>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-navy-deepest md:text-4xl">
            What Clients Say on Google
          </h2>
          {dynamic && typeof data.rating === "number" && (
            <div className="mt-4 flex items-center gap-3">
              <StarRating value={Math.round(data.rating)} size={22} />
              <p className="text-sm text-navy-soft">
                {data.rating.toFixed(1)} out of 5
                {data.total ? ` · ${data.total} Google reviews` : ""}
              </p>
            </div>
          )}
        </Reveal>

        <div className="mt-10">
          {dynamic ? (
            <div className={gridClass(data.reviews.length)}>
              {data.reviews.map((r, i) => (
                <Reveal key={`${r.author}-${i}`} delay={i * 70} className="h-full">
                  <ReviewCard
                    author={r.author}
                    rating={r.rating}
                    text={r.text}
                    meta={r.relativeTime || "Google Review"}
                  />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className={gridClass(GOOGLE_REVIEWS.length)}>
              {GOOGLE_REVIEWS.map((review, i) => (
                <Reveal key={review.author} delay={i * 70} className="h-full">
                  <ReviewCard
                    author={review.author}
                    rating={review.stars}
                    text={review.text}
                    meta={review.source}
                  />
                </Reveal>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href={SITE.googleReviewUrl} variant="primary" external>
            Leave Us a Review
          </Button>
          <Button href={profileUrl} variant="secondary" external>
            View Google Profile
          </Button>
        </div>
      </div>
    </section>
  );
}
