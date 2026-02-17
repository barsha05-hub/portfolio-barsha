import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Star, Heart, Zap, Sparkles, Code, Rocket, Globe, Cpu } from 'lucide-react';
import Hero from './components/Hero';
import Resume from './components/Resume';
import Projects from './components/Projects';
import Navigation from './components/Navigation';
import Chatbot from './components/Chatbot';

// Floating Sticker Component
const FloatingStickers = () => {
  const stickers = [
    { Icon: Star, color: "text-yellow-400", x: "10%", y: "20%", delay: 0, scale: 1.2 },
    { Icon: Heart, color: "text-rose-500", x: "85%", y: "15%", delay: 1, scale: 1 },
    { Icon: Zap, color: "text-blue-400", x: "15%", y: "85%", delay: 2, scale: 1.1 },
    { Icon: Sparkles, color: "text-violet-400", x: "80%", y: "70%", delay: 1.5, scale: 1.3 },
    { Icon: Code, color: "text-emerald-400", x: "90%", y: "40%", delay: 0.5, scale: 1 },
    { Icon: Rocket, color: "text-orange-500", x: "5%", y: "60%", delay: 3, scale: 1.2 },
    { Icon: Globe, color: "text-cyan-400", x: "70%", y: "10%", delay: 2.5, scale: 1.1 },
    { Icon: Cpu, color: "text-pink-500", x: "25%", y: "30%", delay: 4, scale: 1 }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {stickers.map((sticker, index) => (
        <motion.div
          key={index}
          className={`absolute ${sticker.color} drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] opacity-80`}
          style={{ left: sticker.x, top: sticker.y }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            scale: [sticker.scale, sticker.scale * 1.1, sticker.scale],
          }}
          transition={{
            duration: 4 + index, // Varied duration for natural feel
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: sticker.delay,
          }}
        >
          <sticker.Icon size={35} strokeWidth={2} />
        </motion.div>
      ))}
    </div>
  );
};

// Rotating Tech Orbits Background
const TechOrbits = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center opacity-20">
      {/* Large Orbit */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute w-[800px] h-[800px] border border-dashed border-white/10 rounded-full"
      />
      {/* Medium Orbit */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute w-[600px] h-[600px] border border-white/5 rounded-full"
      />
      {/* Small Orbit */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute w-[400px] h-[400px] border border-dotted border-blue-500/10 rounded-full"
      />
    </div>
  );
};

// Cursor Glow Component
const CursorGlow = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  // ... existing CursorGlow code ...

  const springConfig = { damping: 25, stiffness: 700 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX - 150);
      mouseY.set(e.clientY - 150);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none z-50 mix-blend-screen"
      style={{ x: springX, y: springY }}
    />
  );
};

// Background Animating Gradient
const CinematicBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-900/10 rounded-full blur-[120px] animate-pulse" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
  </div>
);

// Reveal Animation Component
const Reveal = ({ children, width = "fit-content" }) => {
  return (
    <div style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {children}
      </motion.div>
    </div>
  );
};

function App() {
  return (
    <div className="bg-[#0A0A0A] text-gray-200 min-h-screen selection:bg-blue-500/30 overflow-x-hidden">
      <CinematicBackground />
      <TechOrbits />
      <CursorGlow />
      <FloatingStickers />
      <Chatbot />

      <Navigation />

      <main className="relative z-10 flex flex-col gap-20 pb-20">

        {/* Sections */}
        <section id="hero" className="min-h-screen flex flex-col justify-center px-6 lg:px-20 pt-20">
          <Hero />
        </section>

        <section id="about" className="min-h-[60vh] px-6 lg:px-20 max-w-6xl mx-auto w-full scroll-mt-32">
          <Reveal width="100%">
            <Resume section="about" />
          </Reveal>
        </section>

        <section id="experience" className="min-h-[60vh] px-6 lg:px-20 max-w-6xl mx-auto w-full scroll-mt-32">
          <Reveal width="100%">
            <Resume section="experience" />
          </Reveal>
        </section>

        <section id="skills" className="min-h-[50vh] px-6 lg:px-20 max-w-6xl mx-auto w-full scroll-mt-32">
          <Reveal width="100%">
            <Resume section="skills" />
          </Reveal>
        </section>

        <section id="projects" className="min-h-[80vh] px-6 lg:px-20 max-w-6xl mx-auto w-full scroll-mt-32">
          <Reveal width="100%">
            <div className="mb-10">
              <h3 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Featured Projects</h3>
              <p className="text-gray-400 font-light max-w-2xl">
                A collection of work that demonstrates my ability to solve complex problems with clean, efficient code and intuitive design.
              </p>
            </div>
            <Projects />
          </Reveal>
        </section>

        <section id="contact" className="min-h-[60vh] px-6 lg:px-20 max-w-6xl mx-auto w-full flex flex-col justify-center scroll-mt-32">
          <Reveal width="100%">
            <Resume section="contact" />
          </Reveal>
        </section>

      </main>

      <footer className="py-8 text-center text-gray-600 text-sm relative z-10 glass-panel mt-20 mx-6 lg:mx-20 mb-6 rounded-2xl">
        <p>© {new Date().getFullYear()} Barsha Pradhan. Crafted with React & Tailwind</p>
      </footer>
    </div>
  );
}

export default App;
