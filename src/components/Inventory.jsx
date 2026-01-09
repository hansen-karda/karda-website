import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, RefreshCw, Server, Zap, Globe, AlertCircle, CheckCircle2 } from 'lucide-react';

const assets = [
    { id: 'OX-TRN-004', type: '3-Phase Transformer', capacity: '2500 kVA', location: 'NASHVILLE_GRID_04', status: 'ONLINE' },
    { id: 'OX-SUB-019', type: 'Substation Control Unit', capacity: 'N/A', location: 'AUSTIN_HUB_ALPHA', status: 'ONLINE' },
    { id: 'OX-HV-002', type: 'HV Transmission Line', capacity: '500 kV', location: 'NEVADA_SECTOR_7', status: 'MAINTENANCE' },
    { id: 'OX-BAT-009', type: 'Lithium Storage Array', capacity: '10 MWh', location: 'CALIFORNIA_ISO', status: 'ACQUIRING' },
    { id: 'OX-GEN-005', type: 'Backup Generator', capacity: '1500 kW', location: 'TEXAS_ERCOT_MAIN', status: 'ONLINE' },
    { id: 'OX-TRN-005', type: 'Distribution Transformer', capacity: '500 kVA', location: 'NASHVILLE_GRID_09', status: 'ONLINE' },
];

const StatusBadge = ({ status }) => {
    const styles = {
        ONLINE: { color: 'text-green-500', dot: 'bg-green-500', label: 'ONLINE' },
        MAINTENANCE: { color: 'text-amber-500', dot: 'bg-amber-500', label: 'MAINTENANCE' },
        ACQUIRING: { color: 'text-blue-500', dot: 'bg-blue-500', label: 'ACQUIRING' },
    };
    const s = styles[status] || styles.ONLINE;

    return (
        <div className={`flex items-center gap-2 ${s.color} text-[10px] uppercase font-bold tracking-wider`}>
            <span className={`w-1.5 h-1.5 rounded-full ${s.dot} animate-pulse`} />
            {s.label}
        </div>
    );
};

const Inventory = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredAssets = assets.filter(a =>
        a.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen w-full bg-karda-void text-white pt-24 px-6 md:px-12 flex flex-col"
        >
            {/* Header / Filter Bar */}
            <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 mb-8">
                <div className="flex items-end justify-between border-b border-white/10 pb-4">
                    <div>
                        <h2 className="text-2xl text-white font-light tracking-tight">ASSET PORTFOLIO</h2>
                        <p className="text-white/40 text-xs tracking-[0.2em] mt-1">REAL-TIME INFRASTRUCTURE MONITORING</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2 text-white/40 text-xs tracking-widest px-3 py-1 bg-white/5 rounded-sm">
                            <RefreshCw size={12} className="animate-spin-slow" />
                            SYNCED
                        </div>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative group w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 w-4 h-4 group-focus-within:text-karda-silver transition-colors" />
                        <input
                            type="text"
                            placeholder="SEARCH ASSET ID / TYPE..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 focus:border-white/30 rounded-sm py-2 pl-10 pr-4 text-xs font-mono text-karda-silver outline-none transition-all placeholder:text-white/20"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 border border-white/10 hover:bg-white/5 text-xs text-white/60 tracking-widest transition-colors">
                            <Filter size={12} /> FILTER
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 border border-white/10 hover:bg-white/5 text-xs text-white/60 tracking-widest transition-colors">
                            EXPORT CSV
                        </button>
                    </div>
                </div>
            </div>

            {/* The Terminal Table */}
            <div className="w-full max-w-7xl mx-auto bg-karda-mud/30 border border-white/5 rounded-sm overflow-hidden backdrop-blur-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5 text-[10px] text-white/40 tracking-[0.2em] font-medium border-b border-white/10">
                                <th className="p-4 font-normal">ASSET ID</th>
                                <th className="p-4 font-normal">TYPE</th>
                                <th className="p-4 font-normal">CAPACITY</th>
                                <th className="p-4 font-normal">LOCATION</th>
                                <th className="p-4 font-normal text-right">STATUS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-xs font-mono">
                            {filteredAssets.map((asset) => (
                                <tr key={asset.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="p-4 text-karda-silver font-bold tracking-wide group-hover:text-white transition-colors">{asset.id}</td>
                                    <td className="p-4 text-white/60">{asset.type}</td>
                                    <td className="p-4 text-white/60">{asset.capacity}</td>
                                    <td className="p-4 text-white/40">{asset.location}</td>
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end">
                                            <StatusBadge status={asset.status} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredAssets.length === 0 && (
                    <div className="p-12 text-center text-white/20 text-xs tracking-widest">
                        NO ASSETS FOUND
                    </div>
                )}
            </div>

            <div className="w-full max-w-7xl mx-auto mt-4 flex justify-between text-[10px] text-white/20 font-mono">
                <span>TOTAL ASSETS VALUATION: $142,000,000</span>
                <span>LAST UPDATED: T-MINUS 12s</span>
            </div>

        </motion.section>
    );
};

export default Inventory;
