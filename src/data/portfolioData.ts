import { WorkCardItem, AlsoDeskItem, PathMilestone, KudosItem, TraitKey } from '../types/portfolio';

export const GHIBLI_ASSETS = {
  hero: 'assets/c.png',
  hpp: 'https://raw.githubusercontent.com/Dzakiudin/Automatic-HPP-Calculator/4f206407cedd18bcb3b9a870f55739d401ed8c47/docs/hpp-calculator-banner.svg',
  pos: 'https://raw.githubusercontent.com/Dzakiudin/Web-Based-POS-System/main/docs/dashboard.png',
  trade: 'https://raw.githubusercontent.com/Dzakiudin/tradelogpro/b9e6e07ac3494ac075cf876c9b6c5e66efce6974/screenshots/tradelogpro-promo.svg',
  pdf: 'https://raw.githubusercontent.com/Dzakiudin/Perpustakaan-PDF/5a0eae3d64500b201d812445593a4098515ac14b/docs/bookin-promo.svg',
};

export const SELECTED_WORK_CARDS: WorkCardItem[] = [
  {
    yearTag: '2026',
    org: 'Google Gemini Pro AI, 2026',
    title: 'Automatic HPP Calculator',
    desc: 'Turned manual culinary cost spreadsheets into an AI agent that decomposes raw recipes and margins.',
    bigStat: '3 → 1',
    statTop: 'platforms unified (Android, iOS & Web)',
    statBot: '2x faster recipe COGS pricing with Gemini AI',
    image: GHIBLI_ASSETS.hpp,
    realScreenshot: 'https://raw.githubusercontent.com/Dzakiudin/Automatic-HPP-Calculator/main/docs/Gradient%20Mobile%20Application.jpg',
    link: 'https://github.com/Dzakiudin/Automatic-HPP-Calculator',
    archPipeline: 'Next.js 14 App Router → Gemini Pro Structured JSON Prompt → Unit-Derivative COGS Tree → Capacitor APK/iOS & PDF Export',
    fullDesc: 'Automatic HPP Calculator is a cross-platform application integrating Google Gemini Pro AI to automate Cost of Goods Sold (Harga Pokok Penjualan) calculations for culinary and manufacturing SMEs.',
    bullets: [
      'Built with Next.js 14 App Router, TypeScript, Tailwind CSS & Capacitor JS for Android, iOS, and Web',
      'Decomposes bulk raw ingredients into exact unit-cost derivatives via Google Gemini Pro API',
      'Simulates target profit margins and exports instant PDF cost breakdowns for SME owners',
    ],
  },
  {
    yearTag: '2025',
    org: 'Enterprise Retail POS, 2025',
    title: 'Midnight Glass POS',
    desc: 'Engineered a full-screen Point of Sale with double-entry stock mutation ledgers and RBAC audit logs.',
    bigStat: '50k+',
    statTop: 'daily transactions on PostgreSQL + Prisma',
    statBot: '100% immutable audit logs on voids & refunds',
    image: GHIBLI_ASSETS.pos,
    realScreenshot: 'https://raw.githubusercontent.com/Dzakiudin/Web-Based-POS-System/refs/heads/main/docs/dashboard.png',
    link: 'https://github.com/Dzakiudin/Web-Based-POS-System',
    archPipeline: 'React + TypeScript Cashier UI → Express RBAC Middleware → Prisma ORM ACID Transaction → PostgreSQL Stock Mutation Ledger',
    fullDesc: 'Midnight Glass POS is an enterprise retail Point of Sale system engineered with React, TypeScript, Node.js, Express, and PostgreSQL + Prisma ORM.',
    bullets: [
      'Zero-latency keyboard-first cashier interface with multi-tier discount rules',
      'Transactional stock mutation ledger (Stock In, Stock Out, Stock Opname) preventing inventory drift',
      'Real-time Business Intelligence dashboard & Bronze-to-Platinum CRM loyalty tiers',
    ],
  },
  {
    yearTag: '2025',
    org: 'Quantitative FinTech, 2025',
    title: 'TradeLogPro Analytics',
    desc: 'Redesigned how traders track performance with live equity curves and daily P&L calendar heatmaps.',
    bigStat: '+100%',
    statTop: 'real-time Win Rate & Profit Factor telemetry',
    statBot: 'Cloud-synced via Firebase Auth & Firestore',
    image: GHIBLI_ASSETS.trade,
    realScreenshot: 'https://raw.githubusercontent.com/Dzakiudin/tradelogpro/main/screenshots/Gradient%20Mobile%20Application%20tradelogpro.jpg',
    link: 'https://github.com/Dzakiudin/tradelogpro',
    archPipeline: 'Firebase Auth + Firestore Realtime Stream → Expectancy & Drawdown Engine → SVG Equity Curve & XLSX/PDF Audit Exporter',
    fullDesc: 'TradeLogPro is an institutional trading journal and quantitative analytics suite with real-time equity curves, drawdown profiling, and Excel/PDF audit export.',
    bullets: [
      'Computes Net Profit, Win Rate, Profit Factor, and R-Multiple expectancy automatically',
      'Interactive daily P&L calendar heatmap and psychological discipline checklist',
      'One-click institutional audit export to Excel (.xlsx) and PDF reports',
    ],
  },
  {
    yearTag: '2024',
    org: 'Digital Library, 2024',
    title: 'Perpustakaan PDF',
    desc: 'Built a browser-native PDF reader around Mozilla PDF.js so readers resume on the exact page offline.',
    bigStat: '0',
    statTop: 'external plugins required to render PDFs',
    statBot: 'IndexedDB binary blob caching for instant load',
    image: GHIBLI_ASSETS.pdf,
    realScreenshot: 'https://raw.githubusercontent.com/Dzakiudin/Perpustakaan-PDF/refs/heads/main/docs/books.png',
    link: 'https://github.com/Dzakiudin/Perpustakaan-PDF',
    archPipeline: 'React + Vite Catalog Indexer → IndexedDB Binary Blob Store → Mozilla PDF.js WebWorker Canvas Pipeline → Page Resume Sync',
    fullDesc: 'Perpustakaan PDF renders and indexes digital literature directly inside the browser using React, Vite, Mozilla PDF.js, and client-side IndexedDB caching.',
    bullets: [
      'High-DPI Mozilla PDF.js WebWorker canvas rendering pipeline with zero external plugins',
      'Rich catalog metadata indexing and multi-category instant search',
      'Automatic last-read page bookmarking in IndexedDB and reader activity leaderboard',
    ],
  },
];

export const ALSO_DESK_CARDS: AlsoDeskItem[] = [
  {
    org: 'Knowledge Hub · TypeScript',
    title: 'Perpustakaan Informasi',
    desc: 'Built a typo-tolerant client-side fuzzy search and loan circulation tracker with CSV/JSON export.',
    sub: 'Instant catalog lookup across multi-dimensional taxonomy tags.',
    image: 'assets/inf.png',
    link: 'https://github.com/Dzakiudin/Perpusstakaan-Informasi-APP',
  },
  {
    org: 'Sekretariat DPRD Sumenep',
    title: 'Legislative IT Ops',
    desc: 'Maintained LAN infrastructure and hardware reliability for regional legislative sessions in Sumenep.',
    sub: 'Zero network interruptions during plenary operations.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Logo_DPRD_Kabupaten_Sumenep.png?utm_source=id.wikipedia.org&utm_campaign=index&utm_content=original',
    link: '#path',
  },
  {
    org: 'National Land Agency (BPN)',
    title: 'BPN Digital Archive',
    desc: 'Streamlined land-certification digital archiving and structured document verification workflows.',
    sub: 'Faster internal lookup for certification records.',
    image: 'assets/bpn.jpg',
    link: '#path',
  },
  {
    org: 'UNIBA Madura · CS',
    title: 'AI Systems Research',
    desc: 'Exploring deterministic LLM pipelines, relational database indexing, and agentic web interfaces.',
    sub: 'Computer Science undergraduate focus (2025–Present).',
    image: 'https://miro.medium.com/v2/1*7a_6WGFDHklAxj6A2L5dsA.png',
    link: '#path',
  },
  {
    org: 'Independent · 2019–Now',
    title: 'Hardware Diagnostics',
    desc: '7+ years diagnosing motherboards, optimizing Windows/Linux kernels, and repairing devices.',
    sub: 'The hardware foundation behind my systems thinking.',
    image: GHIBLI_ASSETS.hero,
    link: '#about',
  },
];

export const PATH_MILESTONES: PathMilestone[] = [
  {
    year: '2025',
    badge: '2025 to now',
    title: 'Computer Science & AI Systems',
    org: 'Universitas Bahaudin Mudhary (UNIBA) Madura',
    desc: 'Pursuing higher education in Computer Science with a focus on intelligent systems engineering, full-stack web architecture, and Google Gemini AI automation.',
    pills: ['UNIBA Madura', 'Computer Science', 'Built in code'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/b2/UNIBA_Madura.png?utm_source=id.wikipedia.org&utm_campaign=index&utm_content=original',
  },
  {
    year: '2024',
    badge: 'Jul to Sep 2024',
    title: 'Technical Support, Legislative IT',
    org: 'Sekretariat DPRD Sumenep',
    desc: 'Managed IT network infrastructure and provided hardware troubleshooting solutions for legislative operations at the Regional House of Representatives Secretariat.',
    pills: ['Network Admin', 'Hardware Maintenance', 'IT Support'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Logo_DPRD_Kabupaten_Sumenep.png?utm_source=id.wikipedia.org&utm_campaign=index&utm_content=original',
  },
  {
    year: '2023',
    badge: 'Dec 2023 to Mar 2024',
    title: 'Technical Support, Land Archive',
    org: 'National Land Agency (BPN)',
    desc: 'Assisted in data management and technical support for land certification workflows, improving internal efficiency for digital document archiving.',
    pills: ['Data Management', 'Digital Archive', 'BPN Support'],
    image: 'assets/bpn.jpg',
  },
  {
    year: '2022',
    badge: '2022 to 2025',
    title: 'Software & Network Engineering',
    org: 'SMKN 1 Sumenep',
    desc: 'Completed vocational high school specialization in software engineering, full-stack web development, and computer network administration.',
    pills: ['SMKN 1 Sumenep', 'Software Engineering', 'Networking'],
    image: 'https://smk1sumenep.sch.id/wp-content/uploads/2025/01/cropped-logosmk1200.png',
  },
  {
    year: '2019',
    badge: '2019 to now',
    title: 'Freelance Computer Technician',
    org: 'Independent · SMPN 1 Kalianget & SDN Paberasan 1',
    desc: 'Started hands-on hardware troubleshooting, OS optimization (Windows/Linux), and technical repair while completing foundational schooling in Sumenep.',
    pills: ['Hardware Repair', 'Windows & Linux', '20+ GitHub Repos'],
    image: GHIBLI_ASSETS.hero,
  },
];

export const KUDOS_DATA: KudosItem[] = [
  {
    q: '“Ahmad automated our entire culinary Cost of Goods Sold (HPP) calculation with Gemini AI—turning hours of spreadsheet work into 30 seconds.”',
    a: '— Culinary SME Partner · Automatic HPP Calculator',
  },
  {
    q: '“Midnight Glass POS runs our checkout with zero lag, and the PostgreSQL stock mutation ledger keeps every single item accounted for.”',
    a: '— Retail Store Lead · Midnight Glass POS',
  },
  {
    q: '“During his internship at Sekretariat DPRD Sumenep, Ahmad kept legislative network and hardware systems running reliably.”',
    a: '— IT Supervisor · Sekretariat DPRD Sumenep',
  },
  {
    q: '“At BPN, he structured and digitized land-certification archives with impressive speed and accuracy.”',
    a: '— Archive Coordinator · National Land Agency (BPN)',
  },
  {
    q: '“All five caught! Thank you for reading what collaborators said — click again to cycle through.”',
    a: '— Verified Field Notes · Sumenep, East Java',
  },
];

export const LIFT_NAMES = ['Listen', 'Sketch', 'Prototype', 'Test', 'Lift'] as const;
export const LIFT_WEIGHTS = ['60 kg', '100 kg', '130 kg', '150 kg', '165 kg'] as const;

export const TRAIT_MESSAGES: Record<TraitKey, string> = {
  detail: '🔍 Keen eye for detail — Every pixel, database index & RBAC audit log is verified.',
  systems: '🏛️ Systems builder — Studying Computer Science at UNIBA Madura after SMKN 1 Sumenep.',
  code: '⚡ Prototypes in code — Working TypeScript + Gemini AI apps beat static mockups.',
  hardware: '🪛 Hardware troubleshooter — 7+ years diagnosing motherboards & networks since 2019.',
};

export const CAPABILITY_PILLS = [
  'TypeScript & JavaScript',
  'React & Next.js 14',
  'Google Gemini Pro AI',
  'PostgreSQL & Prisma',
  'Node.js & Express',
  'Python & FastAPI',
  'Capacitor Mobile',
  'Coded prototypes',
];
