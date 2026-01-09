import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Activity, Globe, ArrowRight, Menu } from 'lucide-react';

// --- ASSET PIPELINE ---
// INSTRUCTION: Drag your 'karda-platinum-logo.png' into src/assets/
// Then uncomment the import below and remove the 'const kardaLogo = null' line.

import kardaLogo from './assets/karda-platinum-logo.png';
// const kardaLogo = null;

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-karda-void/70 border-b border-white/5 h-20 flex items-center justify-between px-8 md:px-16">
    <div className="flex items-center gap-2">
      {/* Small Nav Logo */}
      <div className="w-8 h-8 bg-karda-silver rounded-sm flex items-center justify-center text-karda-void font-bold text-xs">
        K
      </div>
      <span className="text-karda-silver tracking-[0.2em] text-sm font-semibold">KARDA</span>
    </div>

    <div className="hidden md:flex items-center gap-8">
      {['VENTURES', 'INFRASTRUCTURE', 'PROPRIETARY', 'CONTACT'].map((item) => (
        <a key={item} href="#" className="text-xs text-white/60 hover:text-karda-silver transition-colors tracking-widest">
          {item}
        </a>
      ))}
    </div>

    <button className="md:hidden text-white/80">
      <Menu size={24} />
    </button>
  </nav>
);

const Hero = () => {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-20">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-karda-void pointer-events-none" />

      {/* Glow Stage */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-glow-radial opacity-40 animate-glow-pulse pointer-events-none" />

      {/* Main Content */}
      <div className="z-10 flex flex-col items-center gap-8 md:gap-12 max-w-4xl px-6">

        {/* Logo / Asset Slot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative w-[300px] h-[300px] flex items-center justify-center"
        >
          {kardaLogo ? (
            <img
              src={kardaLogo}
              alt="Karda Logo"
              className="w-full h-full object-contain drop-shadow-2xl mix-blend-screen"
            />
          ) : (
            <div className="w-48 h-48 border border-white/20 rounded-full flex items-center justify-center bg-white/5 backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <span className="text-7xl font-thin text-karda-silver tracking-tighter opacity-80 select-none">
                K
              </span>
              <div className="absolute bottom-4 text-[10px] tracking-[0.3em] text-white/40 uppercase">
                Asset Missing
              </div>
            </div>
          )}
        </motion.div>

        {/* Text Stack */}
        <div className="text-center space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white tracking-tight"
          >
            PREMIER INFRASTRUCTURE ASSETS.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-white/50 text-sm md:text-base tracking-[0.2em] max-w-lg mx-auto"
          >
            THE NEW STANDARD IN CAPITAL ALLOCATION
          </motion.p>
        </div>

        {/* Action */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="group flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-500 rounded-sm mt-4"
        >
          <span className="text-xs font-medium tracking-widest text-karda-silver">INITIATE PROTOCOL</span>
          <ArrowRight size={14} className="text-white/60 group-hover:translate-x-1 transition-transform" />
        </motion.button>

      </div>
    </section>
  );
};

const TrustSignals = () => {
  const items = [
    { icon: ShieldCheck, title: "SECURE CUSTODY", desc: "Institutional grade protection for digital and physical assets." },
    { icon: Activity, title: "HIGH VELOCITY", desc: "Real-time liquidity streams across global markets." },
    { icon: Globe, title: "GLOBAL FOOTPRINT", desc: "Infrastructure spanning 40+ jurisdictions." },
  ];

  return (
    <section className="bg-karda-mud/50 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 border-b border-white/10">
        {items.map((item, idx) => (
          <div key={idx} className="p-12 flex flex-col items-center text-center hover:bg-white/5 transition-colors duration-500 cursor-default group">
            <item.icon size={32} className="text-white/40 mb-6 group-hover:text-karda-silver transition-colors" />
            <h3 className="text-sm font-bold text-white tracking-widest mb-3">{item.title}</h3>
            <p className="text-white/40 text-xs leading-relaxed max-w-xs">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

function App() {
  return (
    <div className="bg-karda-void min-h-screen text-karda-silver font-sans selection:bg-white/20">
      <Navbar />
      <Hero />
      <TrustSignals />

      {/* Footer minimal */}
      <footer className="py-8 text-center border-t border-white/5 bg-karda-mud">
        <p className="text-[10px] text-white/20 tracking-widest uppercase">
          © 2026 KARDA HOLDINGS. ALL RIGHTS RESERVED.
        </p>
      </footer>
    </div>
  );
}

export default App;
