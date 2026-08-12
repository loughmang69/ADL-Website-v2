import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { ADL_APPROACH } from "@/data/content";

/**
 * "The ADL Approach". Keeps the `how-it-works` id so existing anchors and any
 * external links still land here.
 *
 * This is the one section on the site that is numbered, because it is the one
 * section whose order carries information: step four cannot happen before step
 * three. Everything else that could be numbered (services, audiences) is a set,
 * not a sequence, and is deliberately left unnumbered.
 *
 * Step one is a named offer with a defined deliverable rather than a generic
 * "book a call". No pricing is stated or implied; it is the free consultation
 * that already existed, given a name and a written output.
 */
export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <span className="text-xs font-bold uppercase tracking-[0.1em] text-navy-soft">
            {ADL_APPROACH.eyebrow}
          </span>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-navy-deepest md:text-5xl">
            {ADL_APPROACH.heading}
          </h2>
        </Reveal>

        <ol className="mt-14 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {ADL_APPROACH.steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 60}>
              <li className="flex h-full flex-col border-t border-navy-deepest/15 pt-5">
                <span
                  className="font-mono text-sm font-bold tabular-nums text-navy"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {"tagline" in step && step.tagline ? (
                  <span className="mt-3 text-[11px] font-bold uppercase tracking-[0.12em] text-navy">
                    {step.tagline}
                  </span>
                ) : null}
                <h3
                  className={`text-lg font-bold tracking-tight text-navy-deepest ${
                    "tagline" in step && step.tagline ? "mt-1.5" : "mt-3"
                  }`}
                >
                  {step.title}
                </h3>
                <p className="mt-2 leading-relaxed text-navy-soft">
                  {step.body}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal>
          <div className="mt-14 flex flex-col items-start gap-4 rounded-2xl bg-navy-deep p-8 text-white sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-xl font-semibold tracking-tight">
                Start with the Books &amp; Structure Review
              </p>
              <p className="mt-1 max-w-lg text-white/75">
                Thirty minutes, no cost, and you leave with a written picture of
                where you stand.
              </p>
            </div>
            <Button href="/#contact" variant="accent" className="shrink-0">
              Request a Free Consultation
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
