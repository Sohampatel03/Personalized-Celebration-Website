import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaHeart, FaChevronRight } from "react-icons/fa";

const memoriesList = [
  {
    image: "/images/gallery/gallery1.webp",
    title: "The Ultimate Bond",
    tag: "Sibling Love",
    desc: "Through every milestone, you've been my partner-in-crime, my worst critic, and my biggest supporter. Here's to our unbreakable bond!",
    rotation: -4,
    left: "5%",
    top: "15%",
  },
  {
    image: "/images/gallery/gallery2.webp",
    title: "Sweet Celebrations",
    tag: "Birthday Joy",
    desc: "That beautiful day filled with sweet treats, blowing candles, and making silent wishes for endless happiness. You deserve the world!",
    rotation: 4,
    left: "28%",
    top: "35%",
  },
  {
    image: "/images/gallery/gallery3.webp",
    title: "Candid Smiles",
    tag: "Laugh Out Loud",
    desc: "The best memories are the unplanned ones, captured with wide smiles, tears of joy, and hearts full of love. Keep laughing always!",
    rotation: -6,
    left: "48%",
    top: "12%",
  },
  {
    image: "/images/gallery/gallery4.webp",
    title: "Cozy Silly Chats",
    tag: "Late Nights",
    desc: "Comfort in the small things: sipping hot cocoa, discussing silly rumors, and sharing secrets that only siblings can ever understand.",
    rotation: 5,
    left: "68%",
    top: "38%",
  },
  {
    image: "/images/gallery/gallery5.webp",
    title: "Fairy Lights & Magic",
    tag: "Sparkle On",
    desc: "Under the warm golden glow of fairy lights, holding sparklers and looking ahead to a bright, sparkling future. The best is yet to come!",
    rotation: -3,
    left: "85%",
    top: "15%",
  },
];

const FloatingMemories = () => {
  const [activeMemory, setActiveMemory] = useState(null);

  return (
    <section className="relative min-h-screen py-24 overflow-hidden bg-gradient-to-b from-zinc-950 to-zinc-900 flex flex-col items-center justify-center">
      
      {/* Ambient background glow dots */}
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-pink-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="text-center z-10 px-6 max-w-2xl mb-16 md:mb-36">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 0.6, y: 0 }}
          viewport={{ once: true }}
          className="text-pink-400 font-bold tracking-[6px] text-xs uppercase mb-3"
        >
          ✨ Click to reveal our secrets ✨
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-black tracking-tight glow-text-pink text-white"
        >
          Floating Memories
        </motion.h2>
        <p className="mt-4 text-zinc-400 font-light text-sm md:text-base leading-relaxed">
          A scattered gallery of our most cherished snapshots. Click on any polaroid to read the heartfelt story behind it.
        </p>
      </div>

      {/* MOBILE SCREEN: Horizontal Scroll Deck */}
      <div className="block md:hidden w-full relative z-10">
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-8 pb-10 scrollbar-thin scrollbar-thumb-pink-500">
          {memoriesList.map((memory, index) => (
            <motion.div
              key={index}
              className="snap-center shrink-0 w-[240px] cursor-pointer"
              onClick={() => setActiveMemory(memory)}
              whileTap={{ scale: 0.98 }}
            >
              <div className="bg-white p-4 pb-8 rounded-2xl shadow-xl border border-zinc-200/40 flex flex-col items-center">
                <div className="relative overflow-hidden w-full h-44 rounded-xl bg-zinc-100">
                  <img
                    src={memory.image}
                    alt={memory.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-4 text-center">
                  <span className="text-[10px] text-pink-500 font-extrabold uppercase tracking-wider block mb-1">
                    {memory.tag}
                  </span>
                  <p className="font-mono text-zinc-800 font-bold text-sm truncate max-w-full">
                    {memory.title}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Swipe prompt */}
        <div className="flex items-center justify-center gap-2 text-xs text-zinc-500 mt-2 font-mono">
          <span>Swipe right for more</span>
          <FaChevronRight size={10} className="animate-pulse" />
        </div>
      </div>

      {/* DESKTOP SCREEN: Scattered Polaroid Canvas */}
      <div className="hidden md:block relative w-full max-w-7xl h-[550px] px-8 z-10">
        {memoriesList.map((memory, index) => (
          <motion.div
            key={index}
            className="absolute cursor-pointer select-none group"
            style={{
              left: memory.left,
              top: memory.top,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ 
              scale: 1.06, 
              rotate: memory.rotation * 0.4,
              zIndex: 30,
              transition: { duration: 0.3 }
            }}
            onClick={() => setActiveMemory(memory)}
          >
            {/* Polaroid Box */}
            <div 
              className="bg-white p-4 pb-10 rounded-2xl shadow-2xl border border-zinc-200/50 flex flex-col items-center w-56 transition-transform duration-300"
              style={{ transform: `rotate(${memory.rotation}deg)` }}
            >
              <div className="relative overflow-hidden w-full h-44 rounded-xl bg-zinc-100">
                <img
                  src={memory.image}
                  alt={memory.title}
                  className="w-full h-full object-cover filter brightness-[0.95] group-hover:brightness-100 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              <div className="mt-4 text-center">
                <span className="text-[10px] text-pink-500 font-extrabold uppercase tracking-wider block mb-1">
                  {memory.tag}
                </span>
                <p className="font-mono text-zinc-800 font-bold text-sm truncate max-w-full">
                  {memory.title}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox details modal */}
      <AnimatePresence>
        {activeMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
            onClick={() => setActiveMemory(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 18 }}
              className="relative max-w-3xl w-full bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl grid md:grid-cols-2"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image side */}
              <div className="h-[250px] md:h-[450px] relative">
                <img
                  src={activeMemory.image}
                  alt={activeMemory.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
              </div>

              {/* Message side */}
              <div className="p-8 flex flex-col justify-between">
                <div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-pink-500/10 text-pink-400 border border-pink-500/20 tracking-wider uppercase inline-block mb-4">
                    {activeMemory.tag}
                  </span>
                  
                  <h3 className="text-3xl font-extrabold text-white tracking-tight leading-tight mb-4">
                    {activeMemory.title}
                  </h3>
                  
                  {/* Clean text justification */}
                  <p className="text-zinc-300 font-light leading-relaxed text-sm md:text-base text-justify">
                    {activeMemory.desc}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500 font-mono">
                  <span className="flex items-center gap-1"><FaHeart className="text-pink-500" /> To: Piya</span>
                  <span>From: Your Brother</span>
                </div>
              </div>

              {/* Close Icon */}
              <button
                onClick={() => setActiveMemory(null)}
                className="absolute top-4 right-4 bg-zinc-800/90 hover:bg-pink-500 text-white hover:text-white p-2.5 rounded-full transition-all duration-300 backdrop-blur-md cursor-pointer border border-zinc-700 hover:border-pink-400 shadow-lg"
              >
                <FaTimes size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FloatingMemories;