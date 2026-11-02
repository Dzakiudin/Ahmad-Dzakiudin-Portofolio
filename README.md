# Ahmad Dzakiudin — Portfolio

Personal portfolio for Ahmad Dzakiudin, a full-stack developer and AI systems builder. The site is
a static page built from one HTML file, with its styles and JavaScript included inline.

## What’s on the site

- **Hero** — illustrated portfolio introduction with animated meadow details and a scroll transition.
- **Selected work** — four featured projects presented in a scroll-driven horizontal gallery, with
  project details and repository links.
- **Also on the desk** — cards for additional software, public-sector IT, archive, and hardware work.
- **Career path** — a horizontal timeline with milestone cards and a year scrubber.
- **About** — profile, interactive kudos, skills, and a small barbell progress widget.
- **Contact** — an interactive paper-plane scene, email and social links, and a CV/contact modal.
- **Responsive layout** — mobile-friendly sections and controls, with scroll-driven effects on larger
  screens.

## Run locally

No build step or package installation is required. Clone the repository and open `index.html` in a
browser:

```bash
git clone https://github.com/Dzakiudin/Ahmad-Dzakiudin-Portofolio.git
cd Ahmad-Dzakiudin-Portofolio
```

You can also serve the files locally:

```bash
python -m http.server 8000
```

Then open <http://localhost:8000>.

## Deploy

This is a static site. The included [`vercel.json`](./vercel.json) configures Vercel to serve the
repository root without a framework build step. Connect the GitHub repository to Vercel, or deploy
from the project directory with the Vercel CLI.

## Files and assets

| Path | Purpose |
| --- | --- |
| `index.html` | Page markup, inline CSS, page content, and interactive JavaScript |
| `assets/` | Local portfolio illustrations, profile photo, and project images |
| `vercel.json` | Static Vercel deployment configuration |

Tailwind CSS 3.4.17 and the Fraunces, Plus Jakarta Sans, and JetBrains Mono fonts load from CDNs.
Some project screenshots and card images are also loaded from external image URLs, so an internet
connection is needed for those assets.

## Interactions

- Scroll through the hero, work gallery, and career timeline.
- Select a featured project to open its case-study details.
- Use the timeline scrubber, kudos button, and barbell widget.
- Drag the paper plane in the contact scene or use **Auto-throw**.
- Open the CV/contact modal from the navigation.
- Press `Esc` to close an open modal.

## Contact

- Email: [dzakiudin07@gmail.com](mailto:dzakiudin07@gmail.com)
- GitHub: <https://github.com/Dzakiudin>
- LinkedIn: <https://www.linkedin.com/in/ahmad-dzakiudin-30404b344/>
