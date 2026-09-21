# Caslumi — company website

Marketing site for Caslumi: aluminum outdoor furniture components, fire pit
structures, custom aluminum profiles and OEM/ODM manufacturing across China and
Cambodia, aimed at buyers in the United States.

Plain HTML, CSS and vanilla JavaScript. There is **no build step** — what is in
this repository is what gets served.

---

## Run it locally

Open `index.html` in a browser, or serve the folder so that relative paths and
`fetch` behave exactly as they will in production:

```bash
# Python
python -m http.server 5173

# or Node
npx serve .
```

Then visit <http://localhost:5173>.

---

## Deploy on Vercel

1. Go to Vercel → **Add New → Project** and import this repository.
2. Framework preset: **Other**.
3. Build command: leave **empty**. Output directory: leave **empty** (root).
4. Deploy.

`vercel.json` sets cache headers for `/assets/*` and a few standard security
headers. Every push to `main` redeploys automatically.

A company website is a commercial project, so use a Vercel plan that permits
commercial use rather than the personal Hobby tier.

### Custom domain

In Vercel: **Project → Settings → Domains**, add `caslumi.com` and
`www.caslumi.com`, then copy the DNS records Vercel displays into your registrar
(Namecheap: **Domain List → Manage → Advanced DNS → Host Records**). Use the
values Vercel shows you — do not copy IPs from old tutorials. Keep any existing
MX, SPF and DKIM records so company email keeps working.

---

## Editing content

| What you want to change | Where |
| --- | --- |
| Email, phone, WhatsApp, WeChat, U.S. address | `assets/js/config.js` |
| RFQ form provider and key | `assets/js/config.js` |
| Navigation menu, footer links | `assets/js/site.js` (top of the file) |
| Colours, spacing, typography | `assets/css/style.css` (`:root`) |
| Page copy | the matching `*.html` file |

The header and footer are injected by `assets/js/site.js`, so nav changes are
made once rather than across twenty files.

---

## Turning the RFQ form on

The quote form at `rfq.html` is the most important page on the site. A static
site cannot send email by itself, so it needs one external service.

Until you connect one, the form falls back to opening the visitor's email client
with every answer pre-filled — nothing is lost, but it is not ideal.

To make it send properly:

1. Create a free account at [Web3Forms](https://web3forms.com) (or
   [Formspree](https://formspree.io)).
2. Paste the key into `assets/js/config.js`:

   ```js
   formAccessKey: "your-web3forms-access-key",
   ```

   For Formspree instead, leave `formAccessKey` empty and set
   `formEndpoint: "https://formspree.io/f/xxxxxxx"`.
3. Commit and push. Test by submitting the form yourself.

File attachments (PDF / DWG / STEP / images) may require a paid tier on either
provider — check the current plan limits before relying on it.

---

## Content still to confirm

These are deliberately left as placeholders rather than invented. Search the
repository for `TODO` to find each one in context.

- **U.S. entity details** — company name, office address, phone number
  (`about.html`, `contact.html`, `config.js`).
- **Certifications** — `quality.html` and `product-fire-pit-tables.html` describe
  the inspection process and the compliance conversation, but list no specific
  certificates. Only add certifications the plants can produce a current
  certificate for.
- **Case studies** — `projects.html` currently carries three representative,
  anonymised programmes. Replace them with real named projects once customers
  have given written permission, and do not publish any customer logo without it.
- **MOQ figures** — the product pages quote typical ranges. Confirm them against
  what the plants will actually commit to.

---

## Images

Source photography lives in the parent folder at full resolution. The copies in
`assets/img/` are resized to 1800&nbsp;px and re-encoded, which took the set from
roughly 100&nbsp;MB down to about 8&nbsp;MB so the repository and the site stay
fast.

`factory-*.jpg` are the plants in Guangdong. `product-*.jpg` are catalogue
lifestyle images.
