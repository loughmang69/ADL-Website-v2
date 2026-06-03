import type { ContactInput } from "@/lib/validations/contact";

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value?: string): string {
  if (!value) return "";
  return `<tr>
    <td style="padding:6px 12px;font-weight:600;color:#0d1f3c;vertical-align:top;">${esc(label)}</td>
    <td style="padding:6px 12px;color:#142b56;">${esc(value).replace(/\n/g, "<br/>")}</td>
  </tr>`;
}

export function buildContactEmail(data: ContactInput) {
  const subject = `New consultation request from ${data.name}`;

  const html = `<!doctype html>
<html>
  <body style="margin:0;background:#f7f9fc;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:560px;margin:0 auto;padding:24px;">
      <h1 style="font-size:18px;color:#0d1f3c;margin:0 0 4px;">New consultation request</h1>
      <p style="font-size:13px;color:#1a6a8a;margin:0 0 16px;">Submitted via adlbusinessconsulting.com</p>
      <table style="width:100%;border-collapse:collapse;background:#ffffff;border:1px solid #e3e9f2;border-radius:8px;overflow:hidden;font-size:14px;">
        ${row("Name", data.name)}
        ${row("Email", data.email)}
        ${row("Phone", data.phone || undefined)}
        ${row("Business / Industry", data.businessType || undefined)}
        ${row("Interested in", data.helpWith || undefined)}
        ${row("Preferred contact", data.contactMethod)}
        ${row("Notes", data.notes || undefined)}
      </table>
    </div>
  </body>
</html>`;

  const text = [
    "New consultation request",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : null,
    data.businessType ? `Business / Industry: ${data.businessType}` : null,
    data.helpWith ? `Interested in: ${data.helpWith}` : null,
    `Preferred contact: ${data.contactMethod}`,
    data.notes ? `Notes: ${data.notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  return { subject, html, text, replyTo: data.email };
}
