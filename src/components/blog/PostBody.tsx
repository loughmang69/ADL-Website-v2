import Image from "next/image";
import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlock,
} from "next-sanity";
import { urlForImage, imageRefDimensions } from "@/lib/sanity/client";
import type { SanityImage } from "@/lib/sanity/types";

/**
 * Only allow link hrefs with a safe scheme. A CMS-authored link could contain
 * `javascript:`/`data:` etc., which would be an XSS vector; anything that isn't
 * http(s), mailto, tel, or a relative/anchor path is dropped to "#".
 */
function safeHref(href: unknown): string {
  if (typeof href !== "string") return "#";
  const trimmed = href.trim();
  return /^(https?:|mailto:|tel:|\/|#)/i.test(trimmed) ? trimmed : "#";
}

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-12 text-2xl font-black tracking-tight text-navy-deepest md:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 text-xl font-bold tracking-tight text-navy-deepest">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-6 text-lg font-bold tracking-tight text-navy-deepest">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="mt-5 leading-relaxed text-navy-soft">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-2 border-accent pl-5 italic text-navy">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-5 list-disc space-y-2 pl-6 text-navy-soft">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mt-5 list-decimal space-y-2 pl-6 text-navy-soft">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-navy-deepest">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    link: ({ children, value }) => {
      const href = safeHref(value?.href);
      const external = href.startsWith("http");
      return (
        <a
          href={href}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className="font-medium text-navy underline underline-offset-2 transition-colors hover:text-accent"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }: { value: SanityImage }) => {
      const dims = imageRefDimensions(value?.asset?._ref);
      const url = urlForImage(value).width(1200).fit("max").url();
      return (
        <figure className="mt-8">
          <Image
            src={url}
            alt={value?.alt ?? ""}
            width={dims?.width ?? 1200}
            height={dims?.height ?? 800}
            sizes="(max-width: 768px) 100vw, 768px"
            className="h-auto w-full rounded-xl"
          />
          {value?.alt && (
            <figcaption className="mt-2 text-center text-sm text-navy-soft">
              {value.alt}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export default function PostBody({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="text-base">
      <PortableText value={value} components={components} />
    </div>
  );
}
