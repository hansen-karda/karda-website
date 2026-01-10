import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Activity, Zap, ChevronRight, maximize2, Crosshair } from 'lucide-react';
import transformerImg from '../assets/transformer-1.png';
import { ASSET_MANIFEST as LOCAL_MANIFEST } from '../data/manifest';
import { client, urlFor } from '../sanityClient';
import groq from 'groq';

const SpecBar = ({ label, value }) => (
    <div className="flex items-center gap-4 mb-2">
        <span className="text-[10px] font-mono text-gray-500 w-24 text-right uppercase tracking-wider">{label}</span>
        <div className="flex-1 h-2 bg-gray-900 border border-white/10 relative overflow-hidden">
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-white/80"
            />
        </div>
        <span className="text-[10px] font-mono text-white w-8 text-right">{value}%</span>
    </div>
);

const Inventory = () => {
    const [assets, setAssets] = useState(LOCAL_MANIFEST);
    const [selectedAsset, setSelectedAsset] = useState(LOCAL_MANIFEST[0]);
    const [loading, setLoading] = useState(true);

    // Fetch from Sanity
    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const query = groq`* [_type == "inventory"]{
    _id,
        id,
        type,
        voltage,
        status,
        price,
        specs {
        efficiency,
            load_capacity,
            durability,
            shielding
    },
    desc,
        image
} `;

                const sanityData = await client.fetch(query);

                if (sanityData && sanityData.length > 0) {
                    // Normalize/Map if needed, for now assuming 1:1 schema match or close enough
                    // If Sanity has data, we prioritize it.
                    console.log("Loaded from Sanity:", sanityData);
                    setAssets(sanityData);
                    setSelectedAsset(sanityData[0]);
                }
            } catch (error) {
                console.log("Sanity fetch failed (likely not configured yet), using local manifest.");
                console.error(error); // Log the actual error for debugging
            } finally {
                setLoading(false);
            }
        };

        fetchInventory();
    }, []);

    // Helper to resolve image source
    const getImageUrl = (asset) => {
        if (asset.image && asset.image.asset) {
            return urlFor(asset.image).width(800).url();
        }
        return transformerImg; // Fallback
    };

    return (
        <section className="h-screen w-full bg-black pt-24 px-4 pb-4 overflow-hidden flex flex-col font-mono">

            {/* TERMINAL HEADER */}
            <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                <div className="flex items-center gap-2 text-white/40">
                    <Terminal size={14} />
                    <span className="text-xs tracking-[0.2em] uppercase">KARDA_ASSET_TERMINAL_V2.0</span>
                </div>
                <div className="flex items-center gap-4 text-[10px] text-white/30">
                    <div className="flex items-center gap-1">
                        <div className={`w-2 h-2 rounded-full ${loading ? 'bg-amber-500' : 'bg-green-900'} animate-pulse`} />
                        {loading ? 'SYNCING_DB...' : 'SYSTEM_ONLINE'}
                    </div>
                    <span>SECURE_CONNECTION</span>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-0 border border-white/10">

                {/* LEFT PANEL: MANIFEST LIST */}
                <div className="md:col-span-4 border-r border-white/10 flex flex-col bg-black">
                    <div className="p-3 bg-white/5 border-b border-white/10 text-xs text-white/50 tracking-widest font-bold">
                        ASSET MANIFEST
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        {assets.map((asset) => (
                            <button
                                key={asset._id || asset.id}
                                onClick={() => setSelectedAsset(asset)}
                                className={`w - full text - left p - 4 border - b border - white / 5 transition - all duration - 200 group relative ${(selectedAsset._id || selectedAsset.id) === (asset._id || asset.id)
                                    ? 'bg-white text-black'
                                    : 'text-gray-500 hover:bg-white/5 hover:text-white'
                                    } `}
                            >
                                {(selectedAsset._id || selectedAsset.id) === (asset._id || asset.id) && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-karda-silver" />
                                )}
                                <div className="flex justify-between items-start mb-1">
                                    <span className="text-[10px] tracking-wider font-bold">{asset.id}</span>
                                    <span className={`text - [9px] px - 1 py - 0.5 border ${(selectedAsset._id || selectedAsset.id) === (asset._id || asset.id)
                                        ? 'border-black text-black'
                                        : 'border-white/20 text-white/40'
                                        } `}>
                                        {asset.status}
                                    </span>
                                </div>
                                <div className={`text - xs truncate font - medium ${(selectedAsset._id || selectedAsset.id) === (asset._id || asset.id)
                                    ? 'text-black'
                                    : 'text-gray-300'
                                    } `}>
                                    {asset.type}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* RIGHT PANEL: INSPECTION BAY */}
                <div className="md:col-span-8 bg-[#050505] relative flex flex-col">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={selectedAsset.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="h-full flex flex-col p-8"
                        >

                            {/* TOP: ID & IMAGE */}
                            <div className="flex-1 flex flex-col items-center justify-center relative mb-8 border border-white/5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent">
                                <div className="absolute top-4 left-4 text-xs text-white/30 tracking-widest">VISUAL_FEED</div>
                                <img
                                    src={transformerImg}
                                    alt="Asset"
                                    className="h-64 object-contain drop-shadow-[0_0_50px_rgba(255,255,255,0.05)]"
                                />
                                {/* Floating Data Points */}
                                <div className="absolute bottom-4 right-4 text-right">
                                    <div className="text-[10px] text-white/30">VOLTAGE TYPE</div>
                                    <div className="text-xl text-white tracking-tighter">{selectedAsset.voltage}</div>
                                </div>
                            </div>

                            {/* MIDDLE: SPECS POOL */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                <div>
                                    <h3 className="text-xs text-white/40 mb-4 tracking-widest uppercase">PERFORMANCE METRICS</h3>
                                    <SpecBar label="EFFICIENCY" value={selectedAsset.specs.efficiency} />
                                    <SpecBar label="LOAD CAP" value={selectedAsset.specs.load_capacity} />
                                    <SpecBar label="SHIELDING" value={selectedAsset.specs.shielding} />
                                </div>
                                <div className="flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-xs text-white/40 mb-2 tracking-widest uppercase">DESCRIPTION</h3>
                                        <p className="text-sm text-gray-400 leading-relaxed border-l-2 border-white/10 pl-4">{selectedAsset.desc}</p>
                                    </div>
                                    <div className="mt-4">
                                        <div className="text-[10px] text-white/30 uppercase">ESTIMATED VALUATION</div>
                                        <div className="text-3xl text-white tracking-tighter font-light">{selectedAsset.price}</div>
                                    </div>
                                </div>
                            </div>

                            {/* BOTTOM: ACTION */}
                            <button className="w-full py-5 border border-white/20 hover:bg-white hover:text-black hover:border-white transition-all duration-300 group relative overflow-hidden">
                                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out pointer-events-none" />
                                <span className="relative z-10 text-sm tracking-[0.3em] font-bold flex items-center justify-center gap-4">
                                    [ INITIATE ACQUISITION ]
                                    <ChevronRight size={16} />
                                </span>
                            </button>

                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>
        </section>
    );
};

export default Inventory;
