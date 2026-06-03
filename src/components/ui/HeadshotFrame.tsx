import Image from "next/image";

interface HeadshotFrameProps {
  className?: string;
  priority?: boolean;
  sizes?: string;
}

/** Headshot with gradient border frame and floating CPA badge (hero + about). */
export default function HeadshotFrame({
  className = "",
  priority = false,
  sizes = "(max-width: 1024px) 20rem, 40vw",
}: HeadshotFrameProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-accent/40 to-navy-soft/40 p-[3px]">
        <div className="relative h-full w-full overflow-hidden rounded-[14px]">
          <Image
            src="/uploads/headshot.jpg"
            alt="Garrett Loughman, CPA, founder of ADL Business Consulting"
            fill
            sizes={sizes}
            className="object-cover"
            priority={priority}
          />
        </div>
      </div>
      <div className="absolute -bottom-4 -right-4 rounded-2xl bg-navy px-5 py-3 text-white shadow-xl">
        <span className="block text-2xl font-black leading-none tracking-tight">
          CPA
        </span>
        <span className="mt-1 block text-[11px] font-medium text-white/70">
          CA #150109
        </span>
      </div>
    </div>
  );
}
