import { useState } from "react";
import Confetti from "react-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { FaGift, FaHeart } from "react-icons/fa";

const FinalGift = () => {
  const [isOpen, setIsOpen]   = useState(false);
  const [candles, setCandles] = useState([true, true, true]);
  const [wish, setWish]       = useState("");
  const [savedWish, setSavedWish] = useState(null);

  const blowCandle = (i) => setCandles(p => { const n = [...p]; n[i] = false; return n; });
  const allBlown = candles.every(c => !c);
  const saveWish = (e) => { e.preventDefault(); if (wish.trim()) setSavedWish(wish); };

  return (
    <section className="min-h-screen py-16 md:py-24 flex flex-col items-center justify-center relative overflow-hidden px-5"
      style={{ background: "var(--ink)" }}>

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[170px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(244,63,94,0.06), rgba(147,51,234,0.04), transparent 70%)" }} />

      {isOpen && (
        <Confetti
          numberOfPieces={allBlown ? 280 : 70}
          recycle={!allBlown}
          colors={["#f43f5e","#fda4af","#c026d3","#9333ea","#fff1f2"]}
        />
      )}

      <div className="relative z-10 max-w-xl w-full flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div key="sealed"
              initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0, y: -24, filter: "blur(8px)" }}
              transition={{ type: "spring", stiffness: 90 }}
              className="text-center flex flex-col items-center w-full">

              {/* Header */}
              <div className="mb-8 md:mb-10">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-8 h-px" style={{ background: "linear-gradient(to right, transparent, var(--rose))" }} />
                  <span className="font-sans font-medium uppercase"
                    style={{ color: "var(--blush)", opacity: 0.65, fontSize: "clamp(0.55rem, 2vw, 0.68rem)", letterSpacing: "0.4em" }}>
                    The Final Surprise
                  </span>
                  <div className="w-8 h-px" style={{ background: "linear-gradient(to left, transparent, var(--rose))" }} />
                </div>
                <h2 className="font-display grad-blush glow-rose leading-none mb-4"
                  style={{ fontSize: "clamp(2.2rem, 8vw, 5rem)", letterSpacing: "-0.02em" }}>
                  Piya's Birthday Gift
                </h2>
                <p className="font-sans font-light leading-relaxed max-w-xs mx-auto"
                  style={{ color: "rgba(196,160,170,0.55)", fontSize: "clamp(0.8rem, 3vw, 0.9rem)" }}>
                  A locked chest of magical sibling wishes. Tap the glowing gift box!
                </p>
              </div>

              {/* Gift button — touch-sized */}
              <motion.button onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.93 }}
                className="relative flex items-center justify-center cursor-pointer group"
                style={{
                  width: "clamp(160px, 42vw, 192px)",
                  height: "clamp(160px, 42vw, 192px)",
                  borderRadius: "28px",
                  background: "linear-gradient(135deg, var(--rose) 0%, #c026d3 100%)",
                  border: "1px solid rgba(244,63,94,0.5)",
                  boxShadow: "0 0 55px rgba(244,63,94,0.32), 0 0 100px rgba(244,63,94,0.1), inset 0 1px 0 rgba(255,255,255,0.14)"
                }}>
                <motion.div animate={{ scale: [1, 1.38], opacity: [0.4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  className="absolute inset-0 rounded-[26px] border" style={{ borderColor: "rgba(244,63,94,0.5)" }} />
                <motion.div animate={{ scale: [1, 1.65], opacity: [0.2, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
                  className="absolute inset-0 rounded-[26px] border" style={{ borderColor: "rgba(244,63,94,0.3)" }} />
                <div className="flex flex-col items-center gap-3 relative z-10">
                  <FaGift size={48} color="#fff" className="group-hover:rotate-6 transition-transform duration-300 drop-shadow-lg" />
                  <span className="font-sans font-semibold text-white uppercase" style={{ fontSize: "0.6rem", letterSpacing: "0.38em" }}>Tap to Open</span>
                </div>
              </motion.button>
            </motion.div>

          ) : (
            <motion.div key="opened"
              initial={{ scale: 0.9, opacity: 0, y: 32 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 80, damping: 18 }}
              className="w-full text-center flex flex-col items-center relative overflow-hidden"
              style={{ padding: "clamp(24px,6vw,48px)", borderRadius: "28px", background: "rgba(14,8,15,0.7)", border: "1px solid rgba(244,63,94,0.12)", backdropFilter: "blur(24px)" }}>

              {/* Badge */}
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full font-sans font-bold uppercase"
                style={{ color: "var(--rose)", background: "rgba(244,63,94,0.08)", border: "1px solid rgba(244,63,94,0.2)", fontSize: "0.58rem", letterSpacing: "0.3em" }}>
                🎉 Unlocked
              </div>

              <h3 className="font-display grad-rose leading-none mb-3"
                style={{ fontSize: "clamp(1.9rem, 7vw, 3.5rem)", letterSpacing: "-0.01em" }}>
                Make A Wish!
              </h3>
              <p className="font-sans font-light mb-10 max-w-xs"
                style={{ color: "rgba(196,160,170,0.5)", fontSize: "clamp(0.78rem, 2.5vw, 0.9rem)" }}>
                {!allBlown ? "Tap each candle to blow it out!" : "All candles blown out! ✨"}
              </p>

              {/* ── CSS Cake — scales with vw ── */}
              <div className="relative flex flex-col items-center mb-12 md:mb-16"
                style={{ width: "clamp(220px, 70vw, 280px)" }}>

                {/* Candles */}
                <div className="flex gap-8 md:gap-10 mb-1 z-20">
                  {candles.map((isOn, index) => (
                    <div key={index} className="flex flex-col items-center relative">
                      <AnimatePresence>
                        {isOn ? (
                          <motion.button onClick={() => blowCandle(index)}
                            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0, y: -6 }} transition={{ duration: 0.3 }}
                            className="cursor-pointer animate-flicker"
                            style={{ width: "14px", height: "28px", borderRadius: "7px 7px 4px 4px", background: "linear-gradient(to top, #f97316, #facc15, #fef9c3)", boxShadow: "0 0 14px rgba(251,191,36,0.7)", border: "none", transformOrigin: "bottom" }} />
                        ) : (
                          <motion.div initial={{ opacity: 0.7, y: 0 }} animate={{ opacity: 0, y: -16, scale: 1.6 }}
                            className="absolute -top-2 rounded-full"
                            style={{ width: "6px", height: "6px", background: "rgba(147,51,234,0.3)" }} />
                        )}
                      </AnimatePresence>
                      <div style={{ width: "10px", height: "clamp(36px,10vw,48px)", background: "linear-gradient(to bottom, var(--blush), var(--rose))", borderRadius: "5px", border: "1px solid rgba(244,63,94,0.3)", boxShadow: "0 2px 6px rgba(244,63,94,0.2)" }} />
                    </div>
                  ))}
                </div>

                {/* Tier 2 */}
                <div className="rounded-full relative z-10 flex items-center justify-center overflow-hidden"
                  style={{ width: "75%", height: "clamp(42px,13vw,55px)", background: "linear-gradient(135deg, #fda4af, #f43f5e, #fda4af)", border: "1px solid rgba(253,164,175,0.4)", boxShadow: "0 -4px 18px rgba(244,63,94,0.2)" }}>
                  <div className="absolute bottom-0 w-full h-3 opacity-20 rounded-full" style={{ background: "rgba(255,255,255,0.5)" }} />
                </div>

                {/* Tier 1 */}
                <div className="rounded-full relative z-0 -mt-3"
                  style={{ width: "100%", height: "clamp(55px,17vw,75px)", background: "linear-gradient(135deg, #9333ea, #c026d3, #9333ea)", border: "1px solid rgba(147,51,234,0.4)", boxShadow: "0 8px 28px rgba(147,51,234,0.25)" }}>
                  <div className="absolute -top-1.5 inset-x-6 flex justify-between">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} style={{ width: "10px", height: "14px", borderRadius: "5px", background: "rgba(253,164,175,0.5)", boxShadow: "0 0 5px rgba(253,164,175,0.3)" }} />
                    ))}
                  </div>
                </div>

                {/* Stand */}
                <div className="rounded-full -mt-1" style={{ width: "110%", height: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.04)" }} />
              </div>

              {/* Wish state */}
              <AnimatePresence>
                {allBlown && (
                  <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="w-full flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-4" style={{ color: "var(--rose)" }}>
                      <FaHeart size={11} className="animate-pulse" />
                      <span className="font-sans font-semibold uppercase" style={{ fontSize: "0.6rem", letterSpacing: "0.38em" }}>Wishes Locked</span>
                      <FaHeart size={11} className="animate-pulse" />
                    </div>

                    <h4 className="font-display grad-blush mb-6" style={{ fontSize: "clamp(1.3rem, 5vw, 2rem)" }}>
                      Happy Birthday Piya! ❤️
                    </h4>

                    {!savedWish ? (
                      <motion.form onSubmit={saveWish} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="w-full max-w-sm flex gap-2 p-2 rounded-2xl"
                        style={{ background: "rgba(14,8,15,0.8)", border: "1px solid rgba(244,63,94,0.15)" }}>
                        <input type="text" value={wish} onChange={e => setWish(e.target.value)}
                          placeholder="Type your birthday wish…"
                          className="flex-1 bg-transparent outline-none border-none"
                          style={{ fontFamily: "var(--font-sans)", color: "rgba(240,230,234,0.8)", fontSize: "0.85rem", padding: "6px 12px" }} />
                        <button type="submit"
                          className="px-4 py-2 rounded-xl text-white cursor-pointer font-sans font-bold uppercase transition-opacity hover:opacity-90 active:opacity-80"
                          style={{ background: "linear-gradient(135deg, var(--rose), var(--plum))", fontSize: "0.6rem", letterSpacing: "0.25em", whiteSpace: "nowrap" }}>
                          Lock Wish
                        </button>
                      </motion.form>
                    ) : (
                      <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                        className="w-full max-w-sm p-6 rounded-3xl text-center"
                        style={{ background: "rgba(244,63,94,0.05)", border: "1px solid rgba(244,63,94,0.15)" }}>
                        <span className="font-sans uppercase block mb-2"
                          style={{ color: "var(--rose)", opacity: 0.65, fontSize: "0.58rem", letterSpacing: "0.35em" }}>
                          Your Sealed Secret Wish
                        </span>
                        <p className="font-serif italic leading-relaxed" style={{ color: "rgba(240,230,234,0.8)", fontSize: "0.95rem" }}>
                          "{savedWish}"
                        </p>
                        <span className="font-sans uppercase block mt-3" style={{ color: "rgba(196,160,170,0.35)", fontSize: "0.58rem", letterSpacing: "0.3em" }}>
                          Cast into the sky…
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