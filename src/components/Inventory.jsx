import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ArrowRight, Zap, Info, ChevronRight, Activity } from 'lucide-react';
import transformerImg from '../assets/transformer-1.png';

// --- DATA STRUCTURE: OPEN FOR CLIENT EDITING ---
const ASSET_DATA = [
    {
        id: 'TR-HV-2500-04',
        title: 'HV SUBSTATION CLASS TRANSFORMER',
        price: '$2,450,000',
        location: 'NASHVILLE, TN',
        status: 'AVAILABLE',
        specs: {
            voltage: '161kV / 13.8kV',
            rating: '25 MVA',
            weight: '84,000 LBS',
            condition: 'NEW SURPLUS'
        },
        image: transformerImg // Placeholder for specific image
    },
    {
        id: 'TR-PAD-500-12',
        title: '3-PHASE PADMOUNT UNIT',
        price: '$45,000',
        location: 'AUSTIN, TX',
        status: 'AVAILABLE',
        specs: {
            voltage: '12.47kV / 480V',
            rating: '500 kVA',
            weight: '5,200 LBS',
            condition: 'REMANUFACTURED'
        },
        image: transformerImg
    },
    {
        id: 'TR-DIS-150-09',
        title: 'POLE MOUNT DISTRIBUTION',
        price: '$8,500',
        location: 'DENVER, CO',
        status: 'PENDING',
        specs: {
            voltage: '7.2kV / 240V',
            rating: '150 kVA',
            weight: '1,100 LBS',
            condition: 'NEW'
        },
        image: transformerImg
    },
    {
        id: 'TR-HV-5000-01',
        title: 'GSU POWERTRAIN UNIT',
        price: '$4,100,000',
        location: 'RENO, NV',
        status: 'ACQUIRING',
        specs: {
            voltage: '345kV / 34.5kV',
            rating: '50 MVA',
            weight: '142,000 LBS',
            condition: 'FACTORY ORDER'
        },
        image: transformerImg
    }
];

const AssetCard = ({ asset }) => {
    return (
        <div className="group relative bg-[#0A0A0A] border border-white/5 hover:border-white/20 transition-all duration-500 flex flex-col overflow-hidden rounded-sm">
            {/* Image Area */}
            <div className="relative h-64 w-full bg-gradient-to-b from-gray-900 to-black overflow-hidden flex items-center justify-center p-8">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <img
                    src={asset.image}
                    alt={asset.title}
                    className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105 drop-shadow-2xl"
                />
                {/* Status Tag */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full animate-pulse ${asset.status === 'AVAILABLE' ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                    <span className="text-[10px] font-mono tracking-widest text-white/80">{asset.status}</span>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-6 flex flex-col gap-4 flex-grow border-t border-white/5 bg-[#080808]">
                <div>
                    <div className="text-[10px] text-white/40 font-mono tracking-widest mb-1">{asset.id}</div>
                    <h3 className="text-white font-nasa text-sm tracking-wide leading-relaxed group-hover:text-blue-400 transition-colors">{asset.title}</h3>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-y-2 gap-x-4 py-4 border-t border-white/5 border-b mb-2">
                    <div className="flex flex-col">
                        <span className="text-[9px] text-white/30 uppercase tracking-widest">Voltage</span>
                        <span className="text-xs text-white/80 font-mono">{asset.specs.voltage}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[9px] text-white/30 uppercase tracking-widest">Rating</span>
                        <span className="text-xs text-white/80 font-mono">{asset.specs.rating}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[9px] text-white/30 uppercase tracking-widest">Weight</span>
                        <span className="text-xs text-white/80 font-mono">{asset.specs.weight}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[9px] text-white/30 uppercase tracking-widest">Condition</span>
                        <span className="text-xs text-white/80 font-mono">{asset.specs.condition}</span>
                    </div>
                </div>

                <div className="mt-auto flex items-center justify-between">
                    <span className="text-white font-nasa text-lg">{asset.price}</span>
                    <button className="p-2 border border-white/10 hover:bg-white hover:text-black transition-all rounded-sm group/btn">
                        <ArrowRight size={16} className="group-hover/btn:-rotate-45 transition-transform duration-300" />
                    </button>
                </div>
            </div>
        </div>
    );
};

const Inventory = () => {
    const [filter, setFilter] = useState('');

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen w-full bg-karda-void text-white pt-24 px-6 md:px-12 flex flex-col pb-20"
        >
            {/* Header */}
            <div className="max-w-7xl mx-auto w-full mb-12 flex flex-col md:flex-row items-end justify-between gap-6 border-b border-white/10 pb-6">
                <div>
                    <h1 className="text-4xl md:text-5xl font-nasa font-bold text-white mb-2">AVAILABLE INVENTORY</h1>
                    <p className="text-sm text-white/40 tracking-[0.2em]">HIGH VOLTAGE INFRASTRUCTURE ASSETS</p>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative group flex-grow md:w-64">
                        <input
                            type="text"
                            placeholder="SEARCH ASSETS..."
                            className="w-full bg-white/5 border border-white/10 focus:border-white/30 rounded-full py-3 pl-6 pr-12 text-xs tracking-widest text-white outline-none transition-all"
                            onChange={(e) => setFilter(e.target.value)}
                        />
                        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 w-4 h-4" />
                    </div>
                    <button className="p-3 border border-white/10 rounded-full hover:bg-white/10 transition-colors">
                        <Filter size={16} className="text-white/60" />
                    </button>
                </div>
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {ASSET_DATA.filter(item => item.title.toLowerCase().includes(filter.toLowerCase())).map((asset) => (
                    <AssetCard key={asset.id} asset={asset} />
                ))}
            </div>

        </motion.section>
    );
};

export default Inventory;
