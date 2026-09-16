"use client";

import { RotateCcw } from "lucide-react";
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
      className="inline-flex items-center gap-1.5 rounded-md border border-dashed border-border px-2.5 py-1.5 text-xs text-muted transition-colors hover:border-accent/50 hover:text-accent"
    >
      <RotateCcw className="h-3 w-3" aria-hidden="true" />
      Reset verification (dev only)
    </button>
  );
}
