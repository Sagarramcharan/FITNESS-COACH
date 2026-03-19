import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { chatWithCoach } from '../services/gemini';
import ReactMarkdown from 'react-markdown';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: 'Hi! I am your Fitness coach. How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await chatWithCoach(userMessage, messages);
      setMessages((prev) => [...prev, { role: 'model', text: response || 'Sorry, I encountered an error.' }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [...prev, { role: 'model', text: 'Sorry, I am having trouble connecting right now.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl border border-zinc-200 w-[350px] sm:w-[400px] h-[500px] flex flex-col mb-4 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-emerald-600 p-4 flex justify-between items-center text-white">
              <div className="flex items-center space-x-2">
                <Bot className="h-6 w-6" />
                <div>
                  <h3 className="font-bold text-sm">Fitness coach</h3>
                  <p className="text-[10px] opacity-80">Always active</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-emerald-700 p-1 rounded-full transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex max-w-[80%] space-x-2 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
                    <div className={`p-2 rounded-lg ${msg.role === 'user' ? 'bg-emerald-600 text-white' : 'bg-white border border-zinc-200 text-zinc-800 shadow-sm'}`}>
                      <div className="text-sm prose prose-sm max-w-none prose-emerald">
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-zinc-200 p-3 rounded-2xl shadow-sm">
                    <Loader2 className="h-4 w-4 animate-spin text-emerald-600" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-zinc-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask anything..."
                  className="flex-1 bg-zinc-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="bg-emerald-600 text-white p-2 rounded-full hover:bg-emerald-700 disabled:opacity-50 transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-emerald-600 text-white p-4 rounded-full shadow-lg hover:bg-emerald-700 transition-all hover:scale-110 active:scale-95 flex items-center justify-center"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
};

export default Chatbot;
