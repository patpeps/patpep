"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type Motion = "up" | "fade" | "left" | "scale";

/**
 * Reveals its children when they scroll into view.
 *
 * The hidden starting state lives in CSS behind `@media (scripting: enabled)`,
 * so a visitor without JavaScript sees the page fully rendered. This component
 * only flips `data-revealed`, which the CSS transitions.
 *
 * An IntersectionObserver does the work in the normal case. A slow interval
 * backs it up and clears itself the moment the element is revealed: observers
 * (and requestAnimationFrame) are suspended in tabs that aren't painting, and
 * nothing should ever be able to get stuck invisible.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  motion = "up",
  delay = 0,
  once = true,
  className,
  ...rest
}: {
  children: ReactNode;
  as?: ElementType;
  motion?: Motion;
  /** Stagger in milliseconds. */
  delay?: number;
  once?: boolean;
  className?: string;
  [key: string]: unknown;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                if (entry.isIntersecting) reveal();
                else if (!once) el.dataset.revealed = "false";
              }
            },
            { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
          );

    // Fails open: if the viewport can't be measured (a hidden frame, a pane
    // that never lays out), show the content rather than hide it.
    function shouldReveal() {
      if (!el) return true;
      const viewport = window.innerHeight || document.documentElement.clientHeight;
      if (!viewport) return true;
      const rect = el.getBoundingClientRect();
      return rect.top < viewport * 0.92 && rect.bottom > 0;
    }

    const timer = window.setInterval(() => {
      if (shouldReveal()) reveal();
    }, 400);

    function reveal() {
      if (!el) return;
      el.dataset.revealed = "true";
      window.clearInterval(timer);
      if (once) observer?.disconnect();
    }

    observer?.observe(el);

    // Anything already on screen at mount reveals immediately.
    if (shouldReveal()) reveal();

    return () => {
      observer?.disconnect();
      window.clearInterval(timer);
    };
  }, [once]);

  return (
    <Tag
      ref={ref}
      data-reveal={motion}
      style={{ "--d": `${delay}ms` } as React.CSSProperties}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}
