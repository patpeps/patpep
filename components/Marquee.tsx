/**
 * Infinite ticker. The track holds the items twice so the loop is seamless;
 * hovering pauses it, and reduced motion renders a single static copy.
 */
export default function Marquee({ items }: { items: string[] }) {
  return (
    <div className="marquee">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
            {items.map((item, index) => (
              <span key={`${item}-${index}`} className="flex items-center whitespace-nowrap">
                <span className="label text-[0.58rem] text-on-ink-muted">{item}</span>
                <span className="mx-5 h-1 w-1 shrink-0 bg-acid" aria-hidden="true" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
