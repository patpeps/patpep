/** Join conditional class names. */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

/** localStorage key for the researcher-verification acknowledgement. */
export const VERIFICATION_STORAGE_KEY = "pp.researcher-verified.v1";
