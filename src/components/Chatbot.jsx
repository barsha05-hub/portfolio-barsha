import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, Loader2 } from 'lucide-react';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: "Hi! I'm Barsha's AI Assistant. Ask me anything about her skills, experience, or projects!" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            // In development, we might hit the API directly if backend isn't running on same port
            // But since we are building for production, we assume /api/chat is relative
            const response = await fetch('http://localhost:3000/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage })
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();
            setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting to the server. Please try again later." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            <div className="fixed bottom-6 right-6 z-[100]">
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.95 }}
                            className="absolute bottom-20 right-0 w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                        >
                            {/* Header */}
                            <div className="p-4 border-b border-white/10 bg-gradient-to-r from-violet-900/50 to-blue-900/50 flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <Sparkles className="text-yellow-400" size={18} />
                                    <span className="font-bold text-white tracking-wide">AI Assistant</span>
                                </div>
                                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[#0A0A0A]/50">
                                {messages.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                                                    ? 'bg-blue-600/20 text-blue-100 border border-blue-500/30 rounded-br-none'
                                                    : 'bg-white/10 text-gray-200 border border-white/5 rounded-bl-none'
                                                }`}
                                        >
                                            {msg.content}
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex justify-start">
                                        <div className="bg-white/5 p-3 rounded-2xl rounded-bl-none border border-white/5 flex items-center gap-2">
                                            <Loader2 size={16} className="animate-spin text-blue-400" />
                                            <span className="text-xs text-gray-400">Thinking...</span>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input */}
                            <div className="p-4 border-t border-white/10 bg-black/40">
                                <div className="flex items-center gap-2 bg-white/5 rounded-full px-4 py-2 border border-white/10 focus-within:border-blue-500/50 transition-colors">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Ask about Barsha..."
                                        className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder-gray-500"
                                        disabled={isLoading}
                                    />
                                    <button
                                        onClick={sendMessage}
                                        disabled={isLoading || !input.trim()}
                                        className={`p-1.5 rounded-full transition-all ${input.trim()
                                                ? 'bg-blue-500 text-white hover:bg-blue-400'
                                                : 'bg-white/10 text-gray-500 cursor-not-allowed'
                                            }`}
                                    >
                                        <Send size={16} />
                                    </button>
                                </div>
                                <div className="text-center mt-2">
                                    <span className="text-[10px] text-gray-600">Powered by Groq AI</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Toggle Button */}
                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`flex items-center justify-center w-14 h-14 rounded-full shadow-lg shadow-blue-500/20 transition-all duration-300 ${isOpen ? 'bg-red-500/20 text-red-400 border border-red-500/50' : 'bg-gradient-to-r from-blue-600 to-violet-600 text-white border border-white/20'
                        }`}
                >
                    {isOpen ? <X size={24} /> : <MessageSquare size={24} fill="currentColor" />}
                </motion.button>
            </div>
        </>
    );
};

export default Chatbot;
