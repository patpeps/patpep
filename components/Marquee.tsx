import { cn } from "@/lib/utils";

/**
 * Infinite ticker. The track holds the items twice so the loop is seamless;
 * hovering pauses it, and reduced motion renders a single static copy.
 */
export default function Marquee({
  items,
  reverse = false,
  duration = 26,
  size = "sm",
  className,
  itemClassName,
  dotClassName,
}: {
  items: string[];
  /** Run right-to-left (default) or left-to-right. */
  reverse?: boolean;
  /** Seconds for one full loop. Lower is faster. */
  duration?: number;
  size?: "sm" | "lg";
  className?: string;
  itemClassName?: string;
  dotClassName?: string;
}) {
  return (
    <div className={cn("marquee", className)}>
      <div
        className={cn("marquee-track", reverse && "marquee-reverse")}
        style={{ animationDuration: `${duration}s` }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
            {items.map((item, index) => (
              <span key={`${item}-${index}`} className="flex items-center whitespace-nowrap">
                <span
                  className={cn(
                    size === "lg"
                      ? "display text-3xl uppercase sm:text-5xl"
                      : "label text-[0.6rem]",
                    itemClassName,
                  )}
                >
                  {item}
                </span>
                <span
                  className={cn(
                    "shrink-0",
                    size === "lg" ? "mx-6 h-2.5 w-2.5 sm:mx-10" : "mx-5 h-1 w-1",
                    dotClassName ?? "bg-acid",
                  )}
                  aria-hidden="true"
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
