# Deploying Patterson Peptides

The site builds to plain static files. There is no server, no database, and no API
routes, so it can be hosted anywhere that serves HTML. These instructions use
Firebase Hosting, which is Google's static host and has a free tier.

## 0. Before the first deploy

`url` in [`lib/site.ts`](lib/site.ts) is already set to
`https://pattersonpeptides.org`. That value feeds the canonical URLs, the Open
Graph tags, `robots.txt`, and the sitemap. If the domain ever changes, change it
there and rebuild.

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

## 5. Point pattersonpeptides.org at it (IONOS)

The domain is registered at IONOS, and its DNS stays there. You are changing
which server the domain points to, nothing else.

**First, clear the ICANN warning.** The domain page shows "Confirmation of
contact details required". Find the verification email from IONOS and click the
link. If that is not confirmed within 15 days of registration, the registry
suspends the domain and the site goes dark no matter how the DNS is set.

**Then, in the Firebase console:** Hosting -> Add custom domain ->
`pattersonpeptides.org`. Firebase gives you a TXT record first, then two A
records once ownership is verified. Use the exact values the console shows;
they differ between projects.

**Then, in IONOS** (Domains & SSL -> pattersonpeptides.org -> DNS):

| Record | What to do |
| --- | --- |
| `A` `@` -> `74.208.236.129` | **Replace** with the first A record Firebase gives you, then add a second A record for the other value |
| `AAAA` `@` -> `2607:f1c0:...` | **Delete.** That is the IONOS parking page over IPv6. Leaving it means IPv6 visitors keep seeing the old page |
| `TXT` `@` (Firebase verification) | **Add** the value Firebase gives you. This sits alongside the existing SPF record; multiple TXT records at `@` are fine |
| `MX` `@` (both mx00/mx01) | **Keep.** These are your email. Deleting them breaks mail |
| `TXT` `@` `v=spf1 ...` | **Keep.** Email authentication |
| `CNAME` `_dmarc`, `s1-ionos._domainkey`, `s2-ionos._domainkey`, `autodiscover` | **Keep.** All email |
| `TXT` `_dep_ws_mutex`, `CNAME` `_domainconnect` | Harmless IONOS internals. Leave them |

To cover `www.pattersonpeptides.org` too, add it as a second custom domain in
Firebase and create whatever record it asks for (usually a `CNAME` on the host
`www`).

**Do not buy the IONOS SSL certificate** it is prompting you for. Firebase issues
and renews a free certificate automatically once the DNS records resolve. The
domain will show "needs setup" in Firebase until that finishes, which is normal
and usually takes under an hour, though DNS changes can take up to a day to
spread.

To check progress from your machine:

```bash
nslookup pattersonpeptides.org
```

When that returns the Firebase IPs instead of `74.208.236.129`, the change has
gone through.

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
