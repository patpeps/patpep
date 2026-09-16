"use client";

import Link from "next/link";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { site } from "@/lib/site";
import {
  getVerificationServerSnapshot,
  getVerificationSnapshot,
  setVerified,
  subscribeVerification,
} from "@/lib/verification";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const STATEMENTS = [
  "I am at least 21 years of age.",
  "I confirm I am a qualified researcher purchasing for in vitro / laboratory research only — not for human or veterinary use.",
];

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
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-ink/85 p-4 backdrop-blur-[3px]"
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="verification-title"
        aria-describedby="verification-description"
        className="on-ink reveal relative my-auto w-full max-w-xl overflow-hidden border border-rule-on-ink bg-ink text-on-ink"
      >
        <div className="console-grid console-grid-drift absolute inset-0 opacity-70" aria-hidden="true" />
        <div className="halo halo-breathe absolute inset-0 opacity-70" aria-hidden="true" />

        <div className="relative p-7 sm:p-10">
          <div className="flex items-center gap-3">
            <span className="live-dot h-1.5 w-1.5 bg-acid" aria-hidden="true" />
            <p className="label text-[0.58rem] text-acid">Gate 01</p>
          </div>

          <h2
            id="verification-title"
            className="display mt-5 text-4xl leading-[0.95] sm:text-5xl"
          >
            Researcher
            <br />
            Verification
          </h2>

          <div className="trace-rule mt-6 w-24 opacity-80" aria-hidden="true" />

          <p
            id="verification-description"
            className="mt-6 text-sm leading-relaxed text-on-ink-muted"
          >
            {site.name} sells research peptides exclusively to qualified researchers and
            laboratories for in vitro and laboratory use. Please confirm before continuing.
          </p>

          <ul className="mt-7 divide-y divide-rule-on-ink border-y border-rule-on-ink">
            {STATEMENTS.map((statement, index) => (
              <li key={statement} className="row-slide flex gap-4 py-4">
                <span className="label shrink-0 pt-0.5 text-[0.55rem] text-acid">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm leading-relaxed text-on-ink">{statement}</span>
              </li>
            ))}
          </ul>

          <button
            ref={confirmRef}
            type="button"
            onClick={setVerified}
            className="press group mt-7 flex w-full items-center justify-between gap-4 bg-acid px-5 py-4 text-ink hover:bg-on-ink"
          >
            <span className="label text-[0.7rem]">Enter {site.name}</span>
            <span className="arrow-shift" aria-hidden="true">
              &rarr;
            </span>
          </button>

          <p className="mt-5 text-xs leading-relaxed text-on-ink-muted">
            By proceeding you affirm the statements above are true. Products are not for human or
            veterinary use, not for use in diagnostic procedures, and have not been evaluated by the
            U.S. Food and Drug Administration.{" "}
            {/* Opens in a new tab so the acknowledgement stays on screen. */}
            <Link
              href="/disclaimer"
              target="_blank"
              rel="noopener noreferrer"
              className="link-sweep font-medium text-acid"
            >
              Full disclaimer
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
