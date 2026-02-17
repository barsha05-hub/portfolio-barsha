import { motion } from 'framer-motion';

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5 }
};

function Resume({ section }) {
    if (section === 'about') {
        return (
            <motion.div {...fadeInUp} className="space-y-8">
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start group">
                    {/* User Photo / Avatar */}
                    <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0 rounded-full p-0.5 bg-gradient-to-tr from-blue-500 via-violet-500 to-transparent relative overflow-hidden shadow-2xl shadow-blue-900/40">
                        <div className="w-full h-full rounded-full overflow-hidden bg-black flex items-center justify-center">
                            <img
                                src="/photo.jpg"
                                alt="Barsha Pradhan"
                                className="w-full h-full object-cover opacity-0 transition-opacity duration-300"
                                onLoad={(e) => e.target.classList.remove('opacity-0')}
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                }}
                            />
                            <div className="hidden absolute inset-0 items-center justify-center bg-gradient-to-br from-violet-900/40 to-black text-white/30 text-3xl font-thin tracking-widest font-sans">
                                BP
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        <h3 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">About Me</h3>
                        <p className="text-gray-300 leading-relaxed text-lg font-light tracking-wide">
                            Motivated <span className="text-blue-400 font-medium">Computer Science</span> undergraduate specializing in Data Science. I bridge the gap between complex backend logic and immersive, cinematic frontend experiences.
                        </p>

                        <h4 className="text-xl font-bold mt-10 mb-6 text-blue-300 flex items-center gap-3">
                            <span className="h-px w-8 bg-blue-500/50"></span>
                            Education
                        </h4>
                        <div className="p-6 border border-white/5 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors backdrop-blur-sm relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <p className="font-bold text-white text-xl relative z-10">National Institute of Science and Technology</p>
                            <p className="text-gray-400 mt-1 relative z-10">B.Tech in Computer Science Engineering (Data Science Specialization)</p>
                            <p className="text-sm text-gray-500 mt-4 font-mono relative z-10">Aug 2024 – Oct 2025 • Berhampur, Odisha</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    }

    if (section === 'experience') {
        return (
            <motion.div {...fadeInUp} className="space-y-10">
                <h3 className="text-4xl font-bold mb-6 text-white">Experience</h3>

                <div className="relative pl-8 border-l border-white/10 space-y-12">
                    <div className="relative group">
                        <span className="absolute -left-[41px] top-1.5 w-5 h-5 rounded-full bg-black border-4 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-300 group-hover:scale-125"></span>

                        <div className="bg-white/5 border border-white/5 p-8 rounded-3xl hover:bg-white/10 transition-all duration-500 hover:border-blue-500/30 group-hover:translate-x-2">
                            <h4 className="text-2xl font-bold text-white mb-1">Student Trainee</h4>
                            <p className="text-blue-400 text-sm mb-6 font-mono">Central Tool Room & Training Centre diff (CTTC) • July 2025</p>
                            <ul className="space-y-3 text-gray-300 font-light">
                                <li className="flex items-start gap-3">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                                    Completed technical training focused on programming and software development concepts.
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                                    Participated in hands-on coding sessions to strengthen analytical skills.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <h3 className="text-2xl font-bold mb-6 mt-12 text-white">Certifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
                    {['Python Course – CTTC', 'Python Workshop – AI Academia', 'Python 101 – IBM', 'C Essentials 1 – Cisco', 'Cybersecurity Analyst – Tata'].map((cert, i) => (
                        <div key={i} className="p-4 border border-white/5 rounded-xl bg-white/5 hover:bg-blue-900/20 hover:border-blue-500/30 transition-all duration-300 cursor-default">
                            {cert}
                        </div>
                    ))}
                </div>
            </motion.div>
        );
    }

    if (section === 'skills') {
        const skills = [
            { name: "C / C++", level: 85 },
            { name: "Python", level: 90 },
            { name: "Data Structures", level: 80 },
            { name: "React / Frontend", level: 75 },
            { name: "Networking", level: 70 },
            { name: "Git / GitHub", level: 85 }
        ];

        return (
            <motion.div {...fadeInUp} className="max-w-3xl">
                <h3 className="text-4xl font-bold mb-10 text-white">Technical Skills</h3>
                <div className="grid gap-8">
                    {skills.map((skill, index) => (
                        <div key={index} className="group">
                            <div className="flex justify-between mb-2">
                                <span className="text-lg text-gray-200 font-medium">{skill.name}</span>
                                <span className="text-blue-400 font-mono text-sm">{skill.level}%</span>
                            </div>
                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${skill.level}%` }}
                                    transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                                    className="h-full bg-gradient-to-r from-blue-600 to-violet-600 relative"
                                >
                                    <div className="absolute right-0 top-0 bottom-0 w-20 bg-white/20 blur-md" />
                                </motion.div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-12 flex flex-wrap gap-3">
                    {["MySQL", "VS Code", "Linux", "Windows", "Office Suite"].map((item, i) => (
                        <span key={i} className="px-4 py-2 border border-white/10 rounded-full text-sm text-gray-400">
                            {item}
                        </span>
                    ))}
                </div>
            </motion.div>
        );
    }

    if (section === 'contact') {
        return (
            <motion.div {...fadeInUp} className="space-y-12">
                <div>
                    <h3 className="text-4xl font-bold mb-4 text-white">Get in Touch</h3>
                    <p className="text-gray-400 text-lg max-w-xl font-light">
                        Ready to create something extraordinary? Feel free to reach out for collaborations or opportunities.
                    </p>
                </div>

                <div className="grid gap-6 max-w-lg">
                    <a href="mailto:barsha20pradhan10@gmail.com" className="p-8 border border-white/10 bg-white/5 rounded-3xl flex items-center justify-between group hover:bg-blue-600 hover:border-blue-500 transition-all duration-300">
                        <div className="flex flex-col">
                            <span className="text-xs text-blue-400 uppercase tracking-widest mb-1 group-hover:text-white/80 font-bold">Email</span>
                            <span className="text-xl text-white">barsha20pradhan10@gmail.com</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-blue-600 transition-colors">
                            →
                        </div>
                    </a>

                    <div className="p-8 border border-white/10 bg-white/5 rounded-3xl flex items-center justify-between group hover:border-white/30 transition-all duration-300">
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500 uppercase tracking-widest mb-1 font-bold">Phone</span>
                            <span className="text-xl text-white">9777272639</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <a href="#" className="py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-blue-600 hover:border-blue-500 text-center text-white transition-all font-medium">LinkedIn</a>
                        <a href="#" className="py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white hover:text-black text-center text-white transition-all font-medium">GitHub</a>
                    </div>
                </div>
            </motion.div>
        );
    }

    return null;
}

export default Resume;
