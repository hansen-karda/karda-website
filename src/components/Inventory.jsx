import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronRight, Activity, Zap, Shield, Box, MapPin, Gauge, Scale, Calendar, Clock, CheckCircle, AlertTriangle, Maximize2, X, ZoomIn, ZoomOut, FileText } from 'lucide-react';
import { client } from '../sanityClient';
import groq from 'groq';

const Inventory = () => {
    const navigate = useNavigate();
    const [assets, setAssets] = useState(null);
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1);

    // Boot Sequence & Data Fetching
    useEffect(() => {
        const initTerminal = async () => {
            try {
                // 1. Fetch Comprehensive Data from Sanity
                const query = groq`*[_type == "inventory"]{
                    _id,
                    id,
                    "name": type,          
                    "fullName": type,      
                    "description": desc,
                    "image": images[0].asset->url,
                    "gallery": images[].asset->url,
                    price,
                    status,
                    primary_voltage,
                    secondary_voltage,
                    impedance,
                    location,
                    weight,
                    mfgYear,
                    "leadTimeSavings": lead_time,
                    specs {
                        efficiency,
                        load,
                        shielding
                    }
                }`;
                const sanityData = await client.fetch(query);

                if (sanityData && sanityData.length > 0) {
                    // 2. Map Sanity Data to UI Structure (Strict Schema)
                    const liveAssets = sanityData.map(item => ({
                        id: item.id || 'NO-ID',
                        name: item.name || 'Unnamed Asset',
                        fullName: item.fullName || 'Unnamed Asset',
                        type: 'Transformer', // Generic class for UI label
                        voltage: (item.primary_voltage && item.secondary_voltage)
                            ? `${item.primary_voltage} -> ${item.secondary_voltage}`
                            : 'Voltage TBD',
                        impedance: item.impedance || 'TBD',
                        location: item.location || 'Logistics Hub',
                        weight: item.weight || 'TBD',
                        mfgYear: item.mfgYear || 'N/A',
                        status: item.status || 'AVAILABLE',
                        leadTimeSavings: item.leadTimeSavings || 'Immediate',
                        price: item.price || 'Inquire',
                        description: item.description || "Awaiting technical brief. Unit available for immediate dispatch.",
                        images: item.gallery || [],
                        mainImage: item.image,
                        specs: item.specs || { efficiency: 0, load: 0, shielding: 0 }
                    }));

                    // Simulate Boot Delay
                    setTimeout(() => {
                        setAssets(liveAssets);
                        setSelected(liveAssets[0]);
                        setLoading(false);
                    }, 800);
                } else {
                    console.warn("No inventory found in Sanity.");
                    setAssets([]);
                    setLoading(false);
                }
            } catch (error) {
                console.error("Sanity Handshake Failed:", error);
                setLoading(false);
            }
        };

        initTerminal();
    }, []);

    // --- LIGHTBOX CONTROLS ---
    const openLightbox = (index) => {
        setActiveImageIndex(index);
        setLightboxOpen(true);
        setZoomLevel(1);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        setZoomLevel(1);
    };

    const handleZoom = (direction) => {
        setZoomLevel(prev => {
            if (direction === 'in') return Math.min(prev + 0.5, 3);
            if (direction === 'out') return Math.max(prev - 0.5, 1);
            return prev;
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center font-mono">
                <div className="flex items-center space-x-3 mb-4">
                    <Activity className="w-6 h-6 text-yellow-400 animate-pulse" />
                    <span className="text-yellow-400 tracking-[0.2em] text-sm">ESTABLISHING UPLINK...</span>
                </div>
                <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-400 animate-progress origin-left" />
                </div>
            </div>
        );
    }

    if (!assets || assets.length === 0) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center font-mono">
                <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
                <h2 className="text-white text-xl tracking-widest mb-2">NO SIGNALS DETECTED</h2>
                <p className="text-white/40 text-sm">Inventory database is currently empty.</p>
                <Link to="/" className="mt-8 px-6 py-2 border border-white/20 text-white hover:bg-white/10 transition">
                    RETURN TO BASE
                </Link>
            </div>
        );
    }

    return (
        <section className="relative min-h-screen bg-[#0a0a0a] text-white font-mono overflow-hidden">
            {/* BACKGROUND GRID */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-20"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="relative z-10 flex h-screen overflow-hidden">
                {/* LEFT SIDEBAR - ASSET LIST */}
                <div className="w-[350px] border-r border-white/10 flex flex-col bg-black/80 backdrop-blur-sm">
                    <div className="p-6 border-b border-white/10">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-xs font-bold text-yellow-400 tracking-[0.2em]">AVAILABLE ASSETS</h2>
                            <span className="text-[10px] text-green-500 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                LIVE
                            </span>
                        </div>
                        <div className="text-[10px] text-white/40">
                            {assets.length} UNITS DETECTED
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto no-scrollbar">
                        {assets.map((asset) => (
                            <button
                                key={asset.id}
                                onClick={() => {
                                    setSelected(asset);
                                    setActiveImageIndex(0);
                                }}
                                className={`w-full text-left p-6 border-b border-white/5 transition-all duration-300 group hover:bg-white/5 ${selected?.id === asset.id ? 'bg-white/10 border-l-4 border-l-yellow-400' : 'border-l-4 border-l-transparent'
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs font-bold text-white group-hover:text-yellow-400 transition-colors">
                                        {asset.id}
                                    </span>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${asset.status === 'AVAILABLE' || asset.status === 'READY TO SHIP'
                                        ? 'border-green-500/30 text-green-400 bg-green-500/10'
                                        : 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10'
                                        }`}>
                                        {asset.status}
                                    </span>
                                </div>
                                <h3 className="text-sm text-white/80 mb-1 truncate">{asset.name}</h3>
                                <div className="flex items-center gap-2 text-[10px] text-white/40">
                                    <span>{asset.mfgYear}</span>
                                    <span>•</span>
                                    <span>{asset.location}</span>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="p-4 border-t border-white/10">
                        <Link to="/" className="flex items-center gap-2 text-xs text-white/40 hover:text-white transition-colors">
                            <ChevronRight className="w-3 h-3 rotate-180" />
                            RETURN TO MAIN
                        </Link>
                    </div>
                </div>

                {/* MAIN CONTENT - ASSET DETAILS */}
                <div className="flex-1 flex flex-col h-full overflow-y-auto bg-gradient-to-br from-black to-[#0f0f0f]">
                    {selected ? (
                        <>
                            {/* HEADER */}
                            <header className="p-8 border-b border-white/10 flex justify-between items-start sticky top-0 bg-black/90 backdrop-blur-md z-20">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h1 className="text-3xl font-bold text-white tracking-tight">{selected.fullName || selected.name}</h1>
                                        <div className="px-3 py-1 border border-yellow-400/30 bg-yellow-400/10 text-yellow-400 text-xs tracking-wider rounded">
                                            {selected.leadTimeSavings} SAVINGS
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6 text-xs text-white/60">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-3 h-3 text-yellow-500" />
                                            {selected.location}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-3 h-3 text-blue-500" />
                                            MFG: {selected.mfgYear}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Scale className="w-3 h-3 text-purple-500" />
                                            {selected.weight}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm text-white/40 mb-1">UNIT PRICE</div>
                                    <div className="text-2xl font-bold text-green-400">
                                        {selected.price && selected.price !== 'Inquire'
                                            ? `$${parseInt(selected.price.replace(/[^0-9]/g, '')).toLocaleString()}`
                                            : selected.price}
                                    </div>
                                </div>
                            </header>

                            <div className="flex-1 p-8 grid grid-cols-12 gap-8">
                                {/* LEFT COLUMN: VISUALS */}
                                <div className="col-span-12 lg:col-span-7 space-y-6">
                                    {/* Main Image Stage */}
                                    <div className="relative aspect-video bg-white/5 border border-white/10 rounded-lg overflow-hidden group">
                                        {selected.images && selected.images.length > 0 ? (
                                            <>
                                                <img
                                                    src={selected.images[activeImageIndex]}
                                                    alt={selected.name}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                                    <button
                                                        onClick={() => openLightbox(activeImageIndex)}
                                                        className="p-3 bg-white/10 backdrop-blur hover:bg-yellow-400 hover:text-black rounded-full transition-all"
                                                    >
                                                        <Maximize2 className="w-6 h-6" />
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center text-white/20">
                                                <Box className="w-16 h-16 mb-4" />
                                                <span className="text-sm tracking-widest">AWAITING IMAGERY</span>
                                            </div>
                                        )}

                                        {/* Status Overlay */}
                                        <div className="absolute top-4 right-4">
                                            <div className="flex items-center gap-2 px-3 py-1 bg-black/80 backdrop-blur border border-white/10 rounded text-xs text-white">
                                                <div className={`w-2 h-2 rounded-full ${selected.status === 'AVAILABLE' ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`} />
                                                {selected.status}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Thumbnails */}
                                    {selected.images && selected.images.length > 1 && (
                                        <div className="flex gap-4 overflow-x-auto pb-2">
                                            {selected.images.map((img, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => setActiveImageIndex(idx)}
                                                    className={`relative w-24 h-16 flex-shrink-0 border rounded overflow-hidden transition-all ${activeImageIndex === idx ? 'border-yellow-400 opacity-100' : 'border-white/10 opacity-50 hover:opacity-80'
                                                        }`}
                                                >
                                                    <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {/* DESCRIPTION */}
                                    <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                                        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                            <FileText className="w-4 h-4 text-yellow-400" />
                                            TECHNICAL BRIEF
                                        </h3>
                                        <p className="text-sm text-white/70 leading-relaxed max-w-prose">
                                            {selected.description}
                                        </p>
                                    </div>
                                </div>

                                {/* RIGHT COLUMN: SPECS & ACTIONS */}
                                <div className="col-span-12 lg:col-span-5 space-y-6">
                                    {/* SPEC MATRIX */}
                                    <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                                        <h3 className="text-sm font-bold text-white mb-6 flex items-center gap-2">
                                            <Gauge className="w-4 h-4 text-cyan-400" />
                                            ENGINEERING MATRIX
                                        </h3>

                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center py-3 border-b border-white/5">
                                                <span className="text-xs text-white/40 uppercase tracking-wider">Voltage Vector</span>
                                                <span className="text-sm font-mono text-white text-right">{selected.voltage}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-3 border-b border-white/5">
                                                <span className="text-xs text-white/40 uppercase tracking-wider">Impedance (%Z)</span>
                                                <span className="text-sm font-mono text-cyan-400">{selected.impedance || "N/A"}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-3 border-b border-white/5">
                                                <span className="text-xs text-white/40 uppercase tracking-wider">Cooling Config</span>
                                                <span className="text-sm font-mono text-white">ONAN / KNAN</span>
                                            </div>
                                        </div>

                                        {/* PERFORMANCE GAUGES */}
                                        <div className="grid grid-cols-3 gap-4 mt-8">
                                            <div className="text-center p-3 bg-white/5 rounded border border-white/5">
                                                <div className="text-xs text-white/40 mb-1">EFFICIENCY</div>
                                                <div className="text-xl font-bold text-green-400">
                                                    {selected.specs?.efficiency || 0}%
                                                </div>
                                            </div>
                                            <div className="text-center p-3 bg-white/5 rounded border border-white/5">
                                                <div className="text-xs text-white/40 mb-1">LOAD CAP</div>
                                                <div className="text-xl font-bold text-yellow-400">
                                                    {selected.specs?.load || 0}%
                                                </div>
                                            </div>
                                            <div className="text-center p-3 bg-white/5 rounded border border-white/5">
                                                <div className="text-xs text-white/40 mb-1">SHIELDING</div>
                                                <div className="text-xl font-bold text-purple-400">
                                                    {selected.specs?.shielding || 0}<span className="text-xs">dB</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ACTIONS */}
                                    <button className="w-full py-4 bg-yellow-400 text-black font-bold tracking-widest hover:bg-yellow-300 transition-colors flex items-center justify-center gap-2">
                                        <Zap className="w-4 h-4" />
                                        SAFEGUARD THIS ASSET
                                    </button>
                                    <button className="w-full py-4 border border-white/10 text-white hover:bg-white/5 transition-colors text-xs tracking-widest">
                                        DOWNLOAD FACT SHEET (PDF)
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-white/20">
                            SELECT AN ASSET TO INITIALIZE DATA STREAM
                        </div>
                    )}
                </div>
            </div>

            {/* LIGHTBOX MODAL */}
            {lightboxOpen && selected && (
                <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col">
                    <div className="p-4 flex justify-between items-center">
                        <h2 className="text-white/60 tracking-widest text-sm">OPTICAL INSPECTION MODE</h2>
                        <button onClick={closeLightbox} className="p-2 hover:bg-white/10 rounded-full text-white">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-hidden relative flex items-center justify-center">
                        <div className="relative overflow-hidden cursor-move"
                            style={{
                                transform: `scale(${zoomLevel})`,
                                transition: 'transform 0.2s ease-out'
                            }}
                        >
                            <img
                                src={selected.images[activeImageIndex]}
                                alt="Inspection"
                                className="max-h-[80vh] max-w-[90vw] object-contain"
                            />
                        </div>
                    </div>

                    <div className="p-8 bg-black/50 border-t border-white/10 flex justify-center gap-6">
                        <button onClick={() => handleZoom('out')} className="p-3 border border-white/20 rounded-full text-white hover:bg-white/10">
                            <ZoomOut className="w-5 h-5" />
                        </button>
                        <span className="flex items-center text-white font-mono w-16 justify-center">
                            {Math.round(zoomLevel * 100)}%
                        </span>
                        <button onClick={() => handleZoom('in')} className="p-3 border border-white/20 rounded-full text-white hover:bg-white/10">
                            <ZoomIn className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Inventory;
