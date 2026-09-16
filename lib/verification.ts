/**
 * Researcher-verification acknowledgement.
 *
 * The acknowledgement is stored in localStorage so the modal does not appear on
 * every page load. It is an informational age / research-use acknowledgement
 * only. It is not proof that a visitor is a qualified researcher.
 *
 * To reset it while developing, either use the "Reset verification" control in
 * the footer (development builds only) or run this in the browser console:
 *
 *   localStorage.removeItem("pp.researcher-verified.v1"); location.reload();
 */

import { VERIFICATION_STORAGE_KEY } from "@/lib/utils";

const EVENT_NAME = "pp:verification-change";

/** Subscribe to acknowledgement changes (same tab and other tabs). */
export function subscribeVerification(onChange: () => void): () => void {
  window.addEventListener(EVENT_NAME, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT_NAME, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** Client snapshot: has the visitor acknowledged? */
export function getVerificationSnapshot(): boolean {
  try {
    return window.localStorage.getItem(VERIFICATION_STORAGE_KEY) === "true";
  } catch {
    // Storage blocked (private mode, disabled cookies): don't trap the visitor
    // behind a modal we can never remember dismissing.
    return true;
  }
}

/**
 * Server snapshot: treat as acknowledged so the modal is never part of the
 * server-rendered HTML. It appears immediately after hydration when needed.
 */
export function getVerificationServerSnapshot(): boolean {
  return true;
}

export function setVerified(): void {
  try {
    window.localStorage.setItem(VERIFICATION_STORAGE_KEY, "true");
  } catch {
    // Ignore write failures; the modal still closes for this session.
  }
  window.dispatchEvent(new Event(EVENT_NAME));
}

export function clearVerified(): void {
  try {
    window.localStorage.removeItem(VERIFICATION_STORAGE_KEY);
  } catch {
    // Ignore.
  }
  window.dispatchEvent(new Event(EVENT_NAME));
}
