import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaHeart, FaChevronRight } from "react-icons/fa";

const memoriesList = [
  {
    image: "/images/gallery/born.webp",
    title: "The Day You Arrived",
    tag: "A New Beginning",
    desc: "The day our family became brighter, happier, and more complete. From the moment you arrived, you filled our lives with endless smiles, precious memories, and a love that only grew stronger with every passing year.",
    rotation: -5, left: "4%", top: "12%",
  },
  {
    image: "/images/gallery/gallery1.webp",
    title: "Daddy's Little Princess",
    tag: "Father & Daughter",
    desc: "A bond built on protection, guidance, and unconditional love. No matter how much time passes, you'll always be the little girl who can make Dad's toughest days better with just one smile.",
    rotation: 4, left: "26%", top: "30%",
  },
  {
    image: "/images/gallery/gallery36.webp",
    title: "Like Mother, Like Daughter",
    tag: "Pure Love",
    desc: "Wrapped in a mother's warmth and endless care, this moment reflects a love that asks for nothing in return. Through every challenge and every celebration, her heart has always been your safest home.",
    rotation: -6, left: "47%", top: "8%",
  },
  {
    image: "/images/gallery/gallery5.webp",
    title: "Laughter That Lasts Forever",
    tag: "Family Moments",
    desc: "Some memories are priceless because they capture everyone together. The laughter, the jokes, and the happiness shared in this moment remind us that family is where life's most beautiful stories begin.",
    rotation: 5, left: "66%", top: "34%",
  },
  {
    image: "/images/gallery/gallery4.webp",
    title: "Midnight Memories",
    tag: "Cousin Chronicles",
    desc: "Late-night conversations, endless laughter, and stories that somehow felt funnier after midnight. These are the moments that turn cousins into best friends and ordinary nights into unforgettable memories.",
    rotation: -4, left: "83%", top: "10%",
  },
];

const FloatingMemories = () => {
  const [activeMemory, setActiveMemory] = useState(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeMemory) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      window.lenis?.stop();
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      window.lenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      window.lenis?.start();
    };
  }, [activeMemory]);

  return (
    <section className="relative min-h-screen py-16 md:py-20 overflow-hidden flex flex-col items-center justify-center perform-contain"
      style={{ background: "linear-gradient(to bottom, var(--ink), #110912)" }}>

      {/* Ambient */}
      <div className="absolute top-1/3 left-1/4 w-72 md:w-96 h-72 md:h-96 rounded-full blur-[130px] pointer-events-none"
        style={{ background: "rgba(244,63,94,0.04)" }} />
      <div className="absolute bottom-1/4 right-1/3 w-60 md:w-72 h-60 md:h-72 rounded-full blur-[110px] pointer-events-none"
        style={{ background: "rgba(147,51,234,0.04)" }} />

      {/* Header */}
      <div className="text-center z-10 px-5 max-w-2xl mb-9 md:mb-40">
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="flex items-center justify-center gap-3 mb-4">
          <div className="w-8 h-px" style={{ background: "linear-gradient(to right, transparent, var(--rose))" }} />
          <span className="font-sans font-medium uppercase text-center"
            style={{ color: "var(--blush)", opacity: 0.65, fontSize: "clamp(0.55rem, 2vw, 0.68rem)", letterSpacing: "0.4em" }}>
            Little frames of us
          </span>
          <div className="w-8 h-px" style={{ background: "linear-gradient(to left, transparent, var(--rose))" }} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-display grad-blush glow-rose leading-none mb-4"
          style={{ fontSize: "clamp(2.4rem, 9vw, 6rem)", letterSpacing: "-0.02em" }}>
          Floating Memories
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 0.5 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="font-sans font-light leading-relaxed"
          style={{ color: "#c4a0aa", fontSize: "clamp(0.8rem, 3vw, 1rem)" }}>
          A scattered gallery of our most cherished snapshots, stitched together with laughter and birthday warmth.
        </motion.p>
      </div>

      {/* ── MOBILE: vertical card stack ── */}
      <div className="block md:hidden w-full relative z-10">
        <div
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-5 pb-8"
          style={{
            scrollbarWidth: "none",
            WebkitMaskImage: "linear-gradient(to right, transparent 0, black 20px, black calc(100% - 20px), transparent 100%)",
            maskImage: "linear-gradient(to right, transparent 0, black 20px, black calc(100% - 20px), transparent 100%)",
          }}
        >
          {memoriesList.map((memory, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                opacity: { delay: index * 0.08, duration: 0.72, ease: [0.16, 1, 0.3, 1] },
                scale: { delay: index * 0.08, duration: 0.72, ease: [0.16, 1, 0.3, 1] },
                y: { delay: index * 0.18, duration: 4.8, repeat: Infinity, ease: "easeInOut" },
              }}
              animate={{ y: [0, index % 2 === 0 ? -5 : 5, 0] }}
              whileTap={{ scale: 0.975 }}
              onClick={() => setActiveMemory(memory)}
              className="snap-center shrink-0 w-[82vw] max-w-[330px] cursor-pointer text-left"
            >
              {/* Improved mobile card */}
              <div className="relative overflow-hidden rounded-[26px] shadow-[0_24px_70px_rgba(0,0,0,0.46)]"
                style={{
                  background: "linear-gradient(145deg, rgba(24,12,26,0.92), rgba(10,5,12,0.98))",
                  border: "1px solid rgba(253,164,175,0.14)",
                  backdropFilter: "blur(18px)",
                }}>
                <div className="absolute inset-x-8 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(253,164,175,0.55), transparent)" }} />
                {/* Top image strip */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img src={memory.image} alt={memory.title}
                    className="w-full h-full object-cover"
                    style={{ filter: "brightness(0.82) saturate(1.12)" }} />
                  {/* gradient overlay */}
                  <div className="absolute inset-0"
                    style={{ background: "linear-gradient(to bottom, rgba(8,3,10,0.05) 0%, rgba(8,3,10,0.2) 45%, rgba(8,3,10,0.96) 100%)" }} />
                  {/* Tag badge */}
                  <div className="absolute top-3 left-3">
                    <span className="font-sans font-bold uppercase px-3 py-1.5 rounded-full"
                      style={{
                        background: "rgba(8,3,10,0.5)",
                        border: "1px solid rgba(253,164,175,0.22)",
                        color: "var(--blush)",
                        fontSize: "0.56rem",
                        letterSpacing: "0.28em",
                        backdropFilter: "blur(10px)",
                      }}>
                      {memory.tag}
                    </span>
                  </div>
                  {/* Number */}
                  <div className="absolute top-3 right-3 font-display"
                    style={{ color: "rgba(255,241,242,0.62)", fontSize: "1.55rem", fontWeight: 400 }}>
                    0{index + 1}
                  </div>
                </div>

                {/* Bottom text area */}
                <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between gap-4">
                  <div>
                    <p className="font-serif font-semibold leading-none mb-2"
                      style={{ color: "rgba(255,241,242,0.95)", fontSize: "clamp(1.35rem, 7vw, 1.9rem)" }}>
                      {memory.title}
                    </p>
                    <p className="font-sans font-light leading-relaxed"
                      style={{
                        color: "rgba(253,164,175,0.64)",
                        fontSize: "0.76rem",
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}>
                      {memory.desc}
                    </p>
                  </div>
                  <div className="flex items-center justify-center rounded-full shrink-0"
                    style={{
                      width: "42px", height: "42px",
                      background: "linear-gradient(135deg, var(--rose), var(--plum))",
                      boxShadow: "0 10px 28px rgba(244,63,94,0.34)",
                    }}>
                    <FaChevronRight size={12} color="#fff" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center gap-2">
          {memoriesList.map((memory, index) => (
            <span key={memory.title} className="h-1.5 rounded-full"
              style={{ width: index === 0 ? "22px" : "6px", background: index === 0 ? "var(--rose)" : "rgba(253,164,175,0.22)" }} />
          ))}
        </div>
      </div>

      {/* ── DESKTOP: scattered polaroids ── */}
      <div className="hidden md:block relative w-full max-w-7xl h-[580px] px-8 z-10">
        {memoriesList.map((memory, index) => (
          <motion.div key={index}
            className="absolute cursor-pointer group"
            style={{ left: memory.left, top: memory.top }}
            initial={{ opacity: 0, y: 40, scale: 0.88 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.07, rotate: memory.rotation * 0.3, zIndex: 40, transition: { duration: 0.3 } }}
            onClick={() => setActiveMemory(memory)}
          >
            <div className="p-3.5 pb-12 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] flex flex-col items-center w-56 transition-all duration-300 group-hover:shadow-[0_30px_80px_rgba(244,63,94,0.15)]"
              style={{ transform: `rotate(${memory.rotation}deg)`, background: "#fef8f8", border: "1px solid rgba(244,63,94,0.08)" }}>
              <div className="relative w-full h-44 rounded-xl overflow-hidden bg-zinc-200">
                <img src={memory.image} alt={memory.title}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                  style={{ filter: "brightness(0.97) saturate(1.05)" }} />
              </div>
              <div className="mt-4 text-center px-1">
                <span className="font-sans font-bold uppercase block mb-1.5"
                  style={{ color: "var(--rose)", fontSize: "0.58rem", letterSpacing: "0.35em" }}>
                  {memory.tag}
                </span>
                <p className="font-serif font-semibold text-zinc-800 text-sm leading-tight">{memory.title}</p>
              </div>
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-5 rounded-sm opacity-40 group-hover:opacity-60 transition-opacity"
                style={{ background: "rgba(244,63,94,0.25)", transform: `translateX(-50%) rotate(${-memory.rotation * 0.5}deg)` }} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox modal */}
      {createPortal(
        <AnimatePresence>
          {activeMemory && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center"
              style={{ background: "rgba(8,3,10,0.92)", backdropFilter: "blur(20px)" }}
              onClick={() => setActiveMemory(null)}
            >
              <motion.div
                initial={{ y: "100%", opacity: 0, scale: 0.98 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: "100%", opacity: 0, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 170, damping: 24 }}
                className="relative w-full md:max-w-3xl rounded-t-[30px] md:rounded-3xl overflow-y-auto md:overflow-hidden shadow-2xl md:grid md:grid-cols-2"
                style={{ background: "linear-gradient(145deg, #120913, #08030a)", border: "1px solid rgba(253,164,175,0.16)", maxHeight: "90vh" }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Decorative top gradient */}
                <div className="absolute top-0 inset-x-0 h-1 pointer-events-none"
                  style={{ background: "linear-gradient(90deg, var(--rose), var(--plum))" }} />

                {/* Pull bar for mobile */}
                <div className="md:hidden flex justify-center pt-4 pb-2">
                  <div className="w-10 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.18)" }} />
                </div>

                {/* Image */}
                <div className="relative shrink-0" style={{ height: "clamp(220px, 48vw, 380px)" }}>
                  <img src={activeMemory.image} alt={activeMemory.title} className="w-full h-full object-cover" />
                  {/* Gradient overlay bottom */}
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 45%, rgba(14,8,15,0.85))" }} />
                  {/* Tag on image */}
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-block px-3 py-1 rounded-full font-sans font-bold uppercase"
                      style={{ color: "var(--rose)", background: "rgba(244,63,94,0.12)", border: "1px solid rgba(244,63,94,0.25)", fontSize: "0.6rem", letterSpacing: "0.35em", backdropFilter: "blur(8px)" }}>
                      {activeMemory.tag}
                    </span>
                  </div>
                </div>

                {/* Text */}
                <div className="flex flex-col justify-between md:overflow-y-auto md:max-h-[380px]"
                  style={{ padding: "clamp(20px,5vw,36px)" }}>
                  <div>
                    <h3 className="font-display leading-none mb-4 grad-rose"
                      style={{ fontSize: "clamp(1.8rem, 8vw, 2.6rem)" }}>
                      {activeMemory.title}
                    </h3>
                    <div className="w-10 h-px mb-5" style={{ background: "linear-gradient(to right, var(--rose), transparent)" }} />
                    <p className="font-serif font-light leading-[1.85] text-justify"
                      style={{ color: "rgba(196,160,170,0.82)", fontStyle: "italic", fontSize: "clamp(0.88rem, 2.5vw, 1.02rem)" }}>
                      {activeMemory.desc}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="mt-6 pt-5 flex items-center justify-between font-sans text-xs"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.06)", color: "rgba(196,160,170,0.4)" }}>
                    <span className="flex items-center gap-1.5">
                      <FaHeart style={{ color: "var(--rose)" }} size={10} className="animate-pulse" />
                      To: Piya
                    </span>
                    <span>From: Your Brother</span>
                  </div>
                </div>

                {/* Close button */}
                <button onClick={() => setActiveMemory(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all duration-250 z-10"
                  style={{ background: "rgba(14,8,15,0.85)", border: "1px solid rgba(244,63,94,0.25)" }}
                  onTouchStart={e => e.currentTarget.style.background = "var(--rose)"}
                  onTouchEnd={e => e.currentTarget.style.background = "rgba(14,8,15,0.85)"}
                  onMouseEnter={e => e.currentTarget.style.background = "var(--rose)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(14,8,15,0.85)"}>
                  <FaTimes size={13} color="#fff" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};

export default FloatingMemories;
