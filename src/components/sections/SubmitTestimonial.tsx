"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { XIcon, CheckCircleIcon } from "@phosphor-icons/react/dist/ssr";
import Button from "@/components/ui/Button";
import StarRating from "@/components/ui/StarRating";

type Status = "idle" | "loading" | "error";

export default function SubmitTestimonial() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [stars, setStars] = useState(0);
  const [toast, setToast] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setStatus("idle");
    setError(null);
    triggerRef.current?.focus();
  }, []);

  // Focus management + Escape + Tab trap
  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const focusable = dialog?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    focusable?.[0]?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key === "Tab" && focusable && focusable.length > 0) {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(false), 5000);
    return () => clearTimeout(t);
  }, [toast]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      role: String(data.get("role") ?? "").trim(),
      stars,
      text: String(data.get("text") ?? "").trim(),
      "bot-field": String(data.get("bot-field") ?? ""),
    };

    if (!payload.name) return setError("Please enter your name.");
    if (stars < 1) return setError("Please select a star rating.");
    if (payload.text.length < 20)
      return setError("Please write at least 20 characters.");
    if (!data.get("permission"))
      return setError("Please grant permission to display your testimonial.");

    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/testimonial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        close();
        setStars(0);
        setToast(true);
        return;
      }
      if (res.status === 429) {
        setStatus("error");
        setError("Too many requests. Please try again in a minute.");
        return;
      }
      setStatus("error");
      setError("Something went wrong. Please try again later.");
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again later.");
    }
  }

  const inputClass =
    "w-full rounded-lg border border-navy-deepest/15 bg-white px-4 py-3 text-navy-deepest placeholder:text-navy-soft/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1";

  return (
    <>
      <div className="mt-16 rounded-2xl bg-white p-8 text-center">
        <h3 className="text-2xl font-black tracking-tight text-navy-deepest">
          Share Your Experience
        </h3>
        <p className="mx-auto mt-2 max-w-prose text-navy-soft">
          Worked with ADL Business Consulting? We&rsquo;d love to hear about it.
        </p>
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition-[transform,background-color] duration-150 ease-out hover:bg-navy-deep active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          Submit a Testimonial
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-deepest/60 p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="testimonial-title"
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-7 shadow-2xl"
          >
            <div className="flex items-start justify-between">
              <h3
                id="testimonial-title"
                className="text-xl font-black tracking-tight text-navy-deepest"
              >
                Submit a Testimonial
              </h3>
              <button
                type="button"
                onClick={close}
                aria-label="Close dialog"
                className="rounded-full p-1 text-navy-soft transition-colors hover:bg-surface-soft hover:text-navy active:scale-95"
              >
                <XIcon size={22} aria-hidden="true" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label>
                  Do not fill this out
                  <input
                    type="text"
                    name="bot-field"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </label>
              </div>

              {error && (
                <p
                  role="alert"
                  className="rounded-lg border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger"
                >
                  {error}
                </p>
              )}

              <div>
                <label
                  htmlFor="t-name"
                  className="mb-1.5 block text-sm font-semibold text-navy-deepest"
                >
                  Full Name <span className="text-danger">*</span>
                </label>
                <input id="t-name" name="name" type="text" required className={inputClass} />
              </div>

              <div>
                <label
                  htmlFor="t-role"
                  className="mb-1.5 block text-sm font-semibold text-navy-deepest"
                >
                  Your Role / Company
                </label>
                <input
                  id="t-role"
                  name="role"
                  type="text"
                  placeholder="Owner, Excel Cleaning, LLC"
                  className={inputClass}
                />
              </div>

              <div>
                <span className="mb-1.5 block text-sm font-semibold text-navy-deepest">
                  Rating <span className="text-danger">*</span>
                </span>
                <StarRating
                  value={stars}
                  onChange={setStars}
                  size={28}
                  name="stars"
                />
              </div>

              <div>
                <label
                  htmlFor="t-text"
                  className="mb-1.5 block text-sm font-semibold text-navy-deepest"
                >
                  Your Testimonial <span className="text-danger">*</span>
                </label>
                <textarea
                  id="t-text"
                  name="text"
                  rows={5}
                  required
                  minLength={20}
                  maxLength={2000}
                  className={`${inputClass} resize-y`}
                />
              </div>

              <label className="flex items-start gap-2 text-sm text-navy-soft">
                <input
                  type="checkbox"
                  name="permission"
                  required
                  className="mt-1 h-4 w-4 accent-navy"
                />
                <span>
                  I give ADL Business Consulting permission to display this
                  testimonial on their website.
                </span>
              </label>

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Submitting..." : "Submit Testimonial"}
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-medium text-white shadow-2xl"
        >
          <CheckCircleIcon
            size={20}
            weight="fill"
            className="text-accent"
            aria-hidden="true"
          />
          Thank you! We&rsquo;ll review your testimonial.
        </div>
      )}
    </>
  );
}
