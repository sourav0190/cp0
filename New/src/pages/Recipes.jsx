import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X, ChevronRight, Loader2 } from 'lucide-react';
import RecipeGrid from '../components/RecipeGrid';
import RecipeFilter from '../components/RecipeFilter';

const Recipes = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [recipes, setRecipes] = useState([]);
    const [activeFilters, setActiveFilters] = useState({
        allergies: [],
        diets: [],
        cuisines: [],
        time: null,
        difficulty: null
    });

    const [stats, setStats] = useState({ total: 0 });

    // Mock API call to fetch recipes
    const fetchRecipes = async (isSearch = false) => {
        setLoading(true);
        try {
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1200));

            // In a real app, this would be: fetch(`/api/recipes?query=${searchQuery}&filters=${JSON.stringify(activeFilters)}`)
            const mockRecipes = [
                { id: 1, name: "Truffle Infused Wagyu", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800", cuisine: "Japanese", time: "45 min", difficulty: "Advanced", calories: "450 kcal" },
                { id: 2, name: "Wild Mushroom Risotto", image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=800", cuisine: "Italian", time: "30 min", difficulty: "Medium", calories: "320 kcal" },
                { id: 3, name: "Heritage Beetroot Salad", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800", cuisine: "Modern European", time: "15 min", difficulty: "Easy", calories: "180 kcal" },
                { id: 4, name: "Braised Short Rib", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=800", cuisine: "French", time: "3 hours", difficulty: "Advanced", calories: "600 kcal" },
                { id: 5, name: "Agedashi Tofu", image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&q=80&w=800", cuisine: "Japanese", time: "20 min", difficulty: "Medium", calories: "210 kcal" },
                { id: 6, name: "Saffron Pistaschio Salmon", image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800", cuisine: "Persian Fusion", time: "25 min", difficulty: "Medium", calories: "380 kcal" }
            ];

            // Filter logic simulation
            let filtered = mockRecipes;
            if (isSearch && searchQuery) {
                // If searching by name, we just show that match (or mock it)
                filtered = mockRecipes.filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase()));
            }

            setRecipes(filtered);
            setStats({ total: filtered.length });
        } catch (error) {
            console.error("Failed to fetch recipes", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecipes();
    }, [activeFilters]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        fetchRecipes(true);
    };

    const removeFilter = (type, value) => {
        setActiveFilters(prev => ({
            ...prev,
            [type]: Array.isArray(prev[type])
                ? prev[type].filter(item => item !== value)
                : null
        }));
    };

    return (
        <div className="min-h-screen bg-[#050505] pt-32 pb-24 px-6 md:px-12 lg:px-24 selection:bg-[#B11226]/30">
            {/* Header / Search Section */}
            <div className="max-w-7xl mx-auto mb-16">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                    <form onSubmit={handleSearchSubmit} className="flex-1 max-w-2xl relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#B11226] transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Search recipes by name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#0A0A0C] border border-white/10 rounded-full py-4 pl-12 pr-6 text-white/90 placeholder:text-white/20 focus:outline-none focus:border-[#B11226] transition-all"
                        />
                    </form>

                    <button
                        onClick={() => setIsFilterOpen(true)}
                        className="flex items-center space-x-3 bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-4 rounded-full transition-all group"
                    >
                        <SlidersHorizontal size={18} className="text-white/60 group-hover:text-white transition-colors" />
                        <span className="text-white/80 font-medium">Filters</span>
                    </button>
                </div>

                {/* Active Filters Bar */}
                <div className="flex flex-wrap items-center gap-3">
                    <span className="text-white/30 text-xs uppercase tracking-widest mr-2">{stats.total} Results</span>
                    {Object.entries(activeFilters).map(([type, value]) => {
                        if (!value || (Array.isArray(value) && value.length === 0)) return null;

                        if (Array.isArray(value)) {
                            return value.map(val => (
                                <button
                                    key={val}
                                    onClick={() => removeFilter(type, val)}
                                    className="flex items-center space-x-2 bg-[#B11226]/10 border border-[#B11226]/30 px-3 py-1.5 rounded-full text-[11px] text-white/90 hover:bg-[#B11226]/20 transition-all"
                                >
                                    <span>{val}</span>
                                    <X size={12} />
                                </button>
                            ));
                        }
                        return (
                            <button
                                key={value}
                                onClick={() => removeFilter(type, value)}
                                className="flex items-center space-x-2 bg-[#B11226]/10 border border-[#B11226]/30 px-3 py-1.5 rounded-full text-[11px] text-white/90 hover:bg-[#B11226]/20 transition-all"
                            >
                                <span>{value}</span>
                                <X size={12} />
                            </button>
                        );
                    })}
                    {(Object.values(activeFilters).some(v => Array.isArray(v) ? v.length > 0 : v !== null)) && (
                        <button
                            onClick={() => setActiveFilters({ allergies: [], diets: [], cuisines: [], time: null, difficulty: null })}
                            className="text-white/40 text-[11px] hover:text-white transition-colors ml-2 underline underline-offset-4"
                        >
                            Clear All
                        </button>
                    )}
                </div>
            </div>

            {/* Recipe Grid Component */}
            <div className="max-w-7xl mx-auto">
                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center py-40"
                        >
                            <Loader2 className="animate-spin text-[#B11226] mb-6" size={40} />
                            <span className="text-white/40 tracking-[0.3em] uppercase text-xs">Finding recipes...</span>
                        </motion.div>
                    ) : (
                        <RecipeGrid recipes={recipes} />
                    )
                    }
                </AnimatePresence>
            </div>

            {/* Filter Drawer */}
            <RecipeFilter
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                filters={activeFilters}
                setFilters={setActiveFilters}
            />
        </div>
    );
};

export default Recipes;
