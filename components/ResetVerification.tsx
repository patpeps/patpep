"use client";

import { clearVerified } from "@/lib/verification";

/**
 * Development helper: clears the stored researcher acknowledgement so the
 * verification modal appears again. Rendered only in development builds.
 *
 * You can also run this in any browser console:
 *   localStorage.removeItem("pp.researcher-verified.v1"); location.reload();
 */
export default function ResetVerification() {
  if (process.env.NODE_ENV !== "development") return null;

  return (
    <button
      type="button"
      onClick={clearVerified}
      className="label press border border-dashed border-rule-on-ink px-3 py-2 text-[0.55rem] text-on-ink-muted hover:border-acid hover:text-acid"
    >
      Reset verification (dev only)
    </button>
  );
}
