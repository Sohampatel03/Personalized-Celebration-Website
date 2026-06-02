import { useState } from "react";
import Confetti from "react-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { FaGift, FaHeart } from "react-icons/fa";

const FinalGift = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [candles, setCandles] = useState([true, true, true]); // State for 3 candles
  const [wish, setWish] = useState("");
  const [savedWish, setSavedWish] = useState(null);

  const blowCandle = (index) => {
    setCandles((prev) => {
      const next = [...prev];
      next[index] = false;
      return next;
    });
  };

  const allBlown = candles.every((c) => !c);

  const saveWish = (e) => {
    e.preventDefault();
    if (!wish.trim()) return;
    setSavedWish(wish);
  };

  return (
    <section className="min-h-screen py-24 flex flex-col items-center justify-center relative overflow-hidden bg-zinc-950">
      {/* Background neon glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-pink-500/10 to-purple-500/10 blur-[150px] rounded-full pointer-events-none" />

      {isOpen && (
        <Confetti
          numberOfPieces={allBlown ? 300 : 80}
          recycle={!allBlown}
          colors={["#f472b6", "#ec4899", "#d946ef", "#a855f7", "#ffffff"]}
        />
      )}

      <div className="relative z-10 max-w-2xl w-full px-6 flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* PHASE 1: PULSING 3D GIFT BOX */
            <motion.div
              key="sealed-box"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0, y: -50 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="text-center flex flex-col items-center"
            >
              <div className="mb-10 text-center">
                <span className="text-pink-400 font-semibold tracking-[4px] text-xs uppercase mb-3 block">
                  The Final Surprise
                </span>
                <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6">
                  Piya's Birthday Gift
                </h2>
                <p className="text-zinc-400 font-light max-w-md mx-auto">
                  A locked chest of magical sibling wishes. Tap on the glowing gift box to open the surprise!
                </p>
              </div>

              {/* Pulsing Glowing Gift Widget */}
              <motion.button
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-48 h-48 rounded-[32px] bg-gradient-to-tr from-pink-600 via-pink-500 to-purple-600 flex items-center justify-center border-2 border-pink-400/40 relative cursor-pointer shadow-[0_0_60px_rgba(236,72,153,0.5)] group"
              >
                {/* Radiant border circles */}
                <div className="absolute inset-0 rounded-[30px] border border-white/20 group-hover:scale-105 transition-transform duration-300" />
                <motion.div
                  animate={{
                    boxShadow: ["0 0 20px rgba(236,72,153,0.4)", "0 0 40px rgba(236,72,153,0.8)", "0 0 20px rgba(236,72,153,0.4)"]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-[30px] bg-transparent pointer-events-none"
                />

                <div className="flex flex-col items-center">
                  <FaGift size={56} className="text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)] group-hover:rotate-6 transition-transform duration-300" />
                  <span className="mt-4 text-xs font-bold text-white uppercase tracking-widest block">
                    Tap to Open
                  </span>
                </div>
              </motion.button>
            </motion.div>
          ) : (
            /* PHASE 2: EXPLODED DIGITAL CAKE & WISH BOARD */
            <motion.div
              key="opened-box"
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
              className="w-full text-center flex flex-col items-center bg-zinc-900/40 border border-zinc-800/80 p-8 md:p-12 rounded-[40px] backdrop-blur-xl shadow-2xl relative"
            >
              <div className="absolute top-4 right-4 text-xs text-pink-500 font-bold uppercase tracking-widest border border-pink-500/20 px-3 py-1 rounded-full bg-pink-500/5">
                🎉 Unlocked 🎉
              </div>

              {/* Title Header */}
              <h3 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-100 to-pink-300 drop-shadow-[0_0_15px_rgba(236,72,153,0.2)] mb-4">
                Make A Wish!
              </h3>
              
              <p className="text-zinc-400 text-sm md:text-base font-light mb-10 max-w-md">
                {!allBlown 
                  ? "Click on each burning candle below to blow them out and lock your happy wishes!" 
                  : "All candles blown out! Sibling wishes successfully delivered to the stars ✨"}
              </p>

              {/* 3D Cake CSS Representation */}
              <div className="relative w-[280px] h-[200px] flex flex-col items-center justify-end mb-16 mt-8">
                {/* CANDLES SECTION */}
                <div className="absolute -top-10 flex gap-10 z-20">
                  {candles.map((isOn, index) => (
                    <div key={index} className="flex flex-col items-center relative">
                      {/* Burning Flame */}
                      <AnimatePresence>
                        {isOn ? (
                          <motion.button
                            onClick={() => blowCandle(index)}
                            initial={{ scale: 0.8 }}
                            animate={{ scale: [1, 1.2, 1], y: [0, -2, 0] }}
                            exit={{ scale: 0, opacity: 0, y: -10 }}
                            transition={{ duration: 0.4 }}
                            className="w-5 h-8 bg-gradient-to-t from-orange-400 via-yellow-400 to-amber-300 rounded-full cursor-pointer shadow-[0_0_12px_#fbbf24] border border-amber-300 flex items-center justify-center animate-flicker"
                            style={{ transformOrigin: "bottom" }}
                          />
                        ) : (
                          /* Tiny smoke puff */
                          <motion.div
                            initial={{ opacity: 0.8, y: -2 }}
                            animate={{ opacity: 0, y: -20, scale: 1.5 }}
                            className="absolute w-2 h-2 rounded-full bg-zinc-500/40 pointer-events-none"
                          />
                        )}
                      </AnimatePresence>

                      {/* Candle Stick */}
                      <div className="w-2.5 h-12 bg-gradient-to-b from-pink-400 to-pink-600 rounded-full border border-pink-300 shadow-md" />
                    </div>
                  ))}
                </div>

                {/* Cake Tier 2 (Top Layer) */}
                <div className="w-[200px] h-[55px] bg-gradient-to-r from-pink-400 via-pink-300 to-pink-400 rounded-full border border-pink-200/50 shadow-md relative z-10 flex items-center justify-center">
                  <div className="absolute inset-x-2 bottom-2 top-2 rounded-full bg-zinc-950/10 pointer-events-none" />
                  <div className="absolute bottom-0 w-full h-[15px] bg-zinc-100/30 rounded-full" />
                </div>

                {/* Cake Tier 1 (Base Layer) */}
                <div className="w-[260px] h-[75px] bg-gradient-to-r from-purple-500 via-pink-400 to-purple-500 rounded-full border border-purple-300/40 shadow-xl relative -mt-3 z-0">
                  {/* Decorative frosting drips */}
                  <div className="absolute -bottom-1 inset-x-6 flex justify-between px-4 text-xs font-bold pointer-events-none text-zinc-100/40 font-mono">
                    <span>•</span>
                    <span>•</span>
                    <span>•</span>
                    <span>•</span>
                  </div>
                </div>

                {/* Cake Stand Plate */}
                <div className="w-[300px] h-[15px] bg-zinc-800 border border-zinc-700/80 rounded-full shadow-2xl -mt-1 relative z-[-1]" />
              </div>

              {/* SUCCESS STATE REVEAL */}
              <AnimatePresence>
                {allBlown && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="w-full flex flex-col items-center mt-4"
                  >
                    <div className="flex items-center gap-2 mb-4 text-pink-400 drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]">
                      <FaHeart className="animate-pulse" />
                      <span className="font-extrabold uppercase tracking-widest text-xs">
                        Wishes Locked Successfully
                      </span>
                      <FaHeart className="animate-pulse" />
                    </div>

                    <h4 className="text-2xl md:text-3xl font-extrabold text-white mb-8">
                      Happy Birthday Piya! ❤️
                    </h4>

                    {/* Sibling Wish Board / Guestbook */}
                    {!savedWish ? (
                      <motion.form
                        onSubmit={saveWish}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="w-full max-w-md flex gap-2 border border-zinc-800 bg-zinc-950 p-2 rounded-2xl"
                      >
                        <input
                          type="text"
                          value={wish}
                          onChange={(e) => setWish(e.target.value)}
                          placeholder="Type your secret birthday wish here..."
                          className="flex-1 bg-transparent px-4 py-2 text-sm text-zinc-200 outline-none border-none placeholder-zinc-600"
                        />
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 font-bold text-white text-xs uppercase tracking-wider cursor-pointer transition-colors shadow-md"
                        >
                          Lock Wish
                        </button>
                      </motion.form>
                    ) : (
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-full max-w-md bg-pink-500/5 border border-pink-500/20 p-6 rounded-3xl backdrop-blur text-center"
                      >
                        <span className="text-[10px] uppercase font-bold text-pink-400 tracking-widest block mb-2">
                          Your Sealed Secret Wish
                        </span>
                        <p className="text-zinc-200 italic font-light leading-relaxed">
                          "{savedWish}"
                        </p>
                        <span className="text-[9px] uppercase font-mono text-zinc-500 tracking-wider block mt-4">
                          Your wish has been cast into the sky...
                        </span>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FinalGift;