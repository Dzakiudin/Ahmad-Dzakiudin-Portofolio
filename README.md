# Ahmad Dzakiudin — Portfolio (React + TypeScript + Vite)

Personal portfolio for Ahmad Dzakiudin, a full-stack developer and AI systems builder. Built with **React 18**, **TypeScript**, **Vite**, and **Tailwind CSS**.

## What’s on the site

- **Hero (`HeroSection.tsx`)** — illustrated portfolio introduction with animated meadow details, 60fps butterfly & pollen canvas, and a scroll-into-the-laptop transition.
- **Selected work (`SelectedWorkSection.tsx`)** — four featured projects presented in a scroll-driven horizontal gallery, with project details and repository links.
- **Also on the desk (`SelectedWorkSection.tsx`)** — cards for additional software, public-sector IT, archive, and hardware work.
- **Career path (`PathSection.tsx`)** — a horizontal timeline with milestone cards and an interactive year scrubber.
- **About (`AboutSection.tsx`)** — profile, interactive kudos catcher, trait pills, skills, and a barbell progress widget.
- **Contact (`ContactSection.tsx`)** — an interactive paper-plane slingshot scene with fireflies, email and social links, and a CV/contact modal.

## Project Structure

```text
├── public/
│   └── assets/                  # Local portfolio illustrations, profile photo, and project images
├── src/
│   ├── components/
│   │   ├── Header.tsx           # Floating pill navigation bar & wind chimes trigger
│   │   ├── HeroSection.tsx      # Sticky scroll-into-laptop hero + meadow canvas
│   │   ├── SelectedWorkSection.tsx # Horizontal work gallery & "Also on the desk" grid
│   │   ├── PathSection.tsx      # Horizontal career chronology & year scrubber
│   │   ├── AboutSection.tsx     # Kudos catcher, portrait, traits & barbell widget
│   │   ├── ContactSection.tsx   # Interactive twilight paper-plane slingshot canvas
│   │   ├── CaseModal.tsx        # Project architecture & case study modal
│   │   ├── CvModal.tsx          # Portfolio shortcut & CV modal
│   │   └── Toast.tsx            # Toast notification pill
│   ├── data/
│   │   └── portfolioData.ts     # Typed project, timeline, kudos, and skill datasets
│   ├── hooks/
│   │   ├── useScrollAndParallaxEngine.ts # 120fps GPU scroll & wave inertia engine
│   │   └── useRevealAndMagneticTilt.ts   # Scroll reveal & 3D magnetic card tilt
│   ├── types/
│   │   └── portfolio.ts         # TypeScript interfaces
│   ├── utils/
│   │   └── sound.ts             # Web Audio API pentatonic wind chimes & clipboard helper
│   ├── App.tsx                  # Root portfolio layout & keyboard shortcuts
│   ├── index.css                # Tailwind directives & custom Studio Ghibli animations
│   └── main.tsx                 # React DOM entry point
├── index.html                   # Vite HTML entry
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vercel.json
└── vite.config.ts
```

## Run locally

Install dependencies and start the Vite development server:

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Contact

- Email: [dzakiudin07@gmail.com](mailto:dzakiudin07@gmail.com)
- GitHub: <https://github.com/Dzakiudin>
- LinkedIn: <https://www.linkedin.com/in/ahmad-dzakiudin-30404b344/>
