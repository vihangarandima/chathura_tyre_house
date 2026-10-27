# Chathura Tyre House — website

Static Next.js site (no server needed) with a procedural 3D tyre built in Three.js.
Tyres · Alloy wheels · Wheel alignment — Polonnaruwa.

---

## For the owner: changing things

### 1. Business facts → `content/site.ts`
Everything factual lives in **one file**: phone numbers, WhatsApp number, address,
opening hours, Google rating, Facebook/TikTok links, brands, tyre sizes, photos, clips
and reviews.

Search the file for `[CONFIRM]` — each one is a value taken from Google / the signboard
that you must check before launch. The most important:

| What | Where in `site.ts` |
|---|---|
| WhatsApp number (no `+`) | `whatsapp` |
| Phones | `phones` |
| Opening hours (opening time is a guess!) | `hours` |
| Brands you stock (empty = hidden) | `brands` |
| Real Google reviews, word for word | `reviews` (delete the `placeholder: true` ones) |
| Exact Facebook / TikTok page URLs | `social` |
| Final domain | `url` |

Words and sentences (headlines, buttons) are in `content/en.ts` (English) and
`content/si.ts` (Sinhala). **The Sinhala text must be checked by a native speaker.**

### 2. Photos → `public/shop/`
Drop phone photos in `public/shop/` (JPG/WebP, ~1600 px long side) and update the
paths in `site.ts → photos`. Any photo quality works — the site turns them into
red/black duotone automatically.

### 3. Clips → `public/clips/`
5–8 vertical clips, ≤ 6 s, muted, ≤ 1.5 MB. See `public/clips/README.txt` for the
ffmpeg command. List them in `site.ts → clips`. If a clip has no video file, tapping it
opens its TikTok link instead.

### 4. Deploy
```bash
npm install
npm run build
```
Upload the generated `out/` folder to **Cloudflare Pages, Netlify or Vercel** (all free for this).
On Cloudflare/Netlify: build command `npm run build`, output directory `out`.

---

## For developers

```bash
npm run dev            # http://localhost:3100
npm run typecheck
npm run build          # static export → out/
npm start              # serve out/ on :3100
```

### Structure
```
app/                 layout (fonts, JSON-LD, preloader) + page
  lab/               dev-only 3D lab: tune materials, export posters/OG image
components/          one file per section (Hero, Exploded, TyreRail, Configurator…)
  three/             Stage (single shared canvas + scene director), Wheel, geometry, textures
content/             site.ts (facts) · en.ts · si.ts (copy)
lib/                 i18n, opening-hours (Asia/Colombo), motion loader, 3D↔DOM store
styles/globals.css   tokens + all styles, organised by section
public/render/       posters, carousel renders, og.png (exported from /lab)
scripts/             render-server.mjs (saves /lab exports to public/render)
```

### How the 3D works
- **One `<Canvas>`**, fixed behind the page. Sections mark where the wheel should sit with
  `data-stage="hero|exploded|config|footer"`; the director in `three/Stage.tsx` follows the
  nearest anchor's on-screen box and animates between poses (roll-in, exploded view,
  configurator spin, roll-away).
- The tyre and the four alloy designs are **procedural** (lathe + extrude geometry, canvas-drawn
  tread / sidewall bump maps). No model files, no HDRI downloads.
- **One RAF loop:** GSAP's ticker drives Lenis, ScrollTrigger and the WebGL render
  (`frameloop="never"` + manual `advance`). Rendering stops when no 3D anchor is on screen.
- GSAP, Lenis and the Three.js chunk load **on the first pointer / touch / wheel / key**.
  Before that, WebP posters rendered from the same model carry the page.
- Reduced motion or no WebGL2 → posters only, no scrubbing/pinning.

### Re-rendering posters after changing the model
```bash
npm run render-server   # terminal 1
npm run dev             # terminal 2 → open http://localhost:3100/lab, click each preset → Export
```

### Adding Tamil
Create `content/ta.ts` typed as `Dict`, add it to `dictionaries` in `lib/i18n.tsx`, and add a
button to the language toggle in `components/Nav.tsx`.

### Performance notes (last measured)
- First-load JS: **121 KB gz** (target < 180 KB). Lazy 3D + motion: ~300 KB gz, after interaction.
- Lighthouse (local static build): desktop **99 / 97 / 100 / 100**; mobile **84–94** performance
  across runs (simulated throttling varies on this machine), a11y 97 → fixed the last contrast issue
  afterwards, BP 100, SEO 100. CLS ≤ 0.03.
- Not yet done: real-device tests (Galaxy A-series, iOS Safari, Samsung Internet).
