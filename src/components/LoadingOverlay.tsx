import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2, Zap, Utensils, Dumbbell, Brain } from 'lucide-react';

const messages = [
  { text: "Analyzing your fitness profile...", icon: Brain },
  { text: "Calculating your daily caloric needs...", icon: Zap },
  { text: "Crafting your 7-day workout routine...", icon: Dumbbell },
  { text: "Designing your personalized diet plan...", icon: Utensils },
  { text: "Balancing macronutrients for your goal...", icon: Zap },
  { text: "Almost there! Finalizing your plan...", icon: Brain },
];

interface LoadingOverlayProps {
  isVisible: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isVisible }) => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md"
        >
          <div className="max-w-md w-full px-6 text-center">
            <div className="relative mb-8 flex justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                {React.createElement(messages[messageIndex].icon, {
                  className: "h-8 w-8 text-emerald-400",
                })}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={messageIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  {messages[messageIndex].text}
                </h2>
                <p className="text-zinc-400 text-sm font-medium">
                  Our AI is processing a lot of data to ensure your plan is perfectly tailored to your body and goals.
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-12 flex justify-center space-x-2">
              {messages.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === messageIndex ? "w-8 bg-emerald-500" : "w-2 bg-white/10"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingOverlay;
