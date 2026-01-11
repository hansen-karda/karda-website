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
    const [cursor, setCursor] = useState({ x: 0, y: 0, seed: 0, visible: false });

    // Animation Loop: Keeps the Galaxy Streaks moving
    useEffect(() => {
        let interval;
        if (cursor.visible) {
            interval = setInterval(() => {
                setCursor(prev => ({ ...prev, seed: Math.random() * 100 }));
            }, 60);
        }
        return () => clearInterval(interval);
    }, [cursor.visible]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setCursor(prev => ({
            ...prev,
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            visible: true
        }));
    };

    const handleMouseLeave = () => {
        setCursor(prev => ({ ...prev, visible: false }));
    };

    return (
        <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black">

            {/* GALAXY STREAK FILTER */}
            <svg className="absolute w-0 h-0">
                <defs>
                    <filter id="plasma-bolts" x="-50%" y="-50%" width="200%" height="200%">
                        {/* 0.002 X = Stretched infinitely horizontal. 0.5 Y = Distinct rows */}
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.002 0.5"
                            numOctaves="1"
                            seed={cursor.seed}
                            result="noise"
                        />
                        <feColorMatrix
                            in="noise"
                            type="matrix"
                            values="0 0 0 0 0
                                    0 0 0 0 0
                                    0 0 0 0 0
                                    0 0 0 50 -30"
                            result="streaks"
                        />
                        <feFlood floodColor="#38bdf8" floodOpacity="1" result="color" />
                        <feComposite operator="in" in="color" in2="streaks" result="coloredStreaks" />
                        <feComposite operator="in" in="coloredStreaks" in2="SourceGraphic" />
                    </filter>
                </defs>
            </svg>

            {/* Main Content */}
            <div className="z-10 flex flex-col items-center w-full max-w-[90vw] relative">

                {/* THE WORD MARK COMPOSITE */}
                <div
                    className="relative mb-12"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    {/* LAYER 1: The Classy Dark Metal Base (Dormant State) */}
                    <h1
                        className="text-[12vw] leading-none font-black tracking-tighter text-transparent bg-clip-text select-none cursor-default relative z-10"
                        style={{
                            backgroundImage: `linear-gradient(to bottom, #4b5563 0%, #1f2937 100%)`, // Gunmetal
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        KARDA
                    </h1>

                    {/* LAYER 2: The Galaxy Streak Ignition (Cursor Masked) */}
                    <h1
                        className="absolute inset-0 text-[12vw] leading-none font-black tracking-tighter select-none pointer-events-none z-20"
                        style={{
                            color: 'white',
                            filter: 'url(#plasma-bolts) drop-shadow(0 0 4px #38bdf8)',
                            mixBlendMode: 'screen',
                            opacity: cursor.visible ? 1 : 0,
                            transition: 'opacity 0.2s',
                            WebkitMaskImage: `radial-gradient(circle 120px at ${cursor.x}px ${cursor.y}px, black 0%, transparent 80%)`,
                            maskImage: `radial-gradient(circle 120px at ${cursor.x}px ${cursor.y}px, black 0%, transparent 80%)`
                        }}
                    >
                        KARDA
                    </h1>
                </div>

                {/* SUBTITLE */}
                <h2 className="text-xs md:text-sm font-nasa text-white/80 tracking-[0.5em] mb-4 text-center">
                    PREMIER INFRASTRUCTURE SOLUTIONS
                </h2>

                {/* CTA - FORCED YELLOW REACTIVITY */}
                <Link to="/portfolio">
                    <button
                        className="group relative px-10 py-4 border transition-all duration-300 rounded-none overflow-hidden"
                        style={{
                            borderColor: cursor.visible ? '#FACC15' : 'rgba(255,255,255,0.2)',
                            boxShadow: cursor.visible ? '0 0 30px rgba(250,204,21,0.5)' : 'none',
                            transform: cursor.visible ? 'scale(1.05)' : 'scale(1)'
                        }}
                    >
                        <span
                            className="relative z-10 text-[10px] font-nasa tracking-[0.3em] transition-colors duration-300"
                            style={{
                                color: cursor.visible ? '#FACC15' : 'white',
                            }}
                        >
                            VIEW AVAILABLE INVENTORY &gt;
                        </span>

                        {/* Hover Overlay (Only shows on actual mouse hover of button, independent of Logo effect) */}
                        <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ease-out" />
                    </button>
                </Link>


            </div >
        </section >
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
