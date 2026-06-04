import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TOTAL = 3;

const Loader = ({ onFinish }) => {
  const [count, setCount] = useState(TOTAL);
  const [showWelcome, setShowWelcome] = useState(false);
  const [curtainOpen, setCurtainOpen] = useState(false);

  useEffect(() => {
    if (count <= 0) {
      setShowWelcome(true);
      const t1 = setTimeout(() => setCurtainOpen(true), 500);
      const t2 = setTimeout(() => onFinish(), 2400);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
    const t = setTimeout(() => setCount((p) => p - 1), 1000);
    return () => clearTimeout(t);
  }, [count, onFinish]);

  const circumference = 2 * Math.PI * 52;
  // elapsed ticks: when count=3 → 0 elapsed, count=2 → 1, count=1 → 2, count=0 → 3
  const elapsed = TOTAL - count;
  const progress = (elapsed / TOTAL) * circumference;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{ background: "var(--ink)" }}
    >
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 80% 60% at 20% 20%, rgba(244,63,94,0.1) 0%, transparent 55%),
          radial-gradient(ellipse 70% 70% at 80% 80%, rgba(147,51,234,0.09) 0%, transparent 55%)
        `
      }} />

      {/* Decorative rotating rings */}
      <div className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ border: "1px solid rgba(244,63,94,0.06)", animation: "spin-slow 40s linear infinite" }} />
      <div className="absolute w-[340px] h-[340px] rounded-full pointer-events-none"
        style={{ border: "1px solid rgba(147,51,234,0.06)", animation: "spin-slow 26s linear infinite reverse" }} />

      {/* Main content */}
      <div className="relative z-30 flex flex-col items-center px-6">
        <AnimatePresence mode="wait">
          {!showWelcome ? (
            /* ── PHASE 1: COUNTDOWN ── */
            <motion.div
              key="countdown"
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.3, filter: "blur(16px)" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-8 md:gap-10"
            >
              <motion.p
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 0.55, y: 0 }}
                transition={{ delay: 0.15 }}
                className="font-sans font-medium uppercase text-center"
                style={{ color: "var(--blush)", fontSize: "clamp(0.6rem, 2vw, 0.7rem)", letterSpacing: "0.45em" }}
              >
                Loading your memories
              </motion.p>

              {/* Ring + number */}
              <div className="relative flex items-center justify-center"
                style={{ width: "clamp(140px, 38vw, 176px)", height: "clamp(140px, 38vw, 176px)" }}>

                {/* Pulse ring */}
                <motion.div
                  animate={{ scale: [1, 1.35], opacity: [0.45, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                  className="absolute inset-0 rounded-full"
                  style={{ border: "1px solid rgba(244,63,94,0.4)" }}
                />

                {/* SVG progress arc */}
                <svg
                  className="absolute inset-0 -rotate-90"
                  style={{ width: "100%", height: "100%" }}
                  viewBox="0 0 120 120"
                >
                  <defs>
                    <linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f43f5e" />
                      <stop offset="100%" stopColor="#c026d3" />
                    </linearGradient>
                  </defs>

                  {/* Track */}
                  <circle cx="60" cy="60" r="52" fill="none"
                    stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" />

                  {/* Glow copy */}
                  <circle cx="60" cy="60" r="52" fill="none"
                    stroke="rgba(244,63,94,0.2)" strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - progress}
                    style={{ filter: "blur(5px)", transition: "stroke-dashoffset 0.85s linear" }}
                  />

                  {/* Crisp arc */}
                  <circle cx="60" cy="60" r="52" fill="none"
                    stroke="url(#rg)" strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - progress}
                    style={{ transition: "stroke-dashoffset 0.85s linear" }}
                  />
                </svg>

                {/* Countdown digit */}
                <AnimatePresence mode="wait">
                  <motion.span
                    key={count}
                    initial={{ opacity: 0, y: 18, scale: 0.75 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -18, scale: 1.15 }}
                    transition={{ duration: 0.28 }}
                    className="font-display grad-rose select-none"
                    style={{ fontSize: "clamp(4rem, 14vw, 5.5rem)", lineHeight: 1 }}
                  >
                    {count}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Dot trio */}
              <div className="flex gap-2.5">
                {[0, 1, 2].map((i) => (
                  <motion.div key={i}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.25 }}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: i === 0 ? "var(--rose)" : i === 1 ? "var(--blush)" : "var(--plum)" }}
                  />
                ))}
              </div>
            </motion.div>

          ) : (
            /* ── PHASE 2: WELCOME ── */
            <motion.div
              key="welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="text-center flex flex-col items-center gap-5"
            >
              <motion.div
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="w-20 h-px"
                style={{ background: "linear-gradient(90deg, transparent, var(--rose), transparent)" }}
              />
              <motion.p
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 0.55, y: 0 }}
                transition={{ delay: 0.12 }}
                className="font-sans font-medium uppercase"
                style={{ color: "var(--blush)", fontSize: "clamp(0.55rem, 2vw, 0.68rem)", letterSpacing: "0.45em" }}
              >
                A special message for Piya
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="font-display grad-blush glow-rose leading-none"
                style={{ fontSize: "clamp(2.8rem, 10vw, 6.5rem)", letterSpacing: "-0.01em" }}
              >
                Happy Birthday Piyu
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 0.45 }}
                transition={{ delay: 0.45 }}
                className="font-sans font-light uppercase tracking-widest"
                style={{ color: "#c4a0aa", fontSize: "clamp(0.6rem, 2vw, 0.75rem)" }}
              >
                Let the memories unfold…
              </motion.p>
              <motion.div
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ delay: 0.55, duration: 0.8 }}
                className="w-20 h-px"
                style={{ background: "linear-gradient(90deg, transparent, var(--plum), transparent)" }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Curtain panels */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: curtainOpen ? "-100%" : "0%" }}
        transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-y-0 left-0 w-1/2 z-20 pointer-events-none"
        style={{ background: "var(--ink)" }}
      />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: curtainOpen ? "100%" : "0%" }}
        transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-y-0 right-0 w-1/2 z-20 pointer-events-none"
        style={{ background: "var(--ink)" }}
      />
    </motion.div>
  );
};

export default Loader;