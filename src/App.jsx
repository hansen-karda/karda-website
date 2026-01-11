import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
// IMPORT YOUR INVENTORY COMPONENT
import Inventory from './components/Inventory';

const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="fixed top-0 w-full z-50 mix-blend-difference px-8 md:px-16 py-8 flex justify-between items-center">
            <Link to="/" className="text-2xl font-black tracking-tighter italic text-white hover:opacity-80 transition-opacity">
                KARDA
            </Link>

            <div className="hidden md:flex items-center gap-12">
                {[
                    { label: 'VENTURES', path: '/' },
                    { label: 'PORTFOLIO', path: '/portfolio' },
                    { label: 'PROPRIETARY', path: '/' },
                    { label: 'CONTACT', path: '/' }
                ].map((item) => (
                    <Link
                        key={item.label}
                        to={item.path}
                        className={`text-[10px] font-nasa tracking-[0.3em] transition-opacity duration-300 ${location.pathname === item.path && item.label !== 'CONTACT' && item.label !== 'PROPRIETARY' ? 'text-white opacity-100' : 'text-white/60 hover:text-white hover:opacity-100'}`}
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
    return (
        <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black">

            {/* Main Content */}
            <div className="z-10 flex flex-col items-center w-full max-w-[90vw]">

                {/* THE WORD MARK */}
                <h1 className="text-[12vw] leading-none font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-400 to-gray-600 animate-pulse-slow select-none mb-12">
                    KARDA
                </h1>

                {/* SUBTITLE */}
                <h2 className="text-xs md:text-sm font-nasa text-white/80 tracking-[0.5em] mb-4 text-center">
                    PREMIER INFRASTRUCTURE ASSETS
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
            </Routes>
        </div>
    );
}

export default App;
