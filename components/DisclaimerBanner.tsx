import Link from "next/link";
import { TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Research-use notice. `card` sits in page content on paper; `ink` is the
 * inverted version for dark slabs.
 */
export default function DisclaimerBanner({
  tone = "card",
  className,
  children,
}: {
  tone?: "card" | "ink";
  className?: string;
  children?: React.ReactNode;
}) {
  const onInk = tone === "ink";

  return (
    <aside
      className={cn(
        "relative border-l-2 py-4 pl-5 pr-4",
        onInk
          ? "on-ink border-acid bg-ink-2 text-on-ink-muted"
          : "border-oxide bg-oxide-soft/60 text-text",
        className,
      )}
    >
      <p
        className={cn(
          "label mb-2 flex items-center gap-2 text-[0.55rem]",
          onInk ? "text-acid" : "text-oxide-deep",
        )}
      >
        <TriangleAlert className="h-3.5 w-3.5" aria-hidden="true" />
        Notice
      </p>
      <p className="text-sm leading-relaxed">
        {children ?? (
          <>
            Products presented on this website are intended solely for in vitro and laboratory
            research by qualified researchers. They are not for human consumption, human
            administration, veterinary use, or diagnostic procedures, and have not been evaluated by
            the U.S. Food and Drug Administration for safety or efficacy for human or veterinary
            use.{" "}
            <Link
              href="/disclaimer"
              className={cn(
                "link-sweep font-medium",
                onInk ? "text-acid" : "text-text",
              )}
            >
              Read the full disclaimer
            </Link>
            .
          </>
        )}
      </p>
    </aside>
  );
}
