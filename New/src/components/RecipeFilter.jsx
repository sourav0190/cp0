import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';

const FilterSection = ({ title, options, selected, onToggle, multi = true }) => (
    <div className="mb-10">
        <h4 className="text-white/30 text-[10px] uppercase tracking-[0.3em] mb-6">{title}</h4>
        <div className="flex flex-wrap gap-3">
            {options.map(option => {
                const isSelected = multi
                    ? selected.includes(option)
                    : selected === option;

                return (
                    <button
                        key={option}
                        onClick={() => onToggle(option)}
                        className={`px-5 py-2.5 rounded-full text-xs font-medium transition-all border ${isSelected
                                ? 'bg-white text-black border-white'
                                : 'bg-transparent text-white/60 border-white/10 hover:border-white/30'
                            }`}
                    >
                        {option}
                    </button>
                );
            })}
        </div>
    </div>
);

const RecipeFilter = ({ isOpen, onClose, filters, setFilters }) => {
    const categories = {
        allergies: ['Wheat', 'Dairy', 'Nuts', 'Soy', 'Eggs', 'Shellfish'],
        diets: ['High Protein', 'Low Calorie', 'Keto', 'Vegan', 'Vegetarian', 'Muscle Gain', 'Weight Loss'],
        cuisines: ['Italian', 'Japanese', 'Indian', 'Mexican', 'Thai', 'French', 'Modern European'],
        time: ['Under 15 min', 'Under 30 min', 'Under 1 hour'],
        difficulty: ['Easy', 'Medium', 'Advanced']
    };

    const toggleFilter = (type, value) => {
        setFilters(prev => {
            if (Array.isArray(prev[type])) {
                const alreadySelected = prev[type].includes(value);
                return {
                    ...prev,
                    [type]: alreadySelected
                        ? prev[type].filter(v => v !== value)
                        : [...prev[type], value]
                };
            }
            return {
                ...prev,
                [type]: prev[type] === value ? null : value
            };
        });
    };

    const clearAll = () => {
        setFilters({
            allergies: [],
            diets: [],
            cuisines: [],
            time: null,
            difficulty: null
        });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0A0A0C] border-l border-white/10 z-[101] shadow-2xl flex flex-col"
                    >
                        <div className="p-8 flex items-center justify-between border-b border-white/10">
                            <h2 className="text-white/90 text-2xl font-display">Refine Discovery</h2>
                            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                                <X size={24} className="text-white/60" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                            <FilterSection
                                title="Allergic To"
                                options={categories.allergies}
                                selected={filters.allergies}
                                onToggle={(val) => toggleFilter('allergies', val)}
                            />
                            <FilterSection
                                title="Goal-Based Diet"
                                options={categories.diets}
                                selected={filters.diets}
                                onToggle={(val) => toggleFilter('diets', val)}
                            />
                            <FilterSection
                                title="Cuisine Type"
                                options={categories.cuisines}
                                selected={filters.cuisines}
                                onToggle={(val) => toggleFilter('cuisines', val)}
                            />
                            <FilterSection
                                title="Cooking Time"
                                options={categories.time}
                                selected={filters.time}
                                onToggle={(val) => toggleFilter('time', val)}
                                multi={false}
                            />
                            <FilterSection
                                title="Difficulty Level"
                                options={categories.difficulty}
                                selected={filters.difficulty}
                                onToggle={(val) => toggleFilter('difficulty', val)}
                                multi={false}
                            />
                        </div>

                        <div className="p-8 border-t border-white/10 grid grid-cols-2 gap-4">
                            <button
                                onClick={clearAll}
                                className="py-4 rounded-full text-xs font-medium text-white/40 hover:text-white transition-colors"
                            >
                                Clear All
                            </button>
                            <button
                                onClick={onClose}
                                className="bg-[#B11226] text-white py-4 rounded-full text-xs font-medium hover:bg-[#B11226]/90 transition-all flex items-center justify-center space-x-2"
                            >
                                <span>Apply Filters</span>
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default RecipeFilter;
