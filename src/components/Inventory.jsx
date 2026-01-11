import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronRight, Activity, Zap, Shield, Box, MapPin, Gauge, Scale, Calendar, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { client, urlFor } from '../sanityClient';
import groq from 'groq';
import transformerImg from '../assets/transformer-1.png';

// PSYCHOLOGY-DRIVEN DATA STRUCTURE (V5.0)
// Focus on: Scarcity, Certainty, and Velocity
const REAL_ASSETS_V5 = [
    {
        id: 'TR-SUN-2500',
        name: '2500 KVA SUNBELT PAD',
        type: 'Multi-Tap Step-Up',
        voltage: '480V -> 14.4kV',
        impedance: '5.75%',
        location: 'ODESSA, TX YARD',
        weight: '6,200 LBS',
        mfgYear: '2023',
        condition: 'FACTORY RECONDITIONED',
        status: 'READY TO SHIP',
        leadTimeSavings: '52 Weeks', // The Value Anchor
        price: '$60,000',
        description: 'Immediate capacity solution. While the market waits 50+ weeks for new builds, this Multi-Tap unit is mineral oil filled, TTR-tested, and ready to energize.',
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
        condition: 'NEVER ENERGIZED',
        status: 'LOGISTICS PENDING',
        leadTimeSavings: '104 Weeks',
        price: '$850,000',
        description: 'Strategic asset availability. High-voltage station class unit. Nitrogen filled for transport. Bypass the 2-year manufacturer backlog.',
        images: [],
        specs: { efficiency: 99, load: 95, shielding: 90 }
    }
];

const Inventory = () => {
    const navigate = useNavigate();
    const [assets, setAssets] = useState(null);
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    // Boot Sequence & Data Fetching
    useEffect(() => {
        const initTerminal = async () => {
            // 1. Fetch Real Data from Sanity
            try {
                const query = groq`*[_type == "inventory"]{
                    ...,
                    "imageUrls": images[].asset->url
                }`;
                const sanityData = await client.fetch(query);

                // 2. Merge Sanity Images into our Psychology-Driven Data Structure
                // (This allows us to keep the rich sales copy while pulling real images)
                const mergedData = REAL_ASSETS_V5.map((localAsset, index) => {
                    // Simple merge strategy: If Sanity has data, use its images.
                    // We map the first Sanity item to our first local item for now.
                    const cloudAsset = sanityData[index];
                    if (cloudAsset && cloudAsset.imageUrls) {
                        return {
                            ...localAsset,
                            images: cloudAsset.imageUrls // Use real Cloud images
                        };
                    }
                    return localAsset;
                });

                // 3. Simulate Boot Delay for Effect
                setTimeout(() => {
                    setAssets(mergedData);
                    setSelected(mergedData[0]);
                    setLoading(false);
                }, 800);

            } catch (err) {
                console.error("Uplink Failed:", err);
                // Fallback to local data if sanity fails
                setAssets(REAL_ASSETS_V5);
                setSelected(REAL_ASSETS_V5[0]);
                setLoading(false);
            }
        };

        initTerminal();
    }, []);

    useEffect(() => {
        setActiveImageIndex(0);
    }, [selected]);

    // Loading Screen
    if (loading) {
        return (
            <div className="h-screen w-full bg-black flex items-center justify-center font-mono relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none" />
                <div className="flex flex-col items-center gap-6 z-20">
                    <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
                    <div className="text-green-500 text-xs md:text-sm tracking-[0.3em] font-bold animate-pulse">
                        &gt; SECURING_CAPACITY_FEED...
                    </div>
                </div>
            </div>
        );
    }

    // Fallback for empty
    if (!assets || assets.length === 0) {
        return <div className="h-screen bg-black text-white flex items-center justify-center font-mono">NO CAPACITY FOUND</div>;
    }

    return (
        <div className="min-h-screen bg-black text-white p-4 pt-24 font-mono overflow-hidden">

            {/* HEADER HUD */}
            <div className="flex justify-between items-end border-b border-white/20 pb-4 mb-8">
                <div>
                    <h2 className="text-xl md:text-2xl font-bold tracking-widest text-white uppercase flex items-center gap-4">
                        AVAILABLE_CAPACITY
                        <span className="hidden md:inline-flex items-center gap-2 text-xs bg-green-900/40 text-green-400 px-3 py-1 rounded-full border border-green-500/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                            LIVE_MARKET_DATA
                        </span>
                    </h2>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-200px)]">

                {/* LEFT PANEL: MANIFEST LIST */}
                <div className="lg:col-span-4 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar pb-20">
                    <div className="text-gray-500 text-xs uppercase tracking-[0.2em] mb-2 border-b border-white/10 pb-2 flex justify-between">
                        <span>Select Unit</span>
                        <span>Lead Time Status</span>
                    </div>

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
                                <span className={`text-[9px] px-2 py-0.5 border font-bold ${selected.id === item.id ? 'border-black text-green-700' : 'border-green-500/50 text-green-500'}`}>
                                    {item.status}
                                </span>
                            </div>
                            <div className="text-sm md:text-base font-bold leading-tight mb-2 truncate">
                                {item.name}
                            </div>
                            <div className="flex justify-end opacity-80 text-[10px] items-center gap-2">
                                <Clock size={10} />
                                <span>SAVES {item.leadTimeSavings}</span>
                            </div>
                        </button>
                    ))}
                </div>

                {/* RIGHT PANEL: INSPECTION BAY */}
                <div className="lg:col-span-8 border border-white/10 bg-[#050505] relative p-6 md:p-8 flex flex-col overflow-y-auto custom-scrollbar pb-20">

                    {/* Top Info Bar */}
                    <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8 border-b border-white/10 pb-6">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 text-xs text-green-500 mb-2 tracking-widest uppercase font-bold">
                                <CheckCircle size={14} /> Immediate Availability
                            </div>
                            <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight uppercase leading-none mb-4">
                                {selected.name}
                            </h1>
                            <p className="text-gray-400 text-sm max-w-xl leading-relaxed border-l-2 border-green-500/50 pl-4 py-1">
                                {selected.description}
                            </p>
                        </div>

                        {/* PRICE & VALUE ANCHOR */}
                        <div className="text-right min-w-[200px]">
                            <div className="text-gray-500 text-[10px] uppercase mb-1 tracking-widest">Asset Valuation</div>
                            <div className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-2">{selected.price}</div>
                            <div className="inline-block bg-red-900/20 border border-red-500/30 px-3 py-1">
                                <p className="text-[10px] text-red-400 uppercase tracking-wide font-bold">
                                    Market Lead Time: {selected.leadTimeSavings}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Main Visual Area + Gallery Strip */}
                    <div className="flex-1 flex flex-col gap-4 min-h-[400px]">

                        {/* MAIN VIEW - DIGITAL HANGAR BACKGROUND */}
                        <div className="flex-1 relative bg-[#0a0a0a] rounded-sm border border-white/10 flex items-center justify-center p-8 group overflow-hidden bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]">

                            {/* VERIFIED BADGE */}
                            <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-green-500/10 border border-green-500/50 px-4 py-2 backdrop-blur-md">
                                <Shield size={16} className="text-green-500" />
                                <span className="text-xs font-bold text-green-500 tracking-widest">QC VERIFIED</span>
                            </div>

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

                    {/* Bottom Specs HUD - V5.0 MATRIX */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 pt-8 border-t border-white/10">

                        {/* LEFT: 2x2 DATA GRID */}
                        <div className="grid grid-cols-2 gap-4">
                            <DataCell icon={<Gauge size={12} />} label="Impedance (%Z)" value={selected.impedance} />
                            <DataCell icon={<MapPin size={12} />} label="Location" value={selected.location} />
                            <DataCell icon={<AlertTriangle size={12} />} label="Condition" value={selected.condition} highlight />
                            <DataCell icon={<Calendar size={12} />} label="Mfg. Year" value={selected.mfgYear} />
                        </div>

                        {/* RIGHT: ACTION */}
                        <div className="flex flex-col gap-6 justify-end">
                            <div className="flex items-center justify-between text-xs text-gray-500 border-b border-white/10 pb-2">
                                <span>Acquisition Status</span>
                                <span className="text-green-500 font-bold animate-pulse">OPEN FOR INQUIRY</span>
                            </div>

                            <button
                                onClick={() => navigate('/inquiry', { state: { asset: selected } })}
                                className="w-full bg-white text-black font-bold uppercase py-4 px-8 hover:bg-green-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 tracking-wider group relative overflow-hidden"
                            >
                                <span className="relative z-10">Secure This Asset</span>
                                <ChevronRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                                <div className="absolute inset-0 bg-gray-200 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                            </button>
                            <div className="text-center text-[10px] text-gray-600 uppercase tracking-widest">
                                Asset ID {selected.id} reserved upon deposit
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

// Reusable Small Components
const DataCell = ({ icon, label, value, highlight }) => (
    <div className={`bg-white/5 p-3 border ${highlight ? 'border-green-500/30' : 'border-white/10'}`}>
        <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-2">
            {icon} {label}
        </div>
        <div className={`text-sm md:text-lg font-mono truncate ${highlight ? 'text-green-400' : 'text-white'}`}>
            {value}
        </div>
    </div>
);

export default Inventory;
