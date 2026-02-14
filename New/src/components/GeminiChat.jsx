import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, MessageCircle, Info, HelpCircle } from 'lucide-react';
import { getGeminiResponse } from '../services/geminiService';

const GeminiChat = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: "Hello! I'm your Food Bridge concierge. How can I help you explore the world of flavors today?" }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async (text = input) => {
        const messageText = typeof text === 'string' ? text : input;
        if (!messageText.trim() || loading) return;

        const newMessages = [...messages, { role: 'user', content: messageText }];
        setMessages(newMessages);
        setInput('');
        setLoading(true);

        try {
            const response = await getGeminiResponse(messageText, newMessages);
            setMessages([...newMessages, { role: 'assistant', content: response }]);
        } catch (error) {
            setMessages([...newMessages, { role: 'assistant', content: "I'm having a bit of trouble connecting right now. Please try again in a moment." }]);
        } finally {
            setLoading(false);
        }
    };

    const quickActions = [
        "How does this work?",
        "What should I do here?",
        "Tell me about Flavor Parallels",
        "How do I filter recipes?"
    ];

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
                        className="fixed inset-0 bg-black/60 backdrop-blur-md z-[200]"
                    />

                    {/* Chat Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-[600px] bg-[#0A0A0C] border border-white/10 rounded-3xl z-[201] shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-[#B11226]/10 flex items-center justify-center border border-[#B11226]/20">
                                    <Sparkles className="text-[#B11226]" size={20} />
                                </div>
                                <div>
                                    <h3 className="text-white/90 font-display text-lg">AI Concierge</h3>
                                    <span className="text-[10px] text-white/30 uppercase tracking-widest">Powered by Gemini</span>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/40 hover:text-white">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                                            ? 'bg-[#B11226] text-white rounded-tr-none'
                                            : 'bg-white/5 text-white/80 border border-white/5 rounded-tl-none'
                                        }`}>
                                        {msg.content}
                                    </div>
                                </motion.div>
                            ))}
                            {loading && (
                                <div className="flex justify-start">
                                    <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5 flex space-x-1.5">
                                        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                                        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                                        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer / Input */}
                        <div className="p-6 bg-white/[0.01] border-t border-white/10">
                            {messages.length === 1 && (
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {quickActions.map(action => (
                                        <button
                                            key={action}
                                            onClick={() => handleSend(action)}
                                            className="text-[11px] text-white/40 hover:text-white border border-white/10 hover:border-white/30 px-3 py-1.5 rounded-full transition-all"
                                        >
                                            {action}
                                        </button>
                                    ))}
                                </div>
                            )}
                            <form
                                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                className="relative flex items-center"
                            >
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type your doubt here..."
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-5 pr-14 text-white/90 text-sm focus:outline-none focus:border-[#B11226] transition-all"
                                />
                                <button
                                    type="submit"
                                    disabled={loading || !input.trim()}
                                    className="absolute right-3 p-2 bg-[#B11226] text-white rounded-xl disabled:opacity-50 disabled:grayscale transition-all hover:bg-red-700"
                                >
                                    <Send size={18} />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default GeminiChat;
