# Deploying Patterson Peptides

The site builds to plain static files. There is no server, no database, and no API
routes, so it can be hosted anywhere that serves HTML. These instructions use
Firebase Hosting, which is Google's static host and has a free tier.

## 0. Before the first deploy

Open [`lib/site.ts`](lib/site.ts) and set `url` to the domain you are going to use:

```ts
url: "https://yourdomain.com",
```

That value feeds the canonical URLs, the Open Graph tags, `robots.txt`, and the
sitemap. Getting it wrong will not break the site, but search engines and link
previews will point at the wrong host.

## 1. Build

```bash
npm run build
```

This writes the whole site to `out/`. Nothing in that folder needs Node to run.

## 2. Install the Firebase CLI and sign in

```bash
npm install -g firebase-tools
```

```bash
firebase login
```

This opens a browser window. Sign in with the Google account that should own the
project.

## 3. Create a Firebase project and connect it

Create a project at https://console.firebase.google.com (any name; the project ID
is what matters). Then, from the repo:

```bash
firebase use --add
```

Pick your project from the list and give it the alias `default`. This writes a
`.firebaserc` file, which is git-ignored.

`firebase.json` is already in the repo, so you do **not** need `firebase init` —
it is configured to publish `out/`, use clean URLs (`/catalog`, not
`/catalog.html`), serve the exported `404.html`, and set sensible cache headers.

## 4. Deploy

```bash
firebase deploy --only hosting
```

The CLI prints a `*.web.app` URL. Open it and check the site works before
pointing your domain at it.

Every later deploy is the same two commands:

```bash
npm run build && firebase deploy --only hosting
```

## 5. Point your domain at it

In the Firebase console: **Hosting → Add custom domain**. Enter your domain
(add `www` as a second domain if you want both).

Firebase will ask you to prove ownership and then give you DNS records to create:

- a **TXT** record for verification, then
- two **A** records for the apex domain (`yourdomain.com`), or
- a **CNAME** record if you are setting up `www.yourdomain.com`.

Add those records wherever your domain's DNS lives — that is your registrar's
control panel. If you bought the domain through Google Domains, those domains
were transferred to Squarespace, so the DNS settings are at
https://account.squarespace.com/domains now. Cloudflare, Namecheap, GoDaddy and
the rest all have an equivalent DNS page.

Two things to expect:

- DNS changes can take anything from a few minutes to a day to propagate.
- Firebase provisions the SSL certificate automatically once it sees the records.
  The domain shows as "needs setup" until that finishes, which is normal.

## Other hosts

Nothing here is Firebase-specific except `firebase.json`. The same `out/` folder
deploys to Cloudflare Pages, Netlify, GitHub Pages, or a Cloud Storage bucket
behind Cloud CDN.

**Vercel** is the other easy option and skips the build step entirely: import the
GitHub repo at https://vercel.com/new and it deploys on every push, with custom
domains handled in its dashboard. If you go that route, you can delete
`output: "export"` from [`next.config.ts`](next.config.ts) — Vercel runs Next.js
directly.

## If you later add a server feature

A working contact form, a real order system, anything that needs a backend —
those need a server, and `output: "export"` in `next.config.ts` has to go. At
that point use **Firebase App Hosting** (which runs Next.js server-side and
deploys from GitHub) or Vercel, instead of plain Hosting.
