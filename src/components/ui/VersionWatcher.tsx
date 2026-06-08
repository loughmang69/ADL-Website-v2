"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Closes the "users stuck on an old version" gap that asset hashing and CDN
 * purging can't reach: a browser tab that was opened *before* a deploy keeps
 * running the previous build's JavaScript until something forces a reload.
 *
 * On an interval — and whenever the tab regains focus/visibility — we ask the
 * server (/api/version, never cached) for the live deployment's build id and
 * compare it to the id this bundle booted with. When they differ:
 *   - a backgrounded tab is reloaded silently (the user isn't looking, so
 *     there's nothing to interrupt and no form state to lose), and
 *   - a visible tab shows a dismissible prompt rather than yanking the page out
 *     from under someone who may be mid-form.
 *
 * `NEXT_PUBLIC_BUILD_ID` is inlined per build (see next.config.ts), so an old
 * tab carries the old id while the live /api/version returns the new one.
 */

const BOOT_BUILD_ID = process.env.NEXT_PUBLIC_BUILD_ID ?? "unknown";
const POLL_INTERVAL_MS = 60_000;

export default function VersionWatcher() {
  const [updateReady, setUpdateReady] = useState(false);
  // Guards against re-running the check (or re-toasting) once we've already
  // confirmed a new build is live.
  const handledRef = useRef(false);

  const check = useCallback(async () => {
    if (handledRef.current) return;
    try {
      const res = await fetch("/api/version", { cache: "no-store" });
      if (!res.ok) return;
      const { id } = (await res.json()) as { id?: string };
      if (!id || id === "unknown" || id === BOOT_BUILD_ID) return;

      handledRef.current = true;
      if (document.visibilityState === "hidden") {
        // Safe to refresh an unattended tab; the user returns to fresh content.
        window.location.reload();
      } else {
        setUpdateReady(true);
      }
    } catch {
      // Network blip — try again on the next tick.
    }
  }, []);

  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === "visible") check();
    };
    const id = window.setInterval(check, POLL_INTERVAL_MS);
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", check);
    // One check shortly after mount, in case a deploy landed mid-session.
    check();
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", check);
    };
  }, [check]);

  if (!updateReady) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-x-4 bottom-4 z-[200] mx-auto flex max-w-md flex-col gap-3 rounded-2xl bg-navy p-4 text-white shadow-2xl sm:flex-row sm:items-center sm:justify-between"
    >
      <p className="text-sm font-medium">
        A new version of this site is available.
      </p>
      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-navy transition hover:bg-white/90"
        >
          Refresh
        </button>
        <button
          type="button"
          onClick={() => setUpdateReady(false)}
          className="rounded-lg px-3 py-2 text-sm font-medium text-white/70 transition hover:text-white"
          aria-label="Dismiss"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
