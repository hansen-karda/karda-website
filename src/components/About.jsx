import React from 'react';

const About = () => {
    return (
        <div className="min-h-screen bg-black text-white p-8 pt-32 font-sans selection:bg-white selection:text-black">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-12">
                    The Power Crisis<span className="text-gray-600">.</span>
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    <div className="col-span-12 md:col-span-8 space-y-8 text-lg md:text-xl leading-relaxed text-gray-300 font-light">
                        <p>
                            <span className="text-white font-bold">The grid is breaking.</span> As AI data centers and electrification drive demand to historic highs, the supply chain for critical electrical infrastructure has collapsed. Lead times for high-voltage transformers have stretched from weeks to years.
                        </p>
                        <p>
                            We entered this vacuum to solve a singular problem: <span className="text-white italic">Velocity.</span>
                        </p>
                        <p>
                            Karda is not a broker. We are a liquidity provider for the electrical grid. We acquire, refurbish, and deploy substation-class assets faster than any traditional manufacturer can quote.
                        </p>
                        <p>
                            By centralizing inventory and treating infrastructure as a liquid asset class, we are stabilizing the grid one substation at a time.
                        </p>
                    </div>

                    <div className="col-span-12 md:col-span-4 border-l border-white/10 pl-8 flex flex-col justify-center space-y-8">
                        <div>
                            <div className="text-xs text-gray-500 uppercase tracking-[0.2em] mb-2">Lead Time Reduced</div>
                            <div className="text-4xl font-bold text-white">94%</div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-500 uppercase tracking-[0.2em] mb-2">Capacity Deployed</div>
                            <div className="text-4xl font-bold text-white">450 <span className="text-lg text-gray-500">MVA</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
