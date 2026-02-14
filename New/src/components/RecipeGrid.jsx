import React from 'react';
import { motion } from 'framer-motion';

export const RecipeCard = ({ recipe }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="group cursor-pointer"
        >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-[#0A0A0C] relative mb-6 transition-all group-hover:border-white/20">
                <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="flex gap-2">
                        <span className="bg-black/60 backdrop-blur-md text-[10px] text-white/80 px-2 py-1 rounded-sm border border-white/5 uppercase tracking-tighter">
                            {recipe.time}
                        </span>
                        <span className="bg-[#B11226]/80 backdrop-blur-md text-[10px] text-white px-2 py-1 rounded-sm border border-white/5 uppercase tracking-tighter">
                            {recipe.difficulty}
                        </span>
                    </div>
                </div>
            </div>
            <div className="px-1">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-[#B11226] uppercase tracking-[0.2em] font-medium">{recipe.cuisine}</span>
                    <span className="text-[10px] text-white/30">{recipe.calories}</span>
                </div>
                <h3 className="text-white/90 text-xl font-display group-hover:text-white transition-colors truncate">
                    {recipe.name}
                </h3>
            </div>
        </motion.div>
    );
};

const RecipeGrid = ({ recipes }) => {
    if (recipes.length === 0) {
        return (
            <div className="py-40 text-center">
                <p className="text-white/40 font-light italic text-lg">No recipes match your filters.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
            {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
        </div>
    );
};

export default RecipeGrid;
