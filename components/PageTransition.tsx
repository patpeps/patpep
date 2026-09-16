"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Plays an enter animation on every in-app navigation.
 *
 * Keying on the pathname remounts the subtree when the route changes, which
 * restarts the CSS animations: content fades up, and an accent bar sweeps
 * across the top of the viewport so a click has an immediate, visible result.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname}>
      <span className="route-sweep" aria-hidden="true" />
      <div className="page-enter">{children}</div>
    </div>
  );
}
