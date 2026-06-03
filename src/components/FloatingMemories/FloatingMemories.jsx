import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaHeart, FaChevronRight } from "react-icons/fa";

const memoriesList = [
  {
    image: "/images/gallery/gallery1.webp",
    title: "The Ultimate Bond",
    tag: "Sibling Love",
    desc: "Through every milestone, you've been my partner-in-crime, my worst critic, and my biggest supporter. Here's to our unbreakable bond!",
    rotation: -5, left: "4%", top: "12%",
  },
  {
    image: "/images/gallery/gallery2.webp",
    title: "Sweet Celebrations",
    tag: "Birthday Joy",
    desc: "That beautiful day filled with sweet treats, blowing candles, and making silent wishes for endless happiness. You deserve the world!",
    rotation: 4, left: "26%", top: "30%",
  },
  {
    image: "/images/gallery/gallery3.webp",
    title: "Candid Smiles",
    tag: "Laugh Out Loud",
    desc: "The best memories are the unplanned ones, captured with wide smiles, tears of joy, and hearts full of love. Keep laughing always!",
    rotation: -6, left: "47%", top: "8%",
  },
  {
    image: "/images/gallery/gallery4.webp",
    title: "Cozy Silly Chats",
    tag: "Late Nights",
    desc: "Comfort in the small things: sipping hot cocoa, discussing silly rumors, and sharing secrets that only siblings can ever understand.",
    rotation: 5, left: "66%", top: "34%",
  },
  {
    image: "/images/gallery/gallery5.webp",
    title: "Fairy Lights & Magic",
    tag: "Sparkle On",
    desc: "Under the warm golden glow of fairy lights, holding sparklers and looking ahead to a bright, sparkling future. The best is yet to come!",
    rotation: -4, left: "83%", top: "10%",
  },
];

const FloatingMemories = () => {
  const [activeMemory, setActiveMemory] = useState(null);

  return (
    <section className="relative min-h-screen py-20 overflow-hidden flex flex-col items-center justify-center"
      style={{ background: "linear-gradient(to bottom, var(--ink), #110912)" }}>

      {/* Ambient */}
      <div className="absolute top-1/3 left-1/4 w-72 md:w-96 h-72 md:h-96 rounded-full blur-[130px] pointer-events-none"
        style={{ background: "rgba(244,63,94,0.04)" }} />
      <div className="absolute bottom-1/4 right-1/3 w-60 md:w-72 h-60 md:h-72 rounded-full blur-[110px] pointer-events-none"
        style={{ background: "rgba(147,51,234,0.04)" }} />

      {/* Header */}
      <div className="text-center z-10 px-5 max-w-2xl mb-12 md:mb-40">
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="flex items-center justify-center gap-3 mb-4">
          <div className="w-8 h-px" style={{ background: "linear-gradient(to right, transparent, var(--rose))" }} />
          <span className="font-sans font-medium uppercase text-center"
            style={{ color: "var(--blush)", opacity: 0.65, fontSize: "clamp(0.55rem, 2vw, 0.68rem)", letterSpacing: "0.4em" }}>
            Click to reveal our secrets
          </span>
          <div className="w-8 h-px" style={{ background: "linear-gradient(to left, transparent, var(--rose))" }} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-display grad-blush glow-rose leading-none mb-4"
          style={{ fontSize: "clamp(2.4rem, 9vw, 6rem)", letterSpacing: "-0.02em" }}
        >
          Floating Memories
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 0.5 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="font-sans font-light leading-relaxed"
          style={{ color: "#c4a0aa", fontSize: "clamp(0.8rem, 3vw, 1rem)" }}>
          A scattered gallery of our most cherished snapshots. Tap any photo to read the story behind it.
        </motion.p>
      </div>

      {/* ── MOBILE: vertical card stack ── */}
      <div className="block md:hidden w-full relative z-10 px-5">
        <div className="flex flex-col gap-4 max-w-sm mx-auto">
          {memoriesList.map((memory, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.6 }}
              onClick={() => setActiveMemory(memory)}
              className="cursor-pointer active:scale-[0.98] transition-transform"
            >
              <div className="rounded-2xl overflow-hidden shadow-xl flex"
                style={{ background: "rgba(14,8,15,0.7)", border: "1px solid rgba(244,63,94,0.12)" }}>
                {/* Thumbnail */}
                <div className="w-28 shrink-0 h-24 overflow-hidden">
                  <img src={memory.image} alt={memory.title}
                    className="w-full h-full object-cover"
                    style={{ filter: "brightness(0.9) saturate(1.1)" }} />
                </div>
                {/* Text */}
                <div className="flex-1 px-4 py-3 flex flex-col justify-center">
                  <span className="font-sans font-bold uppercase block mb-1"
                    style={{ color: "var(--rose)", fontSize: "0.58rem", letterSpacing: "0.3em" }}>
                    {memory.tag}
                  </span>
                  <p className="font-serif font-semibold leading-tight"
                    style={{ color: "rgba(240,230,234,0.9)", fontSize: "0.95rem" }}>
                    {memory.title}
                  </p>
                  <div className="flex items-center gap-1 mt-2" style={{ color: "rgba(196,160,170,0.4)" }}>
                    <span className="font-sans text-[0.6rem]">Tap to read</span>
                    <FaChevronRight size={8} />
                  </div>
                </div>
              </div>
            </motion.div>
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
      <AnimatePresence>
        {activeMemory && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
            style={{ background: "rgba(8,3,10,0.9)", backdropFilter: "blur(20px)" }}
            onClick={() => setActiveMemory(null)}
          >
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 140, damping: 22 }}
              className="relative w-full md:max-w-3xl rounded-t-3xl md:rounded-3xl overflow-hidden shadow-2xl md:grid md:grid-cols-2"
              style={{ background: "#0e080f", border: "1px solid rgba(244,63,94,0.12)", maxHeight: "90vh" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Pull bar for mobile */}
              <div className="md:hidden flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
              </div>

              {/* Image */}
              <div className="h-52 md:h-auto relative">
                <img src={activeMemory.image} alt={activeMemory.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(14,8,15,0.8))" }} />
              </div>

              {/* Text */}
              <div className="p-6 md:p-10 flex flex-col justify-between overflow-y-auto" style={{ maxHeight: "45vh", minHeight: "12rem" }}>
                <div>
                  <span className="inline-block px-3 py-1 rounded-full mb-4"
                    style={{ color: "var(--rose)", background: "rgba(244,63,94,0.08)", border: "1px solid rgba(244,63,94,0.2)", fontSize: "0.62rem", fontFamily: "var(--font-sans)", fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase" }}>
                    {activeMemory.tag}
                  </span>
                  <h3 className="font-display leading-none mb-4 grad-rose"
                    style={{ fontSize: "clamp(1.5rem, 5vw, 2.4rem)" }}>
                    {activeMemory.title}
                  </h3>
                  <div className="w-8 h-px mb-4" style={{ background: "linear-gradient(to right, var(--rose), transparent)" }} />
                  <p className="font-serif font-light leading-relaxed text-justify"
                    style={{ color: "#c4a0aa", fontStyle: "italic", fontSize: "clamp(0.85rem, 2.5vw, 1rem)" }}>
                    {activeMemory.desc}
                  </p>
                </div>
                <div className="mt-6 pt-5 flex items-center justify-between font-sans text-xs"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.05)", color: "rgba(196,160,170,0.45)" }}>
                  <span className="flex items-center gap-1.5"><FaHeart style={{ color: "var(--rose)" }} size={10} /> To: Piya</span>
                  <span>From: Your Brother</span>
                </div>
              </div>

              <button onClick={() => setActiveMemory(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all duration-250"
                style={{ background: "rgba(14,8,15,0.85)", border: "1px solid rgba(244,63,94,0.2)" }}
                onTouchStart={e => e.currentTarget.style.background = "var(--rose)"}
                onTouchEnd={e => e.currentTarget.style.background = "rgba(14,8,15,0.85)"}
                onMouseEnter={e => e.currentTarget.style.background = "var(--rose)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(14,8,15,0.85)"}>
                <FaTimes size={13} color="#fff" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FloatingMemories;