import Button from "@/components/ui/Button";
import { PACKAGES } from "@/data/packages";

// If PACKAGES is empty, render nothing. No empty state, no placeholder copy.
// This is intentional — the section only appears when there's real content.
export default function Packages() {
  if (PACKAGES.length === 0) return null;

  return (
    <section id="pricing" aria-label="Pricing packages" className="bg-white px-6 py-24">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="text-3xl font-black tracking-tight text-navy-deepest md:text-5xl">
          Simple, Transparent Pricing
        </h2>
        <p className="mx-auto mt-4 max-w-prose text-navy-soft">
          Choose the level of support that fits where your business is today.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`flex flex-col rounded-2xl border bg-white p-8 text-left transition-transform duration-200 ${
                pkg.highlight
                  ? "scale-[1.02] border-navy shadow-xl"
                  : "border-navy-deepest/[0.08]"
              }`}
            >
              {pkg.highlight && (
                <span className="mb-4 inline-block w-fit rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] text-navy-deepest">
                  Most Popular
                </span>
              )}
              <h3 className="text-xl font-bold tracking-tight text-navy-deepest">
                {pkg.name}
              </h3>
              <p className="mt-3">
                {typeof pkg.monthlyPrice === "number" ? (
                  <>
                    <span className="text-4xl font-black tracking-tight text-navy-deepest">
                      ${pkg.monthlyPrice}
                    </span>
                    {pkg.priceNote && (
                      <span className="ml-1 text-sm text-navy-soft">
                        {pkg.priceNote}
                      </span>
                    )}
                  </>
                ) : (
                  <span className="text-2xl font-black tracking-tight text-navy-deepest">
                    Custom pricing
                  </span>
                )}
              </p>
              <p className="mt-3 text-sm text-navy-soft">{pkg.description}</p>
              <ul className="mt-6 flex-1 space-y-2 text-sm text-navy-soft">
                {pkg.includes.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
              <Button
                href={pkg.ctaHref ?? "/#contact"}
                variant={pkg.highlight ? "primary" : "secondary"}
                className="mt-8 w-full"
              >
                {pkg.ctaLabel ?? "Get Started"}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
