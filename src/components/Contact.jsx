import React from 'react';

const Contact = () => {
    return (
        <div className="min-h-screen bg-black text-white p-8 pt-32 flex flex-col items-center justify-center font-mono">

            <div className="max-w-xl w-full border border-white/10 p-12 bg-[#050505] relative">
                {/* Decorative Corner */}
                <div className="absolute top-0 left-0 w-2 h-2 bg-white" />
                <div className="absolute top-0 right-0 w-2 h-2 bg-white" />
                <div className="absolute bottom-0 left-0 w-2 h-2 bg-white" />
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-white" />

                <h1 className="text-xs text-gray-500 uppercase tracking-[0.3em] mb-12 text-center">
                    Direct Comms
                </h1>

                <div className="space-y-12 text-center">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight mb-2">NOLAN HANSEN</h2>
                        <div className="text-sm text-green-500 uppercase tracking-widest font-bold">
                            Director of Assets
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <div className="text-[10px] text-gray-600 uppercase tracking-widest">
                            Secure Email Link
                        </div>
                        <a
                            href="mailto:n.hansen@karda.tech"
                            className="text-xl md:text-2xl text-white hover:text-gray-300 transition-colors border-b border-white/20 hover:border-white pb-1"
                        >
                            n.hansen@karda.tech
                        </a>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-white/5 text-center">
                    <p className="text-[10px] text-gray-700 uppercase tracking-widest">
                        Karda Infrastructure Group // US_EAST
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Contact;
