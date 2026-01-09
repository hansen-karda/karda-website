import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Globe, Shield, TrendingUp, ChevronRight } from 'lucide-react';
// IMPORT YOUR INVENTORY COMPONENT
import Inventory from './components/Inventory';
// IMPORT YOUR LOGO (Uncomment when ready)
import kardaLogo from './assets/karda-platinum-logo.png';

function App() {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-karda-void text-karda-silver font-sans selection:bg-karda-silver selection:text-karda-void">

            {/* NAVIGATION BAR */}
            <nav className="fixed w-full z-50 bg-karda-void/80 backdrop-blur-md border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 group">
                        {/* LOGO ICON PLACEHOLDER REMOVED */}
                        <span className="text-2xl font-nasa font-bold tracking-[0.2em] text-white">KARDA</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8 text-xs font-medium text-white/60 tracking-widest">
                        <Link to="/" className={`hover:text-white transition-colors ${location.pathname === '/' ? 'text-white' : ''}`}>VENTURES</Link>
                        <Link to="/portfolio" className={`hover:text-white transition-colors ${location.pathname === '/portfolio' ? 'text-white' : ''}`}>PORTFOLIO</Link>
                        <span className="cursor-not-allowed opacity-50">PROPRIETARY</span>
                        <Link to="/" className="hover:text-white transition-colors">CONTACT</Link>
                    </div>
                </div>
            </nav>

            {/* PAGE ROUTING */}
            <Routes>
                {/* HOME PAGE */}
                <Route path="/" element={
                    <main className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden pt-20">
                        {/* Background Ambience */}
                        <div className="absolute inset-0 bg-karda-void pointer-events-none" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-glow-radial opacity-40 animate-glow-pulse pointer-events-none" />

                        <div className="z-10 flex flex-col items-center gap-8 max-w-4xl px-6">

                            {/* HERO LOGO AREA */}
                            <div className="w-[450px] h-[450px] relative group flex items-center justify-center">
                                <img
                                    src={kardaLogo}
                                    alt="Karda Logo"
                                    className="w-full h-full object-contain drop-shadow-2xl mix-blend-screen transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>

                            <h1 className="text-2xl md:text-4xl font-nasa font-bold tracking-tight text-white mb-4 text-center">
                                PREMIER INFRASTRUCTURE ASSETS.
                            </h1>

                            <p className="text-sm md:text-base text-white/50 tracking-[0.2em] max-w-lg mb-8 text-center">
                                THE NEW STANDARD IN CAPITAL ALLOCATION
                            </p>

                            <Link to="/portfolio" className="group flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 transition-all duration-500 rounded-sm">
                                <span className="text-sm font-nasa tracking-widest text-karda-silver">VIEW AVAILABLE INVENTORY</span>
                                <ChevronRight className="w-4 h-4 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
                            </Link>
                        </div>

                        {/* TRUST SIGNALS */}
                        <section className="w-full max-w-7xl mx-auto mt-32 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
                            <div className="p-12 flex flex-col items-center text-center hover:bg-white/5 transition-colors">
                                <Globe className="w-8 h-8 text-white/40 mb-6" />
                                <h3 className="text-sm font-bold text-white tracking-widest mb-3">GLOBAL DEPLOYMENT</h3>
                                <p className="text-white/40 text-xs leading-relaxed max-w-xs">Strategic asset acquisition across key energy markets.</p>
                            </div>
                            <div className="p-12 flex flex-col items-center text-center hover:bg-white/5 transition-colors">
                                <Shield className="w-8 h-8 text-white/40 mb-6" />
                                <h3 className="text-sm font-bold text-white tracking-widest mb-3">INSTITUTIONAL SECURITY</h3>
                                <p className="text-white/40 text-xs leading-relaxed max-w-xs">OpSec-first architecture protecting physical value.</p>
                            </div>
                            <div className="p-12 flex flex-col items-center text-center hover:bg-white/5 transition-colors">
                                <TrendingUp className="w-8 h-8 text-white/40 mb-6" />
                                <h3 className="text-sm font-bold text-white tracking-widest mb-3">PROVEN PERFORMANCE</h3>
                                <p className="text-white/40 text-xs leading-relaxed max-w-xs">Optimizing yield through intelligent management.</p>
                            </div>
                        </section>
                    </main>
                } />

                {/* PORTFOLIO PAGE */}
                <Route path="/portfolio" element={<Inventory />} />
            </Routes>
        </div>
    );
}

export default App;
