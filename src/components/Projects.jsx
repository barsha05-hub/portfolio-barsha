import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { X } from 'lucide-react';

const projects = [
    {
        id: 1,
        title: 'E-Commerce Dashboard',
        category: 'Web Application',
        description: 'A comprehensive analytics dashboard for online retailers featuring real-time data visualization.',
        image: 'bg-gradient-to-br from-violet-900 to-blue-900'
    },
    {
        id: 2,
        title: 'Fintech Mobile App',
        category: 'UI/UX Design',
        description: 'User-centered design for a modern banking application focusing on accessibility and security.',
        image: 'bg-gradient-to-br from-emerald-900 to-teal-900'
    },
    {
        id: 3,
        title: 'AI Image Generator',
        category: 'Machine Learning',
        description: 'Interface design for a generative AI tool allowing users to create custom artwork.',
        image: 'bg-gradient-to-br from-pink-900 to-rose-900'
    }
];

// 3D Tilt Card Component
const ProjectCard = ({ project, onClick }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);

    return (
        <motion.div
            style={{ x, y, rotateX, rotateY, z: 100 }}
            drag
            dragElastic={0.16}
            dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
            whileHover={{ cursor: 'pointer' }}
            onClick={() => onClick(project)}
            className="group relative h-96 rounded-3xl bg-white/5 border border-white/10 overflow-hidden transform-gpu perspective-1000 shadow-2xl"
        >
            {/* Background Image Placeholder */}
            <div className={`absolute inset-0 ${project.image} opacity-40 group-hover:opacity-60 transition-opacity duration-500`} />

            {/* Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black via-black/40 to-transparent">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-xs font-bold text-blue-400 mb-2 uppercase tracking-widest"
                >
                    {project.category}
                </motion.span>
                <h3 className="text-4xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">{project.title}</h3>
                <p className="text-gray-300 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                    {project.description}
                </p>
            </div>

            {/* Hover Reveal Button */}
            <div className="absolute top-6 right-6 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-md bg-white/10 group-hover:scale-110">
                <span className="text-white text-xl">↗</span>
            </div>
        </motion.div>
    );
};

function Projects() {
    const [selectedId, setSelectedId] = useState(null);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-10">

                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} onClick={setSelectedId} />
                ))}
            </div>

            <AnimatePresence>
                {selectedId && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10 bg-black/90 backdrop-blur-xl"
                        onClick={() => setSelectedId(null)}
                    >
                        <motion.div
                            layoutId={selectedId.id}
                            className="w-full max-w-5xl max-h-full overflow-y-auto bg-[#0A0A0A] border border-white/10 rounded-3xl relative shadow-2xl shadow-blue-900/40 custom-scrollbar"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedId(null)}
                                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
                            >
                                <X className="text-white" />
                            </button>

                            <div className="h-64 sm:h-96 bg-gradient-to-r from-blue-900 via-violet-900 to-black relative">
                                <div className="absolute bottom-0 left-0 p-8 sm:p-12">
                                    <span className="px-4 py-1.5 rounded-full border border-blue-400/30 text-blue-400 text-xs font-bold uppercase tracking-widest bg-blue-900/20 backdrop-blur-md">
                                        {selectedId.category}
                                    </span>
                                    <h2 className="text-5xl lg:text-7xl font-bold text-white mt-4 mb-2">{selectedId.title}</h2>
                                </div>
                            </div>

                            <div className="p-8 sm:p-12 space-y-10">
                                <p className="text-2xl text-gray-300 leading-relaxed font-light border-l-4 border-blue-500 pl-6">
                                    {selectedId.description}
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-8 border-t border-white/5">
                                    <div>
                                        <h4 className="text-white text-xl font-bold mb-4">Problem Statement</h4>
                                        <p className="text-gray-400 leading-relaxed">
                                            Designing a user interface that balances complexity with usability was the primary challenge. The goal was to reduce cognitive load while providing deep analytical tools for power users who need real-time data.
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="text-white text-xl font-bold mb-4">The Solution</h4>
                                        <p className="text-gray-400 leading-relaxed">
                                            By utilizing a modular component system and clean data visualization patterns, we achieved a significant reduction in time-to-insight. The interface adapts to different screen sizes while maintaining full functionality.
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-8 flex justify-center">
                                    <button className="px-10 py-4 rounded-full bg-blue-600 text-white font-bold tracking-wide hover:bg-blue-500 hover:scale-105 transition-all shadow-lg shadow-blue-600/30">
                                        Launch Project
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default Projects;
