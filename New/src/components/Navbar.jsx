import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useScroll } from 'framer-motion';

const Navbar = ({ onAskDoubt }) => {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const unsub = scrollY.onChange((latest) => {
            setIsScrolled(latest > 50);
        });
        return unsub;
    }, [scrollY]);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12 py-4 ${isScrolled ? 'bg-black/75 backdrop-blur-md' : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link to="/" className="text-white font-medium tracking-widest text-lg md:text-xl">
                    Food Bridge
                </Link>

                <div className="hidden md:flex items-center space-x-12">
                    {[
                        { name: 'Home', path: '/' },
                        { name: 'About', path: '/about' },
                        { name: 'Discover', path: '/recipes' },
                        { name: 'Flavor Twin', path: '#flavor-twin' },
                        { name: 'Food Translator', path: '#food-translator' }
                    ].map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`text-sm tracking-wide transition-colors relative group ${location.pathname === item.path ? 'text-white' : 'text-white/70 hover:text-white'
                                }`}
                        >
                            {item.name}
                            <span className={`absolute -bottom-1 left-0 h-px bg-accent-amber transition-all ${location.pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'
                                }`} />
                        </Link>
                    ))}
                </div>

                <button
                    onClick={onAskDoubt}
                    className="bg-accent-red hover:bg-red-700 text-white px-6 py-2 rounded-sm text-sm font-medium transition-transform active:scale-95"
                >
                    Ask a Doubt
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
