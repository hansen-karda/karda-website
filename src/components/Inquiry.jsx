import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Smartphone, Mail, Building2, User } from 'lucide-react';

const Inquiry = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const asset = location.state?.asset;
    const [submitted, setSubmitted] = useState(false);

    // Fallback if accessed directly without state
    if (!asset) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center font-mono">
                <div className="text-center">
                    <p className="mb-4 text-red-500">ERROR: NO ASSET REFERENCE DETECTED</p>
                    <button onClick={() => navigate('/portfolio')} className="border border-white/20 px-4 py-2 hover:bg-white hover:text-black">
                        RETURN TO TERMINAL
                    </button>
                </div>
            </div>
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // meaningful delay to simulate processing
        setTimeout(() => setSubmitted(true), 1500);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
                <div className="max-w-md w-full border border-green-500/30 bg-[#051005] p-12 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-green-500/5 animate-pulse" />
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                    <h2 className="text-2xl font-bold uppercase tracking-widest mb-2 text-white">Inquiry Received</h2>
                    <p className="text-gray-400 mb-8 font-mono text-sm">
                        CASE ID: {Math.floor(Math.random() * 100000)}<br />
                        AGENT DISPATCHED
                    </p>
                    <button
                        onClick={() => navigate('/portfolio')}
                        className="text-xs uppercase tracking-[0.2em] border-b border-green-500 text-green-500 hover:text-green-400 pb-1"
                    >
                        Return to Inventory
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black flex flex-col md:flex-row">

            {/* LEFT: ASSET SUMMARY (Sticky) */}
            <div className="w-full md:w-1/3 bg-[#0a0a0a] border-r border-white/10 p-8 md:p-12 flex flex-col pt-32 relative overflow-hidden">

                {/* Back Button */}
                <button
                    onClick={() => navigate('/portfolio')}
                    className="absolute top-8 left-8 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-colors"
                >
                    <ArrowLeft size={14} /> Back to Terminal
                </button>

                <div className="mb-8">
                    <div className="text-green-500 text-xs font-mono uppercase tracking-widest mb-2">Acquisition Target</div>
                    <h1 className="text-3xl font-black uppercase leading-none mb-4">{asset.name}</h1>
                    <div className="text-4xl font-light text-gray-400">{asset.price}</div>
                </div>

                {/* Tech Specs Summary */}
                <div className="space-y-4 font-mono text-xs border-t border-white/10 pt-8 mt-auto">
                    <div className="flex justify-between">
                        <span className="text-gray-600">ID</span>
                        <span>{asset.id}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">LOCATION</span>
                        <span>{asset.location}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">STATUS</span>
                        <span className="text-green-500">{asset.status}</span>
                    </div>
                </div>
            </div>

            {/* RIGHT: INQUIRY FORM */}
            <div className="w-full md:w-2/3 bg-black p-8 md:p-20 pt-32">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-xl md:text-2xl font-light mb-2">Request Purchase Information</h2>
                    <p className="text-gray-500 mb-12 text-sm">Our sales engineering team will coordinate logistics and provide final spec verification upon request.</p>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-gray-500 flex items-center gap-2">
                                    <User size={12} /> Full Name
                                </label>
                                <input required type="text" className="w-full bg-transparent border-b border-white/20 py-4 text-lg focus:border-white focus:outline-none transition-colors" placeholder="e.g. John Doe" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-gray-500 flex items-center gap-2">
                                    <Building2 size={12} /> Company / Entity
                                </label>
                                <input required type="text" className="w-full bg-transparent border-b border-white/20 py-4 text-lg focus:border-white focus:outline-none transition-colors" placeholder="e.g. Acme Grid Corp" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-gray-500 flex items-center gap-2">
                                    <Mail size={12} /> Work Email
                                </label>
                                <input required type="email" className="w-full bg-transparent border-b border-white/20 py-4 text-lg focus:border-white focus:outline-none transition-colors" placeholder="name@company.com" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-gray-500 flex items-center gap-2">
                                    <Smartphone size={12} /> Phone (Direct)
                                </label>
                                <input required type="tel" className="w-full bg-transparent border-b border-white/20 py-4 text-lg focus:border-white focus:outline-none transition-colors" placeholder="+1 (555) 000-0000" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500">Project / Deployment Context</label>
                            <textarea className="w-full bg-[#0a0a0a] border border-white/10 p-4 min-h-[150px] text-sm focus:border-white/40 focus:outline-none transition-colors" placeholder="Please describe the intended application and required delivery timeline..." />
                        </div>

                        <div className="pt-8">
                            <button type="submit" className="bg-white text-black font-bold uppercase py-5 px-10 hover:bg-gray-200 transition-colors w-full md:w-auto tracking-widest text-sm">
                                Submit Inquiry
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Inquiry;
