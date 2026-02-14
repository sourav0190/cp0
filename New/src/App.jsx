import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Recipes from './pages/Recipes';
import GeminiChat from './components/GeminiChat';

export default function App() {
    const [isChatOpen, setIsChatOpen] = useState(false);

    return (
        <div className="bg-primary selection:bg-accent-amber/30 min-h-screen">
            <Navbar onAskDoubt={() => setIsChatOpen(true)} />
            <div className="pt-0">
                <Routes>
                    <Route path="/" element={<Home onAskDoubt={() => setIsChatOpen(true)} />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/recipes" element={<Recipes />} />
                </Routes>
            </div>
            <Footer />
            <GeminiChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        </div>
    );
}
