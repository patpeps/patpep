# Patterson Peptides

Informational website for Patterson Peptides, a Patterson, California based research company.

Built with Next.js (App Router), React, TypeScript, Tailwind CSS v4, and lucide-react (used
sparingly — most visual marks in this design are typographic).

**This site is informational only.** There is no cart, checkout, payment processing, or order
submission anywhere in the codebase, and none should be added without also revisiting the legal
pages. Products are presented as research catalog information.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |

## Design system

The site deliberately avoids the default "AI landing page" look (system/Inter fonts, purple-on-white
gradients, flat fills, no motion). Everything below is defined once in
[`app/globals.css`](app/globals.css).

**Typography** — three faces loaded via `next/font`:

| Role | Face | Used for |
| --- | --- | --- |
| Display | Bricolage Grotesque | Headlines, product names, mobile nav (`.display` at weight 800, `.display-light` at 200) |
| Body | Sora | Paragraphs and lede copy (`.lede`) |
| Mono | JetBrains Mono | Eyebrows, labels, badges, figures (`.label`) |

Weight extremes carry the contrast: 800 against 200 in the same headline, mono labels at ~0.58rem
next to display type at 3–6rem.

**Palette** — bone paper, ink slabs, one acid accent:

| Token | Value | Notes |
| --- | --- | --- |
| `--paper` / `--paper-2` / `--paper-3` | bone | Page, panels, insets |
| `--ink` / `--ink-2` / `--ink-3` | near-black | Header, hero, footer, modal |
| `--acid` | chartreuse | Accent. Only on dark surfaces or carrying dark text |
| `--acid-deep` | olive | The accent when it must be small text on paper |
| `--oxide` / `--oxide-deep` | rust | Pending status, notices |

Every text/background pair used on the site clears WCAG AA (verified: 5.6:1 to 16.5:1).

**Texture** — `.graph-paper`, `.console-grid`, `.halo`, `.halo-paper` and `.trace-rule` layer grids
and light pools instead of flat backgrounds.

## Reviews

Visitors can write reviews from the bottom of the Research Catalog page. They
are stored in Firestore and read back by the browser, so the site stays static
with no server of its own.

**Nothing on that page is invented.** There are no seeded, sample or example
reviews anywhere in this repo. The section is empty until real people write
something, and it says so.

### Publishing a review

Every submission is saved with `status: "pending"` and is invisible on the site
until you publish it by hand:

1. Open the [Firestore data
   browser](https://console.firebase.google.com/project/peps-eafbc/firestore/data/~2Freviews)
2. Open the `reviews` collection. New submissions sit there as `pending`
3. To publish one, change its `status` field to `published`. It appears on the
   site immediately
4. To reject one, delete the document

Two reasons it works this way rather than posting instantly. Spam bots do find
open databases, and you do not want them writing on your catalog page. More
importantly, a review describing human or veterinary use would directly
contradict the research-use-only position the rest of the site takes, and you
want the chance to catch that before it is public. The form tells reviewers this
up front.

### What the rules allow

[`firestore.rules`](firestore.rules) is what keeps this safe, since the API key
in the client is public by design:

| Action | Who |
| --- | --- |
| Read a review | Anyone, but only ones already marked `published` |
| Create a review | Anyone, only in the exact shape allowed, only as `pending` |
| Edit a review | Nobody. Not from a browser, at any time |
| Delete a review | Nobody. Only you, in the console |

Submissions are also size-checked (rating 1-5, body 10-1500 characters, name up
to 60) and timestamp-checked, and the form carries a honeypot field that quietly
swallows bot submissions.

Deploy rule changes with:

```bash
firebase deploy --only firestore
```

### Cost

Firestore's free tier covers 50,000 reads and 20,000 writes a day. The catalog
page makes one read per visit, so this stays free.

## Motion

All CSS, no animation library. Four layers:

| Layer | How it works |
| --- | --- |
| **Page load** | `.reveal` / `.rule-draw` with a `--d` delay token stagger the hero in sequence |
| **On scroll** | [`components/Reveal.tsx`](components/Reveal.tsx) flips `data-revealed`; CSS transitions `up` / `fade` / `left` / `scale`. `delay` staggers groups |
| **On navigation** | [`components/PageTransition.tsx`](components/PageTransition.tsx) is keyed on the pathname, so every route change replays a fade-up plus an accent bar sweeping the top of the viewport |
| **Ambient** | `.console-grid-drift` (grids drift), `.halo-breathe` (light pools breathe), `.live-dot` (status pulse), `.marquee-track` (notice ticker, pauses on hover), `.trace-path` + `.scan-line` (hero chromatogram draws itself, then a scan line sweeps it) |

Click and hover feedback is standardised in three utilities: `.press` (lift on hover, push down on
click), `.press-card` (lift plus shadow, settle on press), and `.row-slide` (list rows indent with
an accent edge). `.arrow-shift` advances an arrow inside any `.group`, and `.link-sweep` draws an
underline in from the left. Legal pages carry a scroll-progress bar where `animation-timeline` is
supported.

Two accessibility notes, both deliberate:

- Under `prefers-reduced-motion: reduce` everything collapses to a static page — reveals are forced
  visible, the ticker stops and centres, and hover/press transforms are removed.
- Scroll reveals start hidden only inside `@media (scripting: enabled)`, and `Reveal` fails open
  (an unmeasurable viewport reveals immediately), so content can never get stuck invisible.

## Editing the catalog

**Everything about the catalog lives in one file: [`data/products.ts`](data/products.ts).**

| I want to... | Edit this |
| --- | --- |
| Change a name, description, amount, or price | The product's entry in `products` |
| Mark something available / pending / unavailable | `status: "available" \| "pending" \| "unavailable"` |
| Hide a product site-wide without deleting it | `visible: false` |
| Remove pricing from a card | `price: null` |
| Add a photo | Put the file in `/public`, set `image: "/file.jpg"` |
| Change the per-product disclaimer | `disclaimer:` (or `DEFAULT_DISCLAIMER` for all of them) |
| Add or rename a category | `categories` at the bottom of the same file |

Changing `status` updates the badge, the home-page counts, and the catalog automatically — no
component edits required. Setting `visible: false` removes the product everywhere, and a category
with no visible products stops rendering on its own.

Other things you may want to change:

| I want to... | Edit this |
| --- | --- |
| Company name, location, Instagram handle, domain | [`lib/site.ts`](lib/site.ts) |
| Navigation or footer links | `navItems` / `footerLinks` in `lib/site.ts` |
| Colors, fonts, textures, animations | [`app/globals.css`](app/globals.css) (see Design system and Motion above) |
| Disclaimer / Terms / Privacy wording | `SECTIONS` in the matching `app/*/page.tsx` |
| Verification modal copy | [`components/VerificationModal.tsx`](components/VerificationModal.tsx) |
| Favicon / touch icon / link preview | `app/icon.svg`, `app/apple-icon.png`, `app/opengraph-image.tsx`, `public/favicon.ico` |
| Sitemap routes | [`app/sitemap.ts`](app/sitemap.ts) |

## Structure

```
app/
  page.tsx            Home
  catalog/            Research catalog (reads data/products.ts)
  about/ contact/     Company pages
  disclaimer/ terms/ privacy/   Legal pages (content as a SECTIONS array)
  not-found.tsx       404
  robots.ts sitemap.ts opengraph-image.tsx icon.svg apple-icon.png
components/
  Navbar  Footer  VerificationModal  ResetVerification
  PageTransition  Reveal  CountUp  Marquee  HeroTrace
  PageHeader  ProductCard  StatusBadge  DisclaimerBanner  LegalPage  Logo  InstagramIcon
data/
  products.ts         THE catalog file — edit this one
lib/
  site.ts             Company details + navigation
  verification.ts     Researcher-acknowledgement storage
  utils.ts            cn() helper + storage key
public/
  favicon.ico
```

## Researcher verification modal

On a visitor's first load, a modal asks them to acknowledge that they are 21+ and are viewing the
site for laboratory research purposes. The acknowledgement is stored in `localStorage` under
`pp.researcher-verified.v1` so it does not reappear on every page load.

It is an informational acknowledgement only — it is not identity, age, or credential verification,
and the code does not treat it as proof of anything.

To reset it while developing, use the **Reset verification (dev only)** button in the footer (it
renders only in development builds), or run:

```bash
# in the browser console
localStorage.removeItem("pp.researcher-verified.v1"); location.reload();
```

## Before going live

- Set the real domain in `lib/site.ts` (`url`) — canonical URLs, Open Graph, `robots.txt`, and the
  sitemap all read from it.
- Have a qualified attorney review the Disclaimer, Terms & Conditions, and Privacy Policy. The
  current text is a plain-language template, not legal advice, and makes no claim of compliance with
  any particular jurisdiction.
- The Privacy Policy states that the site collects nothing and runs no analytics. If you add
  analytics, a contact form, or any other data collection, update that page first.
- Keep product copy factual. No medical, therapeutic, performance, or disease-related claims.
