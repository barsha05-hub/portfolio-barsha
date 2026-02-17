import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, User, Briefcase, Zap, FolderOpen, Mail } from 'lucide-react';

const tabs = [
    { id: 'hero', label: 'Home', Icon: Home },
    { id: 'about', label: 'About', Icon: User },
    { id: 'experience', label: 'Exp', Icon: Briefcase },
    { id: 'skills', label: 'Skills', Icon: Zap },
    { id: 'projects', label: 'Work', Icon: FolderOpen },
    { id: 'contact', label: 'Contact', Icon: Mail },
];

function Navigation() {
    const [activeSection, setActiveSection] = useState('hero');
    const [hoveredTab, setHoveredTab] = useState(null);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 350; // Offset for better detection

            for (const tab of tabs) {
                const section = document.getElementById(tab.id);
                if (section) {
                    const offsetTop = section.offsetTop;
                    const height = section.offsetHeight;

                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
                        setActiveSection(tab.id);
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-[95vw] sm:max-w-fit">
            <nav
                className="glass-panel p-2 flex justify-between items-center rounded-full bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl overflow-x-auto custom-scrollbar"
                onMouseLeave={() => setHoveredTab(null)}
            >
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => scrollToSection(tab.id)}
                        onMouseEnter={() => setHoveredTab(tab.id)}
                        className={`relative px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 z-10 whitespace-nowrap flex items-center gap-2 group ${activeSection === tab.id ? 'text-white' : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        {/* Active Pill (Glowing Spotlight) */}
                        {activeSection === tab.id && (
                            <motion.div
                                layoutId="active-pill"
                                className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-violet-600/80 rounded-full -z-10 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            />
                        )}

                        {/* Hover Pill (Subtle Glass) */}
                        {hoveredTab === tab.id && activeSection !== tab.id && (
                            <motion.div
                                layoutId="hover-pill"
                                className="absolute inset-0 bg-white/10 rounded-full -z-10"
                                transition={{ duration: 0.2 }}
                            />
                        )}

                        <tab.Icon size={16} className={`relative z-10 transition-transform duration-300 ${activeSection === tab.id ? 'scale-110' : 'group-hover:scale-110'}`} />
                        <span className="relative z-10">{tab.label}</span>
                    </button>
                ))}
            </nav>
        </div>
    );
}

export default Navigation;
