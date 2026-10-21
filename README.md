# Ahmad Dzakiudin — Portfolio

Single-file portfolio. **Everything lives in `index.html`** — no build step, no dependencies, no
`npm install`. Open the file in a browser (or upload it to any static host) and it runs.

## ✨ Features

- **Monochrome Duality** — one-click switch between Obsidian Black and Archival Paper themes.
- **Command Palette** — `Ctrl+K` / `⌘K` for instant navigation, theme and audio control.
- **3D Acoustic Studio** — WebGL (three.js) piano/organ/harmonium, 16-step drum sequencer,
  17-key kalimba and a 6-string ensemble, all synthesised live with the Web Audio API.
- **Acoustic Engine** — 11 synth voices (piano, pipe organ, reed harmonium, 8 drums, kalimba,
  guitar/ukulele/bass/violin/cello/harp) with an analyser-driven navbar oscilloscope.
- **Parallax Engine** — one rAF loop drives layer parallax, image drift, scroll-progress hairline,
  scroll-spy navigation state and the education timeline fill.
- **Case Study System** — filterable project index with a full case-study modal for every repo.
- **Responsive by construction** — 12-column architectural grid that collapses to a mobile drawer,
  swipeable filters and a touch-friendly keybed.

## 🔌 External dependencies (CDN only)

| What | Source |
| --- | --- |
| Tailwind CSS 3.4.17 | `cdn.tailwindcss.com` |
| three.js r128 | `cdnjs.cloudflare.com` |
| Google Fonts (Cormorant Garamond, Inter, JetBrains Mono, Syne) | `fonts.googleapis.com` |
| Material Symbols Outlined | `fonts.googleapis.com` |

Everything else — the portrait photo, the film-grain texture and all styling — is inlined in
`index.html`, so a single file is enough. Internet access is required for the CDN assets.

## 🕹 Controls

- `Ctrl+K` / `⌘K` — open the command palette, `Esc` — close.
- Piano keys: `A W S E D F T G Y H U J K O L P ;` (only while the piano panel is open).
- Click or drag across the 2D keybed, kalimba tines and string bridge to play.

## 📁 Repository

```
index.html   # the entire portfolio (markup + styles + logic + data)
README.md    # this file
```

> Engineered with a passion for precision and scalability. Built by **Ahmad Dzakiudin**. Let's Collaborate!
