import Link from "next/link";

export default function NotFound() {
  return (
    <div className="on-ink relative overflow-hidden bg-ink text-on-ink">
      <div className="console-grid console-grid-drift absolute inset-0" aria-hidden="true" />
      <div className="halo halo-breathe absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-4 py-28 sm:px-6 sm:py-40">
        <p className="label text-[0.58rem] text-acid">Error 404</p>
        <h1 className="display mt-6 text-[3.5rem] leading-[0.9] sm:text-[5.5rem]">
          Page not
          <br />
          <span className="display-light">found.</span>
        </h1>
        <div className="trace-rule mt-8 w-28 opacity-80" aria-hidden="true" />
        <p className="mt-8 max-w-md text-sm leading-relaxed text-on-ink-muted">
          The page you are looking for does not exist or may have been moved.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/"
            className="press group flex items-center gap-4 bg-acid px-6 py-4 text-ink hover:bg-on-ink"
          >
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 group-hover:-translate-x-1.5"
            >
              &larr;
            </span>
            <span className="label text-[0.65rem]">Back to home</span>
          </Link>
          <Link
            href="/catalog"
            className="label press border border-rule-on-ink px-6 py-4 text-[0.65rem] hover:border-acid hover:text-acid"
          >
            Research catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
