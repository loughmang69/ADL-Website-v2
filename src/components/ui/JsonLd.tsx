interface JsonLdProps {
  data: Record<string, unknown>;
}

/**
 * Serialize JSON for safe embedding inside a <script> element.
 *
 * JSON.stringify does NOT escape `<`, `>`, `&`, or the U+2028/U+2029 line
 * separators, so a value containing `</script>` (e.g. CMS-authored blog copy
 * that flows into blogPostingJsonLd) could break out of the tag and inject
 * markup. Rewriting those code points to their \uXXXX forms keeps the JSON
 * valid while making script-context breakout impossible.
 */
const UNSAFE = new Set([0x3c, 0x3e, 0x26, 0x2028, 0x2029]); // < > & LS PS

function safeJsonLd(data: Record<string, unknown>): string {
  let out = "";
  const json = JSON.stringify(data);
  for (const ch of json) {
    const code = ch.codePointAt(0)!;
    out += UNSAFE.has(code)
      ? "\\u" + code.toString(16).padStart(4, "0")
      : ch;
  }
  return out;
}

/** Renders a JSON-LD structured-data script tag. */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(data) }}
    />
  );
}
