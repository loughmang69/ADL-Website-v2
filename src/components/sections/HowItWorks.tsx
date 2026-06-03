const STEPS = [
  {
    n: "1",
    title: "Schedule a free consultation",
    desc: "A 30-minute intro call to understand your business. No sales pitch, no obligation.",
  },
  {
    n: "2",
    title: "We assess your situation",
    desc: "We review your books, structure, and goals to find where you stand and what matters most.",
  },
  {
    n: "3",
    title: "You get a clear plan",
    desc: "Specific, prioritized recommendations and a path forward you can actually act on.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <span className="text-xs font-bold uppercase tracking-[0.1em] text-navy-soft">
          The Process
        </span>
        <h2 className="mt-2 text-3xl font-black tracking-tight text-navy-deepest md:text-5xl">
          How It Works
        </h2>

        <ol className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
          {STEPS.map((step, i) => (
            <li
              key={step.n}
              className="relative md:after:absolute md:after:left-20 md:after:right-0 md:after:top-7 md:after:h-px md:after:bg-navy-deepest/15 md:after:content-[''] md:last:after:hidden"
            >
              <span className="block text-6xl font-black leading-none tracking-tighter text-navy/15">
                {step.n}
              </span>
              <h3 className="mt-4 text-xl font-bold tracking-tight text-navy-deepest">
                {step.title}
              </h3>
              <p className="mt-2 max-w-prose text-navy-soft">{step.desc}</p>
              {i < STEPS.length - 1 && (
                <span className="sr-only">then</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
