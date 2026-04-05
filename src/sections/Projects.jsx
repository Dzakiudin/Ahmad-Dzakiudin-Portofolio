import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTilt } from '../hooks/useAnimations';
import ProjectDetailModal from '../components/ProjectDetailModal';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: 'Automatic HPP Calculator',
    icon: 'calculate',
    subtitle: 'AI-Powered Cost Calculator • Cross-Platform Mobile App',
    description:
      'Intelligent Cost of Goods Sold (HPP) calculator engineered with Google Gemini Pro AI. Automates complex ingredient derivative calculations directly mapped to financial metrics, packaged as a cross-platform mobile app.',
    fullDescription:
      'Automatic HPP Calculator adalah aplikasi mobile cross-platform yang memanfaatkan kekuatan Google Gemini Pro AI untuk mengotomatiskan perhitungan Harga Pokok Penjualan (HPP). Aplikasi ini dirancang khusus untuk pelaku UMKM dan bisnis kuliner yang membutuhkan kalkulasi cepat dan akurat terhadap biaya bahan baku, biaya produksi, dan margin keuntungan. Dengan integrasi AI, pengguna cukup memasukkan bahan-bahan yang digunakan dan sistem akan secara otomatis menghitung turunan bahan, biaya per porsi, hingga rekomendasi harga jual optimal.',
    tags: ['Next.js', 'Gemini AI', 'Capacitor'],
    techStack: [
      { name: 'Next.js', role: 'Framework', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
      { name: 'Google Gemini Pro', role: 'AI Engine', icon: 'https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690b6.svg' },
      { name: 'Capacitor', role: 'Mobile Runtime', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/capacitor/capacitor-original.svg' },
      { name: 'TypeScript', role: 'Language', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'Tailwind CSS', role: 'Styling', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
    ],
    architecture: [
      { layer: 'Frontend', detail: 'Next.js 14 dengan App Router, React Server Components untuk performa optimal', icon: 'web' },
      { layer: 'AI Layer', detail: 'Google Gemini Pro API untuk analisis bahan baku dan kalkulasi otomatis turunan ingredient', icon: 'smart_toy' },
      { layer: 'Mobile Layer', detail: 'Capacitor JS untuk packaging sebagai native app (Android & iOS) dengan akses ke native APIs', icon: 'phone_android' },
      { layer: 'Data Layer', detail: 'Local storage & IndexedDB untuk menyimpan riwayat kalkulasi secara offline-first', icon: 'storage' },
    ],
    features: [
      'Kalkulasi HPP otomatis berbasis AI — cukup input bahan, sistem hitung semuanya',
      'Analisis turunan ingredient secara real-time',
      'Cross-platform: berjalan di Android, iOS, dan Web browser',
      'Offline-first architecture — tetap berfungsi tanpa internet',
      'Rekomendasi harga jual berdasarkan margin yang diinginkan',
      'Export laporan HPP ke PDF',
    ],
    skills: [
      'AI Integration', 'Prompt Engineering', 'Cross-Platform Development',
      'Mobile App Development', 'React', 'Server-Side Rendering',
      'UI/UX Design', 'Financial Calculations',
    ],
    image:
      'https://raw.githubusercontent.com/Dzakiudin/Automatic-HPP-Calculator/main/docs/Gradient%20Mobile%20Application.jpg',
    screenshots: [
      'https://raw.githubusercontent.com/Dzakiudin/Automatic-HPP-Calculator/main/docs/Gradient%20Mobile%20Application.jpg',
      'https://raw.githubusercontent.com/Dzakiudin/Automatic-HPP-Calculator/main/docs/Screenshot%202026-03-17%20175222.png',
      'https://raw.githubusercontent.com/Dzakiudin/Automatic-HPP-Calculator/main/docs/Screenshot%202026-03-17%20175243.png',
      'https://raw.githubusercontent.com/Dzakiudin/Automatic-HPP-Calculator/main/docs/Screenshot%202026-03-17%20175252.png',
      'https://raw.githubusercontent.com/Dzakiudin/Automatic-HPP-Calculator/main/docs/Screenshot%202026-03-17%20175313.png',
    ],
    imageAlt:
      'Advanced financial and accounting dashboard with glowing analytics and futuristic layout',
    link: 'https://github.com/Dzakiudin/Automatic-HPP-Calculator',
  },
  {
    title: 'Perpustakaan PDF',
    icon: 'library_books',
    subtitle: 'Digital Library Platform • PDF Management System',
    description:
      'A sophisticated digital library platform for managing PDF documents. Features high-performance indexing, metadata management, and a seamless reading experience with a modern, responsive UI.',
    fullDescription:
      'Perpustakaan PDF adalah platform perpustakaan digital modern yang dirancang untuk mengelola dan membaca dokumen PDF secara efisien. Aplikasi ini menggunakan PDF.js untuk rendering PDF berkualitas tinggi langsung di browser, dilengkapi dengan sistem indexing yang cepat, manajemen metadata buku, fitur pencarian lanjut, dan pengalaman membaca yang mulus. Interface-nya didesain responsif dengan tema gelap yang nyaman untuk membaca dalam waktu lama.',
    tags: ['React', 'PDF.js', 'Vite'],
    techStack: [
      { name: 'React', role: 'UI Library', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'PDF.js', role: 'PDF Renderer', icon: 'https://cdn.jsdelivr.net/gh/nicedoc/brand-icons/icons/mozilla-pdf.js.svg' },
      { name: 'Vite', role: 'Build Tool', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
      { name: 'JavaScript', role: 'Language', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'CSS3', role: 'Styling', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    ],
    architecture: [
      { layer: 'Frontend', detail: 'React SPA dengan Vite untuk hot module replacement ultra-cepat dan optimized build', icon: 'web' },
      { layer: 'PDF Engine', detail: 'Mozilla PDF.js untuk rendering PDF dengan fidelitas tinggi, support zoom & navigasi', icon: 'picture_as_pdf' },
      { layer: 'State Management', detail: 'React Context + useReducer untuk mengelola library state, reading progress, dan bookmarks', icon: 'tune' },
      { layer: 'Storage', detail: 'Browser IndexedDB untuk caching dokumen PDF dan menyimpan data library secara lokal', icon: 'storage' },
    ],
    features: [
      'Rendering PDF berkualitas tinggi langsung di browser',
      'Manajemen metadata buku: judul, penulis, kategori, cover',
      'Pencarian lanjut dengan filter berdasarkan kategori dan tag',
      'Reading progress tracking — lanjutkan dari halaman terakhir',
      'Responsif dan mobile-friendly design',
      'Dark theme untuk kenyamanan membaca',
    ],
    skills: [
      'React Development', 'PDF Processing', 'State Management',
      'Frontend Architecture', 'UI/UX Design', 'Performance Optimization',
      'Responsive Design', 'File Handling',
    ],
    image:
      'https://raw.githubusercontent.com/Dzakiudin/Perpustakaan-PDF/refs/heads/main/docs/books.png',
    screenshots: [
      'https://raw.githubusercontent.com/Dzakiudin/Perpustakaan-PDF/refs/heads/main/docs/books.png',
      'https://raw.githubusercontent.com/Dzakiudin/Perpustakaan-PDF/main/docs/pdf%20viewer.png',
      'https://raw.githubusercontent.com/Dzakiudin/Perpustakaan-PDF/main/docs/leaderboard.png',
    ],
    imageAlt:
      'Digital library interface showing organized document covers and metadata in a sleek dark theme',
    link: 'https://github.com/Dzakiudin/Perpustakaan-PDF',
  },
  {
    title: 'Perpustakaan Informasi APP',
    icon: 'info',
    subtitle: 'Knowledge Base & Information Hub • Data Aggregator',
    description:
      'A comprehensive knowledge base and information aggregator application. Built with advanced data retrieval and organization capabilities to serve as a centralized hub for critical information.',
    fullDescription:
      'Perpustakaan Informasi APP adalah aplikasi knowledge base dan information aggregator yang dirancang untuk menjadi pusat informasi terpadu. Aplikasi ini memungkinkan pengguna untuk mengelola, mengkategorikan, dan mengakses berbagai jenis informasi dengan cepat melalui dashboard yang intuitif. Sistem pencarian lanjut dan filter multi-dimensi memastikan bahwa informasi yang dibutuhkan dapat ditemukan dalam hitungan detik. Dengan arsitektur modern berbasis React dan Tailwind CSS, aplikasi ini menawarkan pengalaman pengguna yang premium dan responsif.',
    tags: ['React', 'Information Management', 'Tailwind'],
    techStack: [
      { name: 'React', role: 'UI Library', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Tailwind CSS', role: 'Styling', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'JavaScript', role: 'Language', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'Vite', role: 'Build Tool', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
      { name: 'REST API', role: 'Data Layer' },
    ],
    architecture: [
      { layer: 'Frontend', detail: 'React SPA dengan component-based architecture, Tailwind CSS untuk utility-first styling', icon: 'web' },
      { layer: 'Data Management', detail: 'Custom hooks untuk fetching, caching, dan sinkronisasi data dari multiple sources', icon: 'sync' },
      { layer: 'Search Engine', detail: 'Client-side search dengan fuzzy matching dan multi-dimension filtering', icon: 'search' },
      { layer: 'Storage', detail: 'LocalStorage + SessionStorage untuk persistence data dan user preferences', icon: 'storage' },
    ],
    features: [
      'Dashboard interaktif dengan visualisasi data real-time',
      'Pencarian fuzzy search — temukan info meski dengan typo',
      'Kategorisasi multi-level dengan tag dan label custom',
      'Data aggregation dari berbagai sumber informasi',
      'Export data ke berbagai format (CSV, JSON)',
      'Responsive design — optimal di desktop dan mobile',
    ],
    skills: [
      'React Development', 'Information Architecture', 'Data Management',
      'Search Implementation', 'Tailwind CSS', 'State Management',
      'API Integration', 'UI/UX Design',
    ],
    image:
      'https://raw.githubusercontent.com/Dzakiudin/Perpusstakaan-Informasi-APP/refs/heads/main/docs/dashboard.png',
    screenshots: [
      'https://raw.githubusercontent.com/Dzakiudin/Perpusstakaan-Informasi-APP/refs/heads/main/docs/dashboard.png',
      'https://raw.githubusercontent.com/Dzakiudin/Perpusstakaan-Informasi-APP/main/docs/books.png',
      'https://raw.githubusercontent.com/Dzakiudin/Perpusstakaan-Informasi-APP/main/docs/loans.png',
    ],
    imageAlt:
      'Futuristic information hub interface showing data nodes and knowledge mapping',
    link: 'https://github.com/Dzakiudin/Perpusstakaan-Informasi-APP',
  },
  {
    title: 'Midnight Glass POS',
    icon: 'point_of_sale',
    subtitle: 'Premium Point of Sale & Commercial Analytics System',
    description:
      'A high-performance POS system with dark corporate aesthetics, designed for modern retail environments. Features full-screen checkout, multi-discount engine, inventory ledger, and business intelligence dashboard.',
    fullDescription:
      'Midnight Glass POS adalah sistem Point of Sale premium berkinerja tinggi yang dirancang untuk lingkungan ritel modern. Dibangun dengan estetika gelap korporasi yang profesional, sistem ini menyediakan jembatan mulus antara manajemen bisnis yang kuat dan pengalaman pengguna yang mewah. Fitur utama mencakup mesin kasir layar penuh (full-screen checkout), keranjang cerdas dengan multi-diskon, manajemen inventaris berbasis ledger mutasi stok, sistem shift kasir dengan rekonsiliasi otomatis, dashboard Business Intelligence dengan KPI real-time, serta CRM & Program Loyalitas Voucher dengan tiering otomatis. Dilengkapi sistem keamanan berlapis dengan tiga level role (Kasir, Admin, Owner) dan Audit Logs yang kebal modifikasi.',
    tags: ['TypeScript', 'React', 'PostgreSQL'],
    techStack: [
      { name: 'TypeScript', role: 'Language', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'React', role: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Node.js', role: 'Backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'PostgreSQL', role: 'Database', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
      { name: 'Prisma', role: 'ORM', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg' },
      { name: 'Express', role: 'API Framework', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
    ],
    architecture: [
      { layer: 'Frontend', detail: 'React SPA dengan antarmuka full-screen kasir, dark corporate theme (#111813), dan komponen modal overlay', icon: 'web' },
      { layer: 'Backend API', detail: 'Node.js + Express dengan REST API, JWT authentication, dan role-based access control (Kasir/Admin/Owner)', icon: 'dns' },
      { layer: 'Database', detail: 'PostgreSQL dengan Prisma ORM, migrasi otomatis, dan seeder untuk data awal termasuk akun default', icon: 'storage' },
      { layer: 'Security', detail: 'Audit Logs incorruptible — setiap perubahan harga, role, atau data sensitif tercatat dengan User + IP Address dan kebal penghapusan', icon: 'security' },
    ],
    features: [
      'Full-screen POS checkout dengan pencarian produk real-time dan visual stok',
      'Keranjang cerdas dengan multi-diskon (per produk & kupon keranjang) + Hold/Void/Refund',
      'Inventaris berbasis ledger: Stok Masuk, Keluar, dan Opname Manual dengan low stock alerts',
      'Sistem shift kasir: Opening Balance → Closing Balance → Rekonsiliasi otomatis diskrepansi',
      'Dashboard BI: KPI real-time, Area Chart tren pendapatan, dan laporan export Excel/PDF',
      'CRM & Loyalty: Tiering otomatis (Bronze → Platinum) dan voucher dinamis dengan maxUses',
    ],
    skills: [
      'Full-Stack Development', 'TypeScript', 'Database Design',
      'REST API', 'Authentication & Authorization', 'Role-Based Access Control',
      'Business Intelligence', 'Financial Systems', 'UI/UX Design',
    ],
    image:
      'https://raw.githubusercontent.com/Dzakiudin/Web-Based-POS-System/refs/heads/main/docs/dashboard.png',
    screenshots: [
      'https://raw.githubusercontent.com/Dzakiudin/Web-Based-POS-System/refs/heads/main/docs/dashboard.png',
      'https://raw.githubusercontent.com/Dzakiudin/Web-Based-POS-System/refs/heads/main/docs/order%20%26%20payment.png',
      'https://raw.githubusercontent.com/Dzakiudin/Web-Based-POS-System/refs/heads/main/docs/detail%20transaksi.png',
      'https://raw.githubusercontent.com/Dzakiudin/Web-Based-POS-System/refs/heads/main/docs/pelanggan.png',
    ],
    imageAlt:
      'Dark-themed POS dashboard with analytics charts and modern corporate aesthetic',
    link: 'https://github.com/Dzakiudin/Web-Based-POS-System',
  },
  {
    title: 'TradeLogPro',
    icon: 'candlestick_chart',
    subtitle: 'Institutional-Grade Trading Journal • Real-Time Analytics',
    description:
      'A high-performance trading journal with real-time analytics, cloud sync via Firebase, and a premium "Institutional Ghost" dark UI. Track performance, analyze setups, and export reports.',
    fullDescription:
      'TradeLogPro adalah aplikasi trading journal berperforma tinggi yang dirancang untuk trader profesional. Dibangun dengan design system "Institutional Ghost" — tema gelap minimalis dengan kontras tinggi, pemisahan surface tonal, aksen neon, dan tipografi presisi — aplikasi ini memberikan pengalaman imersif layaknya terminal trading profesional. Fitur utama mencakup dashboard analytics real-time (Net Profit, Win Rate, Profit Factor), heatmap kalender P&L, jurnal trading komprehensif dengan discipline checklist dan mood/psychology tracker, serta integrasi Firebase untuk autentikasi dan cloud sync. Tersedia di tradelogpro-mu.vercel.app.',
    tags: ['TypeScript', 'React', 'Firebase'],
    techStack: [
      { name: 'TypeScript', role: 'Language', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'React', role: 'UI Library', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Firebase', role: 'Auth & Database', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg' },
      { name: 'Tailwind CSS', role: 'Styling', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'Chart.js', role: 'Charting', icon: 'https://www.chartjs.org/img/chartjs-logo.svg' },
      { name: 'Vite', role: 'Build Tool', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
    ],
    architecture: [
      { layer: 'Frontend', detail: 'React + TypeScript SPA dengan Vite, Tailwind CSS, dan custom "Institutional Ghost" design system (neon accents, tonal surfaces)', icon: 'web' },
      { layer: 'Analytics Engine', detail: 'Chart.js (react-chartjs-2) untuk sparklines, equity curve, win rate doughnut, dan hourly performance heatmap', icon: 'insights' },
      { layer: 'Backend', detail: 'Firebase Authentication (email/password) + Firestore untuk cloud sync data trading secara real-time', icon: 'cloud' },
      { layer: 'Data Layer', detail: 'TypeScript interfaces untuk Trade & UserSettings, helper utils untuk currency formatting dan export (Excel/PDF)', icon: 'data_object' },
    ],
    features: [
      'Dashboard real-time: Net Profit, Win Rate, Profit Factor, Sparkline Trends, dan Capital Growth Chart',
      'Heatmap Calendar — color-coded daily P&L dengan monthly stats, streak counter, dan mini bar chart',
      'Jurnal trading lengkap: Asset, Setup, Side, Entry/Exit Price, Lot Size, R:R, P&L',
      'Discipline Checklist wajib sebelum submit trade + Mood/Psychology Tracker per trade',
      'Export one-click ke Excel (.xlsx) dan PDF dengan auto-formatted tables',
      'Firebase Auth + multi-currency support (IDR, USD, EUR, JPY) + monthly target tracking',
    ],
    skills: [
      'TypeScript', 'React Development', 'Firebase Integration',
      'Data Visualization', 'Chart.js', 'Tailwind CSS',
      'Cloud Sync', 'Financial Analytics', 'Design Systems',
    ],
    image:
      'https://raw.githubusercontent.com/Dzakiudin/tradelogpro/main/screenshots/Gradient%20Mobile%20Application%20tradelogpro.jpg',
    screenshots: [
      'https://raw.githubusercontent.com/Dzakiudin/tradelogpro/main/screenshots/Gradient%20Mobile%20Application%20tradelogpro.jpg',
      'https://raw.githubusercontent.com/Dzakiudin/tradelogpro/refs/heads/main/screenshots/dashboard.png',
      'https://raw.githubusercontent.com/Dzakiudin/tradelogpro/refs/heads/main/screenshots/trades.png',
      'https://raw.githubusercontent.com/Dzakiudin/tradelogpro/refs/heads/main/screenshots/calendar.png',
      'https://raw.githubusercontent.com/Dzakiudin/tradelogpro/refs/heads/main/screenshots/analysis.png',
      'https://raw.githubusercontent.com/Dzakiudin/tradelogpro/refs/heads/main/screenshots/input.png',
    ],
    imageAlt:
      'Dark trading terminal dashboard with neon accent analytics and equity curve chart',
    link: 'https://github.com/Dzakiudin/tradelogpro',
  },
];

function ProjectCard({ project, onSelect }) {
  const tiltRef = useTilt(5);

  return (
    <div
      ref={tiltRef}
      onClick={() => onSelect(project)}
      className="project-card tilt-card bg-surface-container-lowest rounded-3xl overflow-hidden border border-outline-variant/10 block hover:border-primary/30 transition-colors cursor-pointer group"
    >
      <div className="h-48 overflow-hidden relative">
        <img
          className="project-card-image w-full h-full object-cover"
          alt={project.imageAlt}
          src={project.image}
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all duration-500 flex items-center justify-center">
          <span
            className="material-symbols-outlined text-white text-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
          >
            visibility
          </span>
        </div>
      </div>
      <div className="p-8 space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="text-2xl font-headline font-bold text-on-surface">
            {project.title}
          </h3>
          <span className="material-symbols-outlined text-primary icon-float">
            {project.icon}
          </span>
        </div>
        <p className="text-on-surface-variant text-sm line-clamp-3">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-label font-bold uppercase tracking-wider text-secondary px-2 py-1 bg-secondary-container/20 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        {/* View Detail hint */}
        <div className="flex items-center gap-1.5 pt-1 text-primary opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
          <span className="text-xs font-medium font-label">View Details</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const buttonRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header — cinematic
      gsap.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Cards — slow stagger with scale for camera-like depth
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 70, scale: 0.92 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.6,
            stagger: 0.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Button reveal
      if (buttonRef.current) {
        gsap.fromTo(
          buttonRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.4,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: buttonRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={sectionRef} id="projects" className="py-24 px-6 max-w-7xl mx-auto">
        <div ref={headerRef} className="text-center space-y-4 mb-16">
          <h2 className="font-headline text-5xl font-bold tracking-tighter">
            Engineering <span className="text-primary">Impact</span>
          </h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto">
            A selection of 20+ real-world applications and AI-driven platforms built for
            performance and scale.
          </p>
        </div>
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              onSelect={setSelectedProject}
            />
          ))}
        </div>

        {/* GitHub Button */}
        <div ref={buttonRef} className="flex justify-center mt-10">
          <a
            href="https://github.com/Dzakiudin"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary-glass flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-surface-container-lowest border border-outline-variant/15 text-primary hover:text-cyan-400 font-medium text-sm group"
          >
            <span>Explore More on GitHub</span>
            <svg className="w-5 h-5 fill-current transition-transform duration-500 group-hover:scale-110" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}
