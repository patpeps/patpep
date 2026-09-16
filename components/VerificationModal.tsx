"use client";

import Link from "next/link";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { site } from "@/lib/site";
import {
  getVerificationServerSnapshot,
  getVerificationSnapshot,
  setVerified,
  subscribeVerification,
} from "@/lib/verification";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * First-visit researcher verification acknowledgement.
 *
 * This is an informational acknowledgement of age and research-use intent.
 * It is not, and should not be treated as, legal proof of qualification.
 */
export default function VerificationModal() {
  const verified = useSyncExternalStore(
    subscribeVerification,
    getVerificationSnapshot,
    getVerificationServerSnapshot,
  );
  const dialogRef = useRef<HTMLDivElement>(null);
  const confirmRef = useRef<HTMLButtonElement>(null);

  // Lock background scroll and move focus into the dialog while it is open.
  useEffect(() => {
    if (verified) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    confirmRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.offsetParent !== null);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus?.();
    };
  }, [verified]);

  if (verified) return null;

  return (
    <div
      className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/70 p-4 backdrop-blur-sm"
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="verification-title"
        aria-describedby="verification-description"
        className="animate-scale-in my-auto w-full max-w-lg rounded-2xl border border-border bg-background p-6 shadow-2xl sm:p-8"
      >
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-accent/25 bg-accent-soft">
          <ShieldCheck className="h-5 w-5 text-accent" aria-hidden="true" />
        </span>

        <h2 id="verification-title" className="mt-5 text-xl font-semibold tracking-tight sm:text-2xl">
          Researcher Verification
        </h2>

        <p id="verification-description" className="mt-3 text-sm leading-relaxed text-muted">
          {site.name} sells research peptides exclusively to qualified researchers and laboratories
          for in vitro and laboratory use. Please confirm before continuing.
        </p>

        <ul className="mt-5 space-y-3 rounded-xl border border-border bg-surface p-4 text-sm leading-relaxed">
          <li className="flex gap-2.5">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
            <span>I am at least 21 years of age.</span>
          </li>
          <li className="flex gap-2.5">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
            <span>
              I confirm I am a qualified researcher purchasing for in vitro / laboratory research
              only &mdash; not for human or veterinary use.
            </span>
          </li>
        </ul>

        <button
          ref={confirmRef}
          type="button"
          onClick={setVerified}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
        >
          Enter {site.name} <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>

        <p className="mt-4 text-xs leading-relaxed text-muted">
          By proceeding you affirm the statements above are true. Products are not for human or
          veterinary use, not for use in diagnostic procedures, and have not been evaluated by the
          U.S. Food and Drug Administration.{" "}
          {/* Opens in a new tab so the acknowledgement stays on screen. */}
          <Link
            href="/disclaimer"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-accent underline underline-offset-2 hover:text-accent-hover"
          >
            Full disclaimer
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
