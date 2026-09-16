"use client";

import { useEffect, useRef } from "react";

/**
 * Counts up to `value` the first time the figure scrolls into view.
 *
 * The final value is server-rendered, so it is correct without JavaScript and
 * for assistive technology; the animation only rewrites the visible text.
 */
export default function CountUp({
  value,
  pad = 2,
  suffix = "",
  duration = 1100,
  className,
}: {
  value: number;
  pad?: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") return;

    const format = (n: number) => `${String(n).padStart(pad, "0")}${suffix}`;
    let frame = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          // Ease-out cubic.
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = format(Math.round(eased * value));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, pad, suffix, duration]);

  return (
    <span ref={ref} className={className}>
      {`${String(value).padStart(pad, "0")}${suffix}`}
    </span>
  );
}
