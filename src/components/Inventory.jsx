import React, { useState, useEffect } from 'react';
import { ChevronRight, Activity, Zap, Shield, Box } from 'lucide-react';
import { ASSET_MANIFEST as LOCAL_MANIFEST } from '../data/manifest';
import { client, urlFor } from '../sanityClient';
import groq from 'groq';
import transformerImg from '../assets/transformer-1.png';

// Fallback image if asset.image is missing in Sanity
const getImageUrl = (asset) => {
    if (asset?.image?.asset) {
        return urlFor(asset.image).width(800).url();
    }
    return transformerImg;
};

// Map Sanity schema to Component schema
const normalizeAsset = (asset) => ({
    id: asset.id || 'UNKNOWN',
    name: asset.type || 'Unknown Asset', // Sanity 'type' -> Component 'name'
    type: 'Infrastructure', // Hardcoded or new field
    voltage: asset.voltage || 'N/A',
    status: asset.status || 'UNKNOWN',
    price: asset.price || 'Price on Request',
    specs: {
        efficiency: asset.specs?.efficiency || 0,
        load: asset.specs?.load_capacity || 0, // Sanity 'load_capacity' -> Component 'load'
        shielding: asset.specs?.shielding || 0
    },
    image: asset.image,
    desc: asset.desc
});

const Inventory = () => {
    const [assets, setAssets] = useState(null);
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch from Sanity
    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const query = groq`*[_type == "inventory"]{
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
                }`;

                const sanityData = await client.fetch(query);

                if (sanityData && sanityData.length > 0) {
                    const normalized = sanityData.map(normalizeAsset);
                    setAssets(normalized);
                    setSelected(normalized[0]);
                } else {
                    // Fallback if Sanity is empty but connected
                    setAssets([]);
                }
            } catch (error) {
                console.log("Sanity fetch failed:", error);
                // In case of error, we can either show error or empty. 
                // User requested "Only real sanity data", so we'll leave it empty or mock if strictly needed.
                // For now, let's allow the loading to finish so we don't hang.
                setAssets([]);
            } finally {
                setLoading(false);
            }
        };

        fetchInventory();
    }, []);

    if (loading) {
        return (
            <div className="h-screen w-full bg-black flex items-center justify-center font-mono">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
                    <div className="text-green-500 text-sm tracking-[0.2em] animate-pulse">
                        &gt; ESTABLISHING_SECURE_UPLINK...
                    </div>
                </div>
            </div>
        );
    }

    if (!assets || assets.length === 0) {
        return (
            <div className="h-screen w-full bg-black flex items-center justify-center text-white/30 font-mono tracking-widest">
                NO ASSETS DETECTED IN SECURE STORAGE
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-4 pt-24 font-mono">

            {/* HEADER HUD */}
            <div className="flex justify-between items-end border-b border-white/20 pb-4 mb-8">
                <div>
                    <h2 className="text-xl md:text-2xl font-bold tracking-widest text-white uppercase">Asset_Terminal_v2.1</h2>
                    <div className="flex items-center gap-2 mt-2 text-gray-400">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span>LIVE_FEED // SECURE_CONNECTION</span>
                    </div>
                </div>
                <div className="hidden md:block text-right text-gray-500">
                    ID: KRD-{Math.floor(Math.random() * 1000)} // LOC: US_EAST
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-200px)]">

                {/* LEFT PANEL: MANIFEST LIST */}
                <div className="lg:col-span-4 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
                    <div className="text-gray-500 uppercase tracking-widest mb-2 border-b border-white/10 pb-2">Select Asset</div>

                    {assets.map((item, idx) => (
                        <button
                            key={item._id || item.id || idx}
                            onClick={() => setSelected(item)}
                            className={`group relative p-4 text-left border transition-all duration-200 uppercase w-full
                ${(selected.id === item.id)
                                    ? 'bg-white border-white text-black'
                                    : 'bg-black/50 border-white/20 text-gray-400 hover:border-white hover:text-white'
                                }`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-bold tracking-wider">{item.id}</span>
                                <span className={`text-[10px] px-2 py-1 border ${selected.id === item.id ? 'border-black' : 'border-gray-600'}`}>
                                    {item.status}
                                </span>
                            </div>
                            <div className="text-lg font-bold leading-none mb-2 truncate">{item.name}</div>
                            <div className="flex justify-between opacity-60 text-[10px]">
                                <span>{item.type}</span>
                                <span>{item.voltage}</span>
                            </div>
                        </button>
                    ))}
                </div>

                {/* RIGHT PANEL: INSPECTION BAY */}
                <div className="lg:col-span-8 border border-white/10 bg-white/5 relative p-8 flex flex-col overflow-y-auto">

                    {/* Top Info Bar */}
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h1 className="text-2xl md:text-5xl font-black text-white tracking-tighter uppercase mb-2">
                                {selected.name}
                            </h1>
                            <p className="text-gray-300 text-lg">{selected.voltage}</p>
                        </div>
                        <div className="text-right">
                            <div className="text-gray-500 text-xs uppercase mb-1">Estimated Valuation</div>
                            <div className="text-3xl font-bold text-white">{selected.price}</div>
                        </div>
                    </div>

                    {/* Main Visual Area */}
                    <div className="flex-1 relative border-t border-b border-white/5 py-8 flex items-center justify-center min-h-[300px]">
                        <div className="w-full h-full bg-gradient-to-tr from-gray-900 to-gray-800 rounded flex items-center justify-center border border-white/10 relative overflow-hidden group">
                            {/* 3D Image Placeholder */}
                            <img
                                src={getImageUrl(selected)}
                                alt={selected.name}
                                className="w-full h-full object-contain p-8 mix-blend-lighten opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
                        </div>
                    </div>

                    {/* Bottom Specs HUD */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                        <div className="space-y-4">
                            <SpecBar label="EFFICIENCY" value={selected.specs.efficiency} icon={<Activity size={14} />} />
                            <SpecBar label="LOAD CAPACITY" value={selected.specs.load} icon={<Zap size={14} />} />
                            <SpecBar label="SHIELDING" value={selected.specs.shielding} icon={<Shield size={14} />} />
                        </div>

                        <div className="flex items-end justify-end">
                            <button className="w-full md:w-auto bg-white text-black font-bold uppercase py-4 px-8 hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                                <span>Initiate Acquisition</span>
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
    <div className="flex items-center gap-4">
        <div className="text-gray-500 w-32 text-xs flex items-center gap-2">
            {icon}
            {label}
        </div>
        <div className="flex-1 h-3 bg-gray-900 border border-white/10 relative overflow-hidden rounded-sm">
            <div
                className="h-full bg-white transition-all duration-1000 ease-out"
                style={{ width: `${value}%` }}
            />
        </div>
        <div className="text-white text-xs font-bold w-12 text-right">{value}%</div>
    </div>
);

export default Inventory;
