/**
 * Chromatogram-style trace that draws itself on load, with a scan line that
 * sweeps across it. Purely decorative atmosphere for the hero slab.
 */
export default function HeroTrace({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="h-full w-full"
        fill="none"
      >
        {/* Baseline */}
        <line
          x1="0"
          y1="100"
          x2="1200"
          y2="100"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.25"
        />
        {/* Trace */}
        <path
          className="trace-path"
          d="M0 100 L90 100 Q108 100 116 74 Q124 46 134 74 Q142 100 160 100 L250 100 Q262 100 268 88 Q274 74 282 88 Q288 100 300 100 L400 100 Q420 100 430 40 Q440 8 452 40 Q462 100 482 100 L560 100 Q574 100 582 80 Q590 58 600 80 Q608 100 622 100 L730 100 Q748 100 756 60 Q764 24 776 60 Q784 100 802 100 L900 100 Q912 100 918 86 Q924 70 932 86 Q938 100 950 100 L1040 100 Q1056 100 1064 68 Q1072 38 1082 68 Q1090 100 1106 100 L1200 100"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {/* Scan line sweeping the trace */}
      <span className="scan-line absolute inset-y-0 left-0 w-px bg-current opacity-70" />
    </div>
  );
}
