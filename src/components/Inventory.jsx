import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Activity, Zap, Shield, Box, MapPin, Gauge, Scale, Calendar } from 'lucide-react';
import { client, urlFor } from '../sanityClient';
import groq from 'groq';
import transformerImg from '../assets/transformer-1.png';

// REAL ASSETS V4.0 w/ Weight, Year, Description
const REAL_ASSETS_V4 = [
    {
        id: 'TR-SUN-2500',
        name: '2500 KVA SUNBELT PAD',
        type: 'Multi-Tap Step-Up',
        voltage: '480V -> 14.4kV',
        impedance: '5.75%',
        location: 'ODESSA, TX YARD',
        weight: '6,200 LBS',
        mfgYear: '2023',
        status: 'AVAILABLE',
        price: '$60,000',
        description: 'Sunbelt Multi-Tap Step-Up Pad-Mount. Mineral Oil Filled. Taps: 14,400 / 13,800 / 13,200 / 12,870 / 12,470 / 12,000 / 11,700.',
        images: [
            transformerImg,
            transformerImg,
            transformerImg
        ],
        specs: { efficiency: 98.5, load: 100, shielding: 85 }
    },
    {
        id: 'TR-SUB-50M',
        name: '50 MVA SUBSTATION',
        type: 'Substation Class',
        voltage: '69kV / 13.8kV',
        impedance: '7.15%',
        location: 'NEVADA STORAGE',
        weight: '84,000 LBS',
        mfgYear: '2022',
        status: 'PENDING',
        price: '$850,000',
        description: 'High-voltage substation class unit. Nitrogen filled for transport. Ready for immediate deployment.',
        images: [],
        specs: { efficiency: 99, load: 95, shielding: 90 }
    }
];

const Inventory = () => {
    const [assets, setAssets] = useState(null);
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    // Boot Sequence Logic
    useEffect(() => {
        // 1. Simulate Boot Sequence (700ms)
        const bootTimer = setTimeout(() => {
            const data = REAL_ASSETS_V4;
            setAssets(data);
            setSelected(data[0]);
            setLoading(false);
        }, 300);

        return () => clearTimeout(bootTimer);
    }, []);

    // Reset image index when selection changes
    useEffect(() => {
        setActiveImageIndex(0);
    }, [selected]);

    // Loading Screen
    if (loading) {
        return (
            <div className="h-screen w-full bg-black flex items-center justify-center font-mono relative overflow-hidden">

                {/* Matrix / Boot visuals */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none" />

                <div className="flex flex-col items-center gap-6 z-20">
                    <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
                    <div className="text-green-500 text-xs md:text-sm tracking-[0.3em] font-bold animate-pulse">
                        &gt; ESTABLISHING_SECURE_UPLINK...
                    </div>
                    <div className="text-green-900/50 text-[10px] tracking-widest mt-2">
                        ENCRYPTING V4.0 PROTOCOLS
                    </div>
                </div>
            </div>
        );
    }

    // Fallback for empty
    if (!assets || assets.length === 0) {
        return <div className="h-screen bg-black text-white flex items-center justify-center font-mono">NO ASSETS FOUND</div>;
    }

    return (
        <div className="min-h-screen bg-black text-white p-4 pt-24 font-mono overflow-hidden">

            {/* HEADER HUD */}
            <div className="flex justify-between items-end border-b border-white/20 pb-4 mb-8">
                <div>
                    <h2 className="text-xl md:text-2xl font-bold tracking-widest text-white uppercase">INVENTORY</h2>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-200px)]">

                {/* LEFT PANEL: MANIFEST LIST */}
                <div className="lg:col-span-4 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar pb-20">
                    <div className="text-gray-500 text-xs uppercase tracking-[0.2em] mb-2 border-b border-white/10 pb-2">Select Unit</div>

                    {assets.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setSelected(item)}
                            className={`group relative p-4 text-left border transition-all duration-200 uppercase w-full
                ${selected.id === item.id
                                    ? 'bg-white border-white text-black translate-x-2'
                                    : 'bg-black/40 border-white/10 text-gray-400 hover:border-white/50 hover:text-white'
                                }`}
                        >
                            {selected.id === item.id && (
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500" />
                            )}

                            <div className="flex justify-between items-start mb-2">
                                <span className="font-bold tracking-wider text-xs">{item.id}</span>
                                <span className={`text-[9px] px-2 py-0.5 border ${selected.id === item.id ? 'border-black' : 'border-gray-600'}`}>
                                    {item.status}
                                </span>
                            </div>
                            <div className="text-sm md:text-base font-bold leading-tight mb-2 truncate">
                                {item.name}
                            </div>
                            <div className="flex justify-between opacity-60 text-[10px]">
                                <span>{item.type}</span>
                                <span>{item.location}</span>
                            </div>
                        </button>
                    ))}
                </div>

                {/* RIGHT PANEL: INSPECTION BAY */}
                <div className="lg:col-span-8 border border-white/10 bg-[#050505] relative p-6 md:p-8 flex flex-col overflow-y-auto custom-scrollbar pb-20">

                    {/* Top Info Bar */}
                    <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8 border-b border-white/10 pb-6">
                        <div className="flex-1">
                            <div className="text-xs text-green-500 mb-2 tracking-widest uppercase">Target Selected</div>
                            <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight uppercase leading-none mb-4">
                                {selected.name}
                            </h1>
                            <p className="text-gray-400 text-sm max-w-xl leading-relaxed border-l-2 border-white/10 pl-4 py-1">
                                {selected.description}
                            </p>
                        </div>
                        <div className="text-right min-w-[200px]">
                            <div className="text-gray-500 text-[10px] uppercase mb-1 tracking-widest">Global Valuation</div>
                            <div className="text-4xl md:text-5xl font-black text-white tracking-tighter">{selected.price}</div>
                        </div>
                    </div>

                    {/* Main Visual Area + Gallery Strip */}
                    <div className="flex-1 flex flex-col gap-4 min-h-[400px]">

                        {/* MAIN VIEW - DIGITAL HANGAR BACKGROUND */}
                        <div className="flex-1 relative bg-[#0a0a0a] rounded-sm border border-white/10 flex items-center justify-center p-8 group overflow-hidden bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]">

                            {selected.images && selected.images.length > 0 ? (
                                <img
                                    src={selected.images[activeImageIndex]}
                                    alt="Active View"
                                    className="w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:scale-105 z-10"
                                />
                            ) : (
                                <div className="flex flex-col items-center gap-4 opacity-30">
                                    <Box size={64} />
                                    <span className="text-xs tracking-widest">NO VISUAL FEED AVAILABLE</span>
                                </div>
                            )}

                            {/* Floor Grid Reflection Effect (Fake) */}
                            <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none z-0" />
                        </div>

                        {/* THUMBNAIL STRIP */}
                        {selected.images && selected.images.length > 1 && (
                            <div className="flex gap-4 h-20">
                                {selected.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImageIndex(idx)}
                                        className={`relative h-full aspect-square border-2 transition-all duration-300 overflow-hidden bg-gray-900 group ${activeImageIndex === idx
                                            ? 'border-green-500 opacity-100'
                                            : 'border-white/10 opacity-50 hover:opacity-100 hover:border-white/50'
                                            }`}
                                    >
                                        <img src={img} className="w-full h-full object-cover" alt="thumbnail" />
                                        {activeImageIndex === idx && <div className="absolute inset-0 bg-green-500/10" />}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Bottom Specs HUD - V4.0 MATRIX */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 pt-8 border-t border-white/10">

                        {/* LEFT: 2x2 DATA GRID */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/5 p-3 border border-white/10">
                                <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-2">
                                    <Gauge size={12} /> Impedance (%Z)
                                </div>
                                <div className="text-xl font-mono text-white">{selected.impedance}</div>
                            </div>
                            <div className="bg-white/5 p-3 border border-white/10">
                                <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-2">
                                    <MapPin size={12} /> Location
                                </div>
                                <div className="text-xl font-mono text-white truncate">{selected.location}</div>
                            </div>
                            <div className="bg-white/5 p-3 border border-white/10">
                                <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-2">
                                    <Scale size={12} /> Weight
                                </div>
                                <div className="text-xl font-mono text-white">{selected.weight}</div>
                            </div>
                            <div className="bg-white/5 p-3 border border-white/10">
                                <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-2">
                                    <Calendar size={12} /> Mfg. Year
                                </div>
                                <div className="text-xl font-mono text-white">{selected.mfgYear}</div>
                            </div>
                        </div>

                        {/* RIGHT: PROGRESS BARS & ACTION */}
                        <div className="flex flex-col gap-6">
                            <div className="space-y-4">
                                <SpecBar label="EFFICIENCY" value={selected.specs.efficiency} icon={<Activity size={14} />} />
                                <SpecBar label="LOAD CAPACITY" value={selected.specs.load} icon={<Zap size={14} />} />
                                <SpecBar label="SHIELDING" value={selected.specs.shielding} icon={<Shield size={14} />} />
                            </div>

                            <div className="mt-auto">
                                <a
                                    href={`mailto:n.hansen@karda.tech?subject=Acquisition Protocol: ${selected.id} - ${selected.name}&body=I am interested in acquiring the ${selected.name} (${selected.id}) located in ${selected.location}. Please provide full spec sheet and wiring capabilities.`}
                                    className="w-full bg-white text-black font-bold uppercase py-4 px-8 hover:bg-green-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 tracking-wider group"
                                >
                                    <span>Initiate Acquisition Protocol</span>
                                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

const SpecBar = ({ label, value, icon }) => (
    <div className="flex items-center gap-4 group">
        <div className="text-gray-500 w-28 text-[10px] uppercase flex items-center gap-2 group-hover:text-white transition-colors">
            {icon}
            {label}
        </div>
        <div className="flex-1 h-1.5 bg-gray-900 border border-white/10 relative overflow-hidden rounded-sm">
            <div
                className="h-full bg-white group-hover:bg-green-400 transition-all duration-1000 ease-out"
                style={{ width: `${value}%` }}
            />
        </div>
        <div className="text-white text-xs font-bold w-12 text-right">{value}%</div>
    </div>
);

export default Inventory;
