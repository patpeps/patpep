# Patterson Peptides

Storefront for Patterson Peptides — research-use-only peptides and reference standards.

Built with Next.js (App Router), React, TypeScript, Tailwind CSS v4, and lucide-react.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |

## Structure

```
src/
  app/
    page.tsx              Home
    products/             Catalog + dynamic product pages
    checkout/             Order-request flow
    about/ quality/ contact/ terms/
  components/             Header, Footer, CartDrawer, ProductCard, Catalog, AddToCart
  lib/
    products.ts           Product catalog data (single source of truth)
    cart.tsx              Cart context, reducer, localStorage persistence
```

## Notes

- The catalog lives in `src/lib/products.ts`; adding a product there adds it to the grid, filters, and a statically generated detail page.
- Checkout collects contact, shipping, and a research-use attestation, then issues an order reference. **No payment processor is wired up and no card data is collected** — connect Stripe (or similar) and a real order backend before taking money.
- The contact form is client-side only; point it at a real endpoint before launch.
- All product copy is research-use-only. Keep the disclaimers in place — these compounds are not for human or veterinary use.
- Terms of sale are a template, not legal advice.
