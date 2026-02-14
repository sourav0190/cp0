import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Search, Loader2 } from 'lucide-react';

const FlavorDiscovery = () => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Motion transforms for "What you know → What connects"
    const leftOpacity = useTransform(scrollYProgress, [0.4, 0.6], [1, 0.4]);
    const rightOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0.6, 1]);
    const leftScale = useTransform(scrollYProgress, [0.4, 0.6], [1, 0.95]);
    const rightScale = useTransform(scrollYProgress, [0.4, 0.6], [0.95, 1]);
    const upwardMotion = useTransform(scrollYProgress, [0.4, 0.6], [0, -30]);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setError(null);

        try {
            // Mock API call - in a real scenario, this would be a fetch call to the user's API
            // For now, we simulate the structure: { searched: { name, img }, similar: { name, img } }
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Simulating API behavior
            const mockData = {
                searched: {
                    name: query,
                    image: `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800` // Placeholder
                },
                similar: {
                    name: "Smoked Paprika",
                    image: `https://images.unsplash.com/photo-1599940824399-b87987cb1212?auto=format&fit=crop&q=80&w=800` // Placeholder
                }
            };

            setResult(mockData);
        } catch (err) {
            setError("Unable to find flavor parallels at this time.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section
            ref={containerRef}
            className="min-h-screen bg-[#0A0A0C] py-24 px-6 md:px-24 flex flex-col items-center justify-center relative overflow-hidden"
        >
            {/* Background Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#B11226]/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-6xl w-full z-10">
                <header className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-white/90 text-4xl md:text-6xl font-display mb-4 tracking-tight"
                    >
                        Flavor Parallels
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-white/60 text-lg md:text-xl font-light"
                    >
                        Some ingredients share more than you think.
                    </motion.p>
                </header>

                <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-24 relative group">
                    <div className="relative flex items-center">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Enter an ingredient..."
                            className="w-full bg-transparent border-b border-white/20 py-4 px-2 text-white/90 text-xl font-light focus:outline-none focus:border-[#B11226] transition-colors placeholder:text-white/30"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="absolute right-2 text-white/40 hover:text-white transition-colors"
                        >
                            {loading ? <Loader2 className="animate-spin" size={24} /> : <Search size={24} />}
                        </button>
                    </div>
                </form>

                <AnimatePresence mode="wait">
                    {loading && (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center py-12"
                        >
                            <span className="text-white/40 tracking-[0.2em] uppercase text-xs animate-pulse">
                                Discovering flavors...
                            </span>
                        </motion.div>
                    )}

                    {error && (
                        <motion.div
                            key="error"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center text-[#B11226]/80 font-light italic"
                        >
                            {error}
                        </motion.div>
                    )}

                    {result && !loading && (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24"
                            style={{ y: upwardMotion }}
                        >
                            {/* Left Card: Searched */}
                            <motion.div style={{ opacity: leftOpacity, scale: leftScale }}>
                                <span className="block text-white/40 text-[10px] uppercase tracking-[0.3em] mb-4">You Searched</span>
                                <h3 className="text-white/90 text-3xl md:text-4xl font-display mb-8">{result.searched.name}</h3>
                                <div className="aspect-[4/5] rounded-[2rem] border border-white/10 overflow-hidden bg-white/5 relative group">
                                    <img
                                        src={result.searched.image}
                                        alt={result.searched.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                                </div>
                            </motion.div>

                            {/* Right Card: Similar */}
                            <motion.div style={{ opacity: rightOpacity, scale: rightScale }}>
                                <span className="block text-white/40 text-[10px] uppercase tracking-[0.3em] mb-4">Tastes Similar To</span>
                                <h3 className="text-white/90 text-3xl md:text-4xl font-display mb-8">{result.similar.name}</h3>
                                <div className="aspect-[4/5] rounded-[2rem] border border-white/10 overflow-hidden bg-white/5 relative group">
                                    <img
                                        src={result.similar.image}
                                        alt={result.similar.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default FlavorDiscovery;
