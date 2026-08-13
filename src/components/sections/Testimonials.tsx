import { sanityFetch } from "@/lib/sanity/client";
import { APPROVED_TESTIMONIALS_QUERY } from "@/lib/sanity/queries";
import type { Testimonial } from "@/lib/sanity/types";
import TestimonialCard from "@/components/ui/TestimonialCard";
import Reveal from "@/components/ui/Reveal";
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
        {/* Left aligned, matching every other section heading. The old centred
            treatment was the only one on the page and read as inconsistent. */}
        <Reveal>
          <span className="text-xs font-bold uppercase tracking-[0.1em] text-navy-soft">
            Testimonials
          </span>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-navy-deepest md:text-5xl">
            What It&rsquo;s Like to Work With Us
          </h2>
        </Reveal>

        <div className="mt-12">
          {testimonials.length === 0 ? (
            <p className="text-navy-soft">Client testimonials coming soon.</p>
          ) : (
            <div className={gridClass(testimonials.length)}>
              {testimonials.map((t, i) => (
                <Reveal key={t._id} delay={i * 70} className="h-full">
                  <TestimonialCard testimonial={t} />
                </Reveal>
              ))}
            </div>
          )}
        </div>

        <SubmitTestimonial />
      </div>
    </section>
  );
}
