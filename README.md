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
gradients, flat fills). Everything below is defined once in [`app/globals.css`](app/globals.css).

**Typography** — three faces loaded via `next/font`:

| Role | Face | Used for |
| --- | --- | --- |
| Display | Instrument Serif | Headlines, product names, nav on mobile (`.display`) |
| Body | IBM Plex Sans (300-600) | Paragraphs, lede copy (`.lede`) |
| Mono | IBM Plex Mono | Eyebrows, labels, badges, figures (`.label`) |

Sizes jump hard rather than gently: mono labels at ~0.58rem sit directly beside display type at
3–6rem.

**Palette** — bone paper, ink slabs, one acid accent:

| Token | Value | Notes |
| --- | --- | --- |
| `--paper` / `--paper-2` / `--paper-3` | bone | Page, panels, insets |
| `--ink` / `--ink-2` / `--ink-3` | near-black | Header, hero, footer, modal |
| `--acid` | chartreuse | Accent. Only on dark surfaces or carrying dark text |
| `--acid-deep` | olive | The accent when it must be small text on paper |
| `--oxide` / `--oxide-deep` | rust | Pending status, notices |

Every text/background pair used on the site clears WCAG AA (verified: 5.6:1 to 16.5:1).

**Texture** — `.graph-paper`, `.console-grid`, `.halo`, `.halo-paper`, `.grain`, `.trace-rule`
layer grids and light pools instead of flat backgrounds.

**Motion** — CSS only. `.reveal`, `.wipe`, and `.rule-draw` accept a `--d` delay so a page load
staggers; `.link-sweep` and card hovers handle micro-interaction; `.live-dot` marks live status.
All of it collapses under `prefers-reduced-motion`.

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
| Colors, fonts, textures, animations | [`app/globals.css`](app/globals.css) (see Design system above) |
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
