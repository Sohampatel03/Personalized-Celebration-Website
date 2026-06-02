import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Loader = ({ onFinish }) => {
  const [count, setCount] = useState(3);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (count <= 0) {
      setShowWelcome(true);
      const finishTimer = setTimeout(() => {
        onFinish();
      }, 1600);
      return () => clearTimeout(finishTimer);
    }

    const timer = setTimeout(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, onFinish]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] bg-zinc-950 flex items-center justify-center overflow-hidden"
    >
      {/* Moving Ambient Radial Light Glow */}
      <motion.div 
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-pink-500/20 to-purple-500/20 blur-[120px]" 
      />

      <div className="relative z-10 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {!showWelcome ? (
            <motion.div
              key="countdown"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
              transition={{ duration: 0.4 }}
              className="relative flex items-center justify-center w-40 h-40"
            >
              {/* Outer Glowing Ring */}
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  className="stroke-zinc-800 fill-none"
                  strokeWidth="4"
                />
                <motion.circle
                  cx="80"
                  cy="80"
                  r="70"
                  className="stroke-pink-500 fill-none drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]"
                  strokeWidth="4"
                  strokeDasharray="440"
                  initial={{ strokeDashoffset: 440 }}
                  animate={{ strokeDashoffset: (3 - count) * (440 / 3) }}
                  transition={{ duration: 1, ease: "linear" }}
                />
              </svg>

              {/* Countdown Numbers */}
              <motion.h1
                key={count}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="text-7xl font-black font-sans text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 drop-shadow-[0_0_15px_rgba(236,72,153,0.3)]"
              >
                {count}
              </motion.h1>
            </motion.div>
          ) : (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 70, damping: 15 }}
              className="text-center px-4"
            >
              {/* Sibling Love Message Header */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 0.2 }}
                className="uppercase tracking-[8px] text-pink-400 text-xs font-semibold mb-4"
              >
                A Special Message For Piya
              </motion.p>
              
              <motion.h1 
                className="text-5xl md:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-100 to-pink-300 drop-shadow-[0_0_30px_rgba(236,72,153,0.4)]"
              >
                Happy Birthday
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 0.5 }}
                className="mt-4 text-sm md:text-base text-zinc-400 tracking-widest uppercase font-light"
              >
                Let's dive into your memories...
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Slide-out Curtains */}
      <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-zinc-950 -z-10 transition-transform duration-[1200ms] ease-[cubic-bezier(0.85,0,0.15,1)] translate-x-0" style={{ transform: showWelcome && count <= 0 ? 'translateX(-100%)' : 'none' }} />
      <div className="absolute top-0 bottom-0 right-0 w-1/2 bg-zinc-950 -z-10 transition-transform duration-[1200ms] ease-[cubic-bezier(0.85,0,0.15,1)] translate-x-0" style={{ transform: showWelcome && count <= 0 ? 'translateX(100%)' : 'none' }} />
    </motion.div>
  );
};

export default Loader;