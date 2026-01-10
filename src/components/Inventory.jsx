import React, { useState, useEffect } from 'react';
import { ChevronRight, Activity, Zap, Shield, Box, MapPin, Gauge } from 'lucide-react';
import { client, urlFor } from '../sanityClient';
import groq from 'groq';

// Hardcoded real assets for V3.0 per requested spec
// In a real production scenario, we would map Sanity data to this structure
// But for this request, we use the specific static data provided
const REAL_ASSETS_V3 = [
    {
        id: 'TR-SUN-2500',
        name: '2500 KVA SUNBELT PAD', // Short name for Sidebar
        fullName: 'Sunbelt Multi-Tap Step-Up Pad-Mount Transformer', // Long name for Header
        type: 'Step-Up Transformer',
        voltage: '480V -> 14.4kV (Multi-Tap)',
        impedance: '5.75%',  // NEW FIELD
        location: 'Odessa, TX Yard', // NEW FIELD
        status: 'AVAILABLE',
        price: '$60,000',
        // GALLERY ARRAY
        images: [
            '/assets/sunbelt-transformer.jpg', // Main front view
            // Add placeholders if user hasnt uploaded yet, or duplicate for demo
            '/assets/sunbelt-transformer.jpg',
            '/assets/sunbelt-transformer.jpg'
        ],
        specs: { efficiency: 98.5, load: 100, shielding: 85 }
    },
    {
        id: 'TR-SUB-50M',
        name: '50 MVA SUBSTATION',
        fullName: 'High Voltage Substation Class Unit',
        type: 'Substation',
        voltage: '69kV / 13.8kV',
        impedance: '7.15%',
        location: 'Nevada Storage',
        status: 'PENDING',
        price: '$850,000',
        images: [], // Empty array = show placeholder
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
        // 1. Simulate Boot Sequence (1.5s)
        const bootTimer = setTimeout(() => {

            // 2. Load Data (Here we use the defined Const, but simulating a Fetch)
            // In future state, this would be: const data = await client.fetch(query);
            const data = REAL_ASSETS_V3;

            setAssets(data);
            setSelected(data[0]);
            setLoading(false);

        }, 1500);

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
                        ENCRYPTING V3.0 PROTOCOLS
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
                    <h2 className="text-xl md:text-2xl font-bold tracking-widest text-white uppercase">Asset_Terminal_v3.0</h2>
                    <div className="flex items-center gap-2 mt-2 text-gray-400 text-xs tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span>LIVE_FEED // SECURE_CONNECTION</span>
                    </div>
                </div>
                <div className="hidden md:block text-right text-gray-500 text-xs">
                    ID: KRD-{Math.floor(Math.random() * 90000) + 10000} // LOC: US_CENTRAL_VAULT
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
                            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase leading-none mb-2">
                                {selected.fullName}
                            </h1>
                            <div className="flex flex-wrap gap-4 text-xs md:text-sm text-gray-400 font-bold mt-4">
                                <span className="flex items-center gap-2 border border-white/10 px-3 py-1 bg-white/5">
                                    <Zap size={14} className="text-yellow-400" /> {selected.voltage}
                                </span>
                                <span className="flex items-center gap-2 border border-white/10 px-3 py-1 bg-white/5">
                                    <Gauge size={14} className="text-blue-400" /> %Z: {selected.impedance}
                                </span>
                                <span className="flex items-center gap-2 border border-white/10 px-3 py-1 bg-white/5">
                                    <MapPin size={14} className="text-red-400" /> {selected.location}
                                </span>
                            </div>
                        </div>
                        <div className="text-right min-w-[150px]">
                            <div className="text-gray-500 text-[10px] uppercase mb-1 tracking-widest">Acquisition Cost</div>
                            <div className="text-3xl font-bold text-white tracking-tighter">{selected.price}</div>
                        </div>
                    </div>

                    {/* Main Visual Area + Gallery Strip */}
                    <div className="flex-1 flex flex-col gap-4 min-h-[400px]">

                        {/* MAIN VIEW */}
                        <div className="flex-1 relative bg-gradient-to-tr from-gray-900 via-gray-900 to-gray-800 rounded-sm border border-white/10 flex items-center justify-center p-8 group overflow-hidden">

                            {/* Hex Grid Overlay */}
                            <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

                            {selected.images && selected.images.length > 0 ? (
                                <img
                                    src={selected.images[activeImageIndex]}
                                    alt="Active View"
                                    className="w-full h-full object-contain filter drop-shadow-2xl transition-all duration-500 group-hover:scale-105"
                                />
                            ) : (
                                <div className="flex flex-col items-center gap-4 opacity-30">
                                    <Box size={64} />
                                    <span className="text-xs tracking-widest">NO VISUAL FEED AVAILABLE</span>
                                </div>
                            )}
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

                    {/* Bottom Specs HUD */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 pt-8 border-t border-white/10">
                        <div className="space-y-4">
                            <SpecBar label="EFFICIENCY" value={selected.specs.efficiency} icon={<Activity size={14} />} />
                            <SpecBar label="LOAD CAPACITY" value={selected.specs.load} icon={<Zap size={14} />} />
                            <SpecBar label="SHIELDING" value={selected.specs.shielding} icon={<Shield size={14} />} />
                        </div>

                        <div className="flex items-end justify-end">
                            <button className="w-full md:w-auto bg-white text-black font-bold uppercase py-4 px-8 hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                                <span>Initiate Acquisition Protocol</span>
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

const SpecBar = ({ label, value, icon }) => (
    <div className="flex items-center gap-4 group">
        <div className="text-gray-500 w-32 text-xs flex items-center gap-2 group-hover:text-white transition-colors">
            {icon}
            {label}
        </div>
        <div className="flex-1 h-2 bg-gray-900 border border-white/10 relative overflow-hidden rounded-sm">
            <div
                className="h-full bg-white group-hover:bg-green-400 transition-all duration-1000 ease-out"
                style={{ width: `${value}%` }}
            />
        </div>
        <div className="text-white text-xs font-bold w-12 text-right">{value}%</div>
    </div>
);

export default Inventory;
