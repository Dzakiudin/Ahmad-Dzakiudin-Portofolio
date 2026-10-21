# Ahmad Dzakiudin — Portfolio

<div align="center">

**Monochrome Architectural Portfolio — single file, zero build.**

</div>

The entire portfolio is one `index.html` file: markup, styles, the parallax engine, the Web Audio
synth engine and the WebGL instrument stage. No bundler, no `npm install`, no server needed —
open the file in a browser and it runs.

---

## ✨ Features

| Area | Detail |
| --- | --- |
| **Monochrome Duality** | One-click switch between *Obsidian Black* and *Archival Paper*. Every surface, border and label flips through CSS custom properties. |
| **Command Palette** | `Ctrl+K` / `⌘K` — instant navigation across sections and instruments, plus theme and audio toggles. |
| **3D Acoustic Studio** | four playable instruments rendered with three.js: 3D piano/organ/harmonium, 16-step drum machine, 17-key kalimba, 6-voice string atelier. |
| **Acoustic Engine** | 11 hand-built synth voices (piano, pipe organ, reed harmonium, 8 drum kits, kalimba, guitar, ukulele, bass, violin, cello, harp) with an analyser-driven navbar oscilloscope. |
| **Parallax Engine** | one `requestAnimationFrame` loop drives layer parallax, image drift, the scroll-progress hairline, scroll-spy navigation and the education timeline fill. |
| **Case Study System** | filterable project index (5 repos) with a full case-study modal: architecture layers, feature list, screenshots, source link. |
| **Contact Brief** | topic picker + free-text note → prefilled WhatsApp message or `mailto:` with subject and body. |
| **Responsive by construction** | 12-column architectural grid collapsing to a mobile drawer, swipeable filters, touch-friendly keybed. |

## 🚀 Quick Start

```bash
# 1. clone
git clone https://github.com/Dzakiudin/portfolio.git
cd portfolio

# 2. open — that's it, no install step
start index.html          # Windows
open  index.html          # macOS
xdg-open index.html       # Linux
```

Or serve it locally if you prefer a real origin (needed for some browsers to allow the Web Audio
context without a user gesture):

```bash
npx serve .
python -m http.server 8000
```

## 🌐 Deploy

The output is static, so any of these work with zero configuration — upload `index.html` only:

- **GitHub Pages** — push the repo, then *Settings → Pages → Deploy from branch → `main` / root*.
- **Netlify** — drag the folder into the Netlify drop zone.
- **Vercel** — `npx vercel deploy` (framework preset: *Other*).
- **Hostinger / cPanel** — upload `index.html` to `public_html/`.
- **Cloudflare Pages** — connect the repo, build command empty, output directory `/`.

## 🔌 External Dependencies (CDN only)

| What | Version | Source |
| --- | --- | --- |
| Tailwind CSS | 3.4.17 | `cdn.tailwindcss.com` |
| three.js | r128 | `cdnjs.cloudflare.com/ajax/libs/three.js` |
| Google Fonts | — | Cormorant Garamond, Inter, JetBrains Mono, Syne |
| Material Symbols Outlined | — | `fonts.googleapis.com` |

Everything else is inlined in `index.html`: the portrait photo (base64 data URI), the film-grain
texture (inline SVG filter) and all custom CSS. An internet connection is required for the CDN
assets above; without it the layout still renders but the fonts, icons and 3D stages will not.

## 🕹 Controls

| Input | Action |
| --- | --- |
| `Ctrl+K` / `⌘K` | open the command palette |
| `Esc` | close the command palette or any modal |
| `A W S E D F T G Y H U J K O L P ;` | play the piano (only while the piano panel is visible) |
| click / drag | 2D keybed, kalimba tines and string bridge play on press *and* on swipe |
| drum machine | **Start Sequencer** button, tempo slider (BPM) and the 8-track × 16-step matrix |

## 🛠️ Customising

| Want to change | Edit |
| --- | --- |
| Dark / light palette | CSS variables in the `:root` block (`--bg-primary`, `--text-primary`, …) and the `html.light-mono` override |
| Project case studies | `PROJECTS_DATA` — title, year, description, architecture layers, features, screenshots, repo link |
| Skill categories & inspector | `SKILL_CATEGORIES_DATA` |
| Command palette entries | `PALETTE_COMMANDS` |
| Piano / kalimba / string note tables | `PIANO_NOTES`, `KALIMBA_TINES`, `STRING_CHORDS` |
| Contact details | search for `dzakiudin07@gmail.com` and the WhatsApp number `6285707091624` |
| Social links | `github.com/Dzakiudin` and the LinkedIn profile URL |
| Section markup | the `<section id="hero|about|education|experience|projects|skills|contact">` blocks, plus the four instrument panels `studio-piano`, `studio-drums`, `studio-kalimba`, `studio-strings` |

Tip: `Ctrl+F` in the browser for `PROJECTS_DATA` jumps straight to the content that is most likely
to need your attention.

## 📁 Repository

```
index.html   # the whole portfolio: markup + styles + logic + content
README.md    # this file
```

## ♿ Accessibility & Notes

- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`) and a consistent heading order.
- The command palette, mobile menu and case-study modal are all dismissible with `Esc` and close on
  backdrop click.
- The 3D stages are progressive enhancement: if WebGL or three.js is unavailable the stage stays
  empty, while the 2D keybed, kalimba tine row and string bridge remain fully playable.
- Audio is opt-in — the Web Audio context is only created after the first user gesture, and the
  navbar has a mute toggle.

---

> Engineered with a passion for precision and scalability. Built by **Ahmad Dzakiudin**. Let's Collaborate!
