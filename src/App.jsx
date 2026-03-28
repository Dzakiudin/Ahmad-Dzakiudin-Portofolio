import { useLenis } from './hooks/useLenis';
import Navbar from './components/Navbar';
import BackgroundElements from './components/BackgroundElements';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Education from './sections/Education';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Contact from './sections/Contact';

function App() {
  // Initialize Lenis smooth scroll
  useLenis();

  return (
    <div className="relative w-full overflow-x-hidden max-w-[100vw] flex flex-col min-h-screen">
      <Navbar />
      <main className="relative flex-grow w-full">
        <BackgroundElements />
        <Hero />
        <About />
        <Education />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
