import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
// IMPORT YOUR INVENTORY COMPONENT
import Inventory from './components/Inventory';
import Contact from './components/Contact';
import About from './components/About';
import Inquiry from './components/Inquiry';

const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="fixed top-0 w-full z-50 mix-blend-difference px-6 py-5 flex justify-between items-center">
            {location.pathname === '/portfolio' ? (
                <Link to="/" className="text-2xl font-black tracking-tighter italic text-white hover:opacity-80 transition-opacity">
                    KARDA
                </Link>
            ) : <div />}

            <div className="hidden md:flex items-center gap-12">
                {[
                    { label: 'VENTURES', path: '/' },
                    { label: 'PORTFOLIO', path: '/portfolio' },
                    { label: 'ABOUT', path: '/about' },
                    { label: 'CONTACT', path: '/contact' }
                ].map((item) => (
                    <Link
                        key={item.label}
                        to={item.path}
                        className={`text-[10px] font-nasa tracking-[0.3em] transition-opacity duration-300 ${location.pathname === item.path ? 'text-white opacity-100' : 'text-white/60 hover:text-white hover:opacity-100'}`}
                    >
                        {item.label}
                    </Link>
                ))}
            </div>

            <button className="md:hidden text-white">
                <Menu size={24} />
            </button>
        </nav>
    );
};

const Hero = () => {
    const [cursor, setCursor] = useState({ x: 0, y: 0, spark: 0 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setCursor({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            spark: Date.now() % 100 // Rapid changing value for jitter
        });
    };

    return (
        <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black">

            {/* Main Content */}
            <div className="z-10 flex flex-col items-center w-full max-w-[90vw]">

                {/* THE WORD MARK - ELECTRIC CIRCUIT EFFECT */}
                <h1
                    onMouseMove={handleMouseMove}
                    className="text-[12vw] leading-none font-black tracking-tighter text-transparent bg-clip-text select-none mb-12 cursor-crosshair active:scale-95 transition-transform duration-100"
                    style={{
                        backgroundImage: `
                            radial-gradient(circle 120px at ${cursor.x}px ${cursor.y}px, rgba(255,255,255,1) 0%, rgba(56,189,248,0.8) 30%, transparent 60%),
                            repeating-linear-gradient(90deg, transparent 0%, transparent 48%, rgba(255,255,255,0.9) 50%, transparent 52%),
                            repeating-linear-gradient(0deg, transparent 0%, transparent 48%, rgba(255,255,255,0.9) 50%, transparent 52%),
                            linear-gradient(to bottom, #4b5563, #1f2937)
                        `,
                        backgroundPosition: `
                            0 0, 
                            ${cursor.spark * 4}px 0, 
                            0 ${cursor.spark * 7}px,
                            0 0
                        `,
                        backgroundSize: `auto, 60px 200px, 200px 60px, auto`,
                        backgroundBlendMode: 'overlay, overlay, overlay, normal',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: 'drop-shadow(0 0 8px rgba(56, 189, 248, 0.6))'
                    }}
                >
                    KARDA
                </h1>

                {/* SUBTITLE */}
                <h2 className="text-xs md:text-sm font-nasa text-white/80 tracking-[0.5em] mb-4 text-center">
                    PREMIER INFRASTRUCTURE SOLUTIONS
                </h2>

                {/* CTA */}
                <Link to="/portfolio">
                    <button
                        className="group relative px-10 py-4 border border-white/20 hover:border-white/60 transition-all duration-500 rounded-none overflow-hidden"
                    >
                        <span className="relative z-10 text-[10px] font-nasa tracking-[0.3em] text-white group-hover:text-black transition-colors duration-500">
                            VIEW AVAILABLE INVENTORY &gt;
                        </span>
                        <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ease-out" />
                    </button>
                </Link>

            </div>
        </section>
    );
};

function App() {
    return (
        <div className="bg-black min-h-screen text-white font-sans selection:bg-white selection:text-black">
            <Navbar />
            <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/portfolio" element={<Inventory />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/inquiry" element={<Inquiry />} />
            </Routes>
        </div>
    );
}

export default App;
