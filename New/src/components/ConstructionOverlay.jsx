import React from 'react';
import { motion } from 'framer-motion';

const ConstructionOverlay = ({ title, fullPage = false }) => {
    return (
        <div className={`inset-0 flex items-center justify-center pointer-events-none z-30 ${fullPage ? 'min-h-[70vh]' : 'absolute bg-black/40 backdrop-blur-[2px]'}`}>
            <div className="flex flex-col items-center">
                {/* Scanning line animation */}
                <div className="w-64 h-[1px] bg-white/10 relative overflow-hidden mb-8">
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-[#B11226] to-transparent w-1/2"
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center space-y-2"
                >
                    <span className="text-[10px] text-white/40 uppercase tracking-[0.5em] font-medium">
                        System Initializing
                    </span>
                    <h4 className="text-white/80 text-lg font-display italic text-center px-6">
                        {title} Experience Under Construction
                    </h4>
                    <motion.div
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="flex space-x-1"
                    >
                        <span className="w-1 h-1 rounded-full bg-[#B11226]" />
                        <span className="w-1 h-1 rounded-full bg-[#B11226]" />
                        <span className="w-1 h-1 rounded-full bg-[#B11226]" />
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default ConstructionOverlay;
