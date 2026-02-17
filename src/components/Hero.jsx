import { motion } from 'framer-motion';
import { Mail, Linkedin, Github } from 'lucide-react';

function Hero() {
    return (
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-10">
            {/* Avatar / Character with Breathing Glow */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                    className="relative group cursor-pointer"
                >
                    <div className="w-40 h-40 lg:w-48 lg:h-48 rounded-full bg-gradient-to-br from-gray-800 to-black p-1 shadow-2xl shadow-blue-900/20 border border-white/10 relative z-10">
                        <div className="w-full h-full rounded-full overflow-hidden bg-black/50 backdrop-blur-md flex items-center justify-center relative">
                            {/* Try to load photo, fallback to stylish initials */}
                            <img
                                src="/photo.jpg"
                                alt="Barsha Pradhan"
                                className="w-full h-full object-cover opacity-0 transition-opacity duration-500"
                                onLoad={(e) => e.target.classList.remove('opacity-0')}
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                }}
                            />
                            <div className="hidden absolute inset-0 items-center justify-center bg-gradient-to-br from-violet-900/20 to-blue-900/20">
                                <span className="text-5xl font-thin text-white/80 tracking-widest font-sans">BP</span>
                            </div>
                        </div>
                    </div>

                    {/* Animated Glow Pulse */}
                    <div className="absolute inset-0 bg-blue-500/30 blur-3xl rounded-full -z-10 animate-pulse opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="space-y-4 relative"
            >
                {/* Ambient Light Behind Text */}
                <div className="absolute -left-10 top-0 w-20 h-20 bg-blue-500/20 blur-[50px] animate-pulse pointer-events-none" />

                <h1 className="text-6xl lg:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-gray-400">
                    Barsha<br />Pradhan
                </h1>
                <p className="pt-6 text-gray-400 max-w-md text-lg leading-relaxed font-light">
                    Quick learner with strong analytical skills and a proven ability to adapt in fast-paced environments.
                </p>
            </motion.div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="flex gap-6 pt-6"
            >
                {/* Primary Premium Button */}
                <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(59, 130, 246, 0.5)" }}
                    whileTap={{ scale: 0.95 }}
                    className="relative px-8 py-3.5 rounded-full overflow-hidden group bg-white text-black font-bold tracking-wide"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        Download CV <span className="text-xl">↓</span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-violet-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-white/50 skew-x-12 group-hover:animate-shine pointer-events-none" />
                </motion.button>

                {/* Social Buttons */}
                <div className="flex gap-3">
                    {[
                        { Icon: Mail, href: "#" },
                        { Icon: Linkedin, href: "#" },
                        { Icon: Github, href: "#" }
                    ].map((item, index) => (
                        <motion.a
                            key={index}
                            href={item.href}
                            whileHover={{ y: -5, backgroundColor: "rgba(59, 130, 246, 0.1)", borderColor: "rgba(59, 130, 246, 0.5)", color: "#60A5FA" }}
                            whileTap={{ scale: 0.9 }}
                            className="p-3.5 rounded-full border border-white/10 text-gray-400 transition-colors duration-300"
                        >
                            <item.Icon size={22} />
                        </motion.a>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}

export default Hero;
