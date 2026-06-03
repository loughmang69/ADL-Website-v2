import type { Service, ServiceCategory } from "@/data/services";
import { ServiceIcon } from "./Icon";

/** Subtle, palette-committed icon-container tints so no two category cards look identical. */
const ICON_TINTS: Record<ServiceCategory, string> = {
  Tax: "bg-accent/20 text-navy",
  Accounting: "bg-navy/5 text-navy",
  Operations: "bg-navy-soft/10 text-navy-soft",
  Tech: "bg-accent/10 text-navy",
  Consulting: "bg-navy/[0.08] text-navy",
  Education: "bg-navy-soft/[0.12] text-navy-soft",
  Innovation: "bg-accent/[0.28] text-navy",
};

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const disabled = service.comingSoon;
  return (
    <div
      className={`group flex h-full flex-col rounded-2xl border border-navy-deepest/[0.08] bg-white p-6 transition-[transform,border-color,box-shadow] duration-200 ease-out ${
        disabled
          ? "opacity-70"
          : "hover:-translate-y-[3px] hover:border-accent hover:shadow-xl hover:shadow-navy/5"
      }`}
    >
      <div className="mb-5 flex items-start justify-between gap-3">
        <span
          className={`flex h-[52px] w-[52px] items-center justify-center rounded-xl ${ICON_TINTS[service.category]}`}
        >
          <ServiceIcon name={service.icon} size={26} weight="duotone" />
        </span>
        <span className="rounded-full bg-surface-soft px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] text-navy-soft">
          {service.comingSoon ? "Coming Soon" : service.tag}
        </span>
      </div>
      <h3 className="text-lg font-bold tracking-tight text-navy-deepest">
        {service.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-navy-soft">
        {service.description}
      </p>
    </div>
  );
}
