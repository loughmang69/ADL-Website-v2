import { sanityFetch } from "@/lib/sanity/client";
import { APPROVED_TESTIMONIALS_QUERY } from "@/lib/sanity/queries";
import type { Testimonial } from "@/lib/sanity/types";
import TestimonialCard from "@/components/ui/TestimonialCard";
import SubmitTestimonial from "./SubmitTestimonial";

function gridClass(count: number): string {
  if (count <= 1) return "mx-auto max-w-2xl";
  if (count === 2) return "grid gap-6 md:grid-cols-2";
  return "grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
}

export default async function Testimonials() {
  const testimonials = await sanityFetch<Testimonial[]>(
    APPROVED_TESTIMONIALS_QUERY,
    {},
    [],
  );

  return (
    <section id="testimonials" className="bg-white px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-[0.1em] text-navy-soft">
            Testimonials
          </span>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-navy-deepest md:text-5xl">
            What Clients Are Saying
          </h2>
        </div>

        <div className="mt-12">
          {testimonials.length === 0 ? (
            <p className="text-center text-navy-soft">
              Client testimonials coming soon.
            </p>
          ) : (
            <div className={gridClass(testimonials.length)}>
              {testimonials.map((t) => (
                <TestimonialCard key={t._id} testimonial={t} />
              ))}
            </div>
          )}
        </div>

        <SubmitTestimonial />
      </div>
    </section>
  );
}
