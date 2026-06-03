import type { TestimonialInput } from "@/lib/validations/testimonial";

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildTestimonialEmail(
  data: TestimonialInput,
  studioUrl: string,
) {
  const subject = `New testimonial pending review from ${data.name}`;
  const stars = `${data.stars} of 5`;

  const html = `<!doctype html>
<html>
  <body style="margin:0;background:#f7f9fc;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:560px;margin:0 auto;padding:24px;">
      <h1 style="font-size:18px;color:#0d1f3c;margin:0 0 4px;">New testimonial pending review</h1>
      <p style="font-size:13px;color:#1a6a8a;margin:0 0 16px;">It will not appear on the site until you approve it in Sanity Studio.</p>
      <table style="width:100%;border-collapse:collapse;background:#ffffff;border:1px solid #e3e9f2;border-radius:8px;overflow:hidden;font-size:14px;">
        <tr><td style="padding:6px 12px;font-weight:600;color:#0d1f3c;">Name</td><td style="padding:6px 12px;color:#142b56;">${esc(data.name)}</td></tr>
        ${data.role ? `<tr><td style="padding:6px 12px;font-weight:600;color:#0d1f3c;">Role</td><td style="padding:6px 12px;color:#142b56;">${esc(data.role)}</td></tr>` : ""}
        <tr><td style="padding:6px 12px;font-weight:600;color:#0d1f3c;">Rating</td><td style="padding:6px 12px;color:#142b56;">${stars} stars</td></tr>
        <tr><td style="padding:6px 12px;font-weight:600;color:#0d1f3c;vertical-align:top;">Testimonial</td><td style="padding:6px 12px;color:#142b56;">${esc(data.text).replace(/\n/g, "<br/>")}</td></tr>
      </table>
      <p style="margin:16px 0 0;">
        <a href="${esc(studioUrl)}" style="display:inline-block;background:#1a3d6e;color:#ffffff;text-decoration:none;padding:10px 18px;border-radius:8px;font-size:14px;">Review in Sanity Studio</a>
      </p>
    </div>
  </body>
</html>`;

  const text = [
    "New testimonial pending review",
    "",
    `Name: ${data.name}`,
    data.role ? `Role: ${data.role}` : null,
    `Rating: ${data.stars}/5`,
    "",
    data.text,
    "",
    `Review in Sanity Studio: ${studioUrl}`,
  ]
    .filter(Boolean)
    .join("\n");

  return { subject, html, text };
}
