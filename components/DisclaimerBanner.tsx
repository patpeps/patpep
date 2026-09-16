import Link from "next/link";
import { TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "bar" | "card";

/**
 * Research-use notice. `bar` is the thin strip used under the navbar;
 * `card` is the boxed version used inside page content.
 */
export default function DisclaimerBanner({
  variant = "card",
  className,
  children,
}: {
  variant?: Variant;
  className?: string;
  children?: React.ReactNode;
}) {
  if (variant === "bar") {
    return (
      <div
        className={cn(
          "border-b border-slate-800 bg-slate-900 px-4 py-2 text-center text-[11px] font-medium uppercase tracking-[0.14em] text-slate-200 sm:text-xs",
          className,
        )}
      >
        Research Use Only &middot; Not for human or veterinary use
      </div>
    );
  }

  return (
    <aside
      className={cn(
        "flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900",
        className,
      )}
    >
      <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <p>
        {children ?? (
          <>
            Products presented on this website are intended solely for in vitro and laboratory
            research by qualified researchers. They are not for human consumption, human
            administration, veterinary use, or diagnostic procedures, and have not been evaluated by
            the U.S. Food and Drug Administration for safety or efficacy for human or veterinary
            use.{" "}
            <Link href="/disclaimer" className="font-medium underline underline-offset-2">
              Read the full disclaimer
            </Link>
            .
          </>
        )}
      </p>
    </aside>
  );
}
