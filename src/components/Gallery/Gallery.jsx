import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaChevronLeft, FaChevronRight, FaExpand } from "react-icons/fa";

const galleryItems = [
  {
    src: "/images/gallery/gallery1.webp",
    category: "Childhood",
    caption: "Sweet little days when everything was simple and innocent. Sibling love since day one!",
  },
  {
    src: "/images/gallery/gallery2.webp",
    category: "Celebrations",
    caption: "Blowing out candles, making silent wishes, and sharing cake crumbs together.",
  },
  {
    src: "/images/gallery/gallery3.webp",
    category: "Silly",
    caption: "Making weird faces and crazy poses. Who knew we would turn out this elegant?",
  },
  {
    src: "/images/gallery/gallery4.webp",
    category: "Silly",
    caption: "All those funny sibling banters and silly arguments that always end in happy laughter.",
  },
  {
    src: "/images/gallery/gallery5.webp",
    category: "Celebrations",
    caption: "Under the beautiful glowing lights, celebrating your presence in our lives.",
  },
];

const categories = ["All", "Childhood", "Celebrations", "Silly"];

const Gallery = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Filtered gallery items
  const filteredItems = selectedFilter === "All"
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedFilter);

  const handleNext = (e) => {
    e.stopPropagation();
    setLightboxIndex((prevIndex) => 
      prevIndex === filteredItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setLightboxIndex((prevIndex) => 
      prevIndex === 0 ? filteredItems.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="section-padding bg-zinc-950/40 relative">
      {/* Background neon ambient */}
      <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-pink-500/5 blur-[150px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-16 relative z-10">
        <span className="text-pink-400 font-semibold tracking-[4px] text-xs uppercase mb-3 block">
          Visual Diary
        </span>
        <h2 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6">
          Memory Album
        </h2>
        <p className="text-zinc-400 font-light max-w-xl mx-auto">
          A beautifully curated collage of our best poses, sweet events, and candid sibling madness.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-16 relative z-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedFilter(cat)}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold tracking-wider transition-all duration-300 cursor-pointer border ${
              selectedFilter === cat
                ? "bg-gradient-to-r from-pink-500 to-purple-500 border-pink-400 text-white shadow-[0_0_15px_rgba(236,72,153,0.3)]"
                : "border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:text-white hover:border-zinc-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry-like Grid */}
      <motion.div
        layout
        className="columns-1 sm:columns-2 lg:columns-3 gap-6 max-w-6xl mx-auto space-y-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => (
            <motion.div
              layout
              key={item.src}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="break-inside-avoid relative rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900/20 backdrop-blur-sm group cursor-pointer"
              onClick={() => setLightboxIndex(index)}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden w-full h-auto max-h-[450px]">
                <img
                  src={item.src}
                  alt=""
                  loading="lazy"
                  className="w-full object-cover filter brightness-[0.9] group-hover:brightness-100 group-hover:scale-[1.04] transition-all duration-700 ease-out"
                />
                
                {/* Hover Blur Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400 flex flex-col justify-end p-6" >
                  <span className="px-2.5 py-0.5 rounded bg-pink-500/20 text-pink-400 text-[10px] font-bold uppercase tracking-wider border border-pink-500/30 self-start mb-2">
                    {item.category}
                  </span>
                  <p className="text-zinc-200 text-sm font-light leading-relaxed">
                    {item.caption}
                  </p>
                  
                  {/* Expansion indicator */}
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-zinc-800/80 backdrop-blur-md flex items-center justify-center text-white border border-zinc-700 shadow-md">
                    <FaExpand size={12} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Carousel Overlay */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/95 backdrop-blur-lg p-4 select-none"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 bg-zinc-900 border border-zinc-800 hover:bg-pink-500 hover:border-pink-400 text-white p-3 rounded-full transition-colors cursor-pointer shadow-lg z-50"
            >
              <FaTimes size={18} />
            </button>

            {/* Slider Content Wrapper */}
            <div className="relative w-full max-w-4xl flex items-center justify-center">
              {/* Previous Button */}
              <button
                onClick={handlePrev}
                className="absolute left-0 md:-left-16 bg-zinc-900/80 hover:bg-pink-500 border border-zinc-800 hover:border-pink-400 text-white p-4 rounded-full transition-all cursor-pointer shadow-lg z-10 hover:scale-105"
              >
                <FaChevronLeft size={20} />
              </button>

              {/* Main Expanded Image */}
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="max-h-[70vh] max-w-[85vw] rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-950 flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={filteredItems[lightboxIndex]?.src}
                  alt=""
                  className="w-full h-full object-contain max-h-[60vh] max-w-full"
                />
                
                {/* Caption Panel */}
                <div className="bg-zinc-900/90 border-t border-zinc-800/80 p-6 text-center">
                  <span className="px-2.5 py-0.5 rounded-full bg-pink-500/10 text-pink-400 text-xs font-bold uppercase tracking-widest border border-pink-500/20 inline-block mb-2">
                    {filteredItems[lightboxIndex]?.category}
                  </span>
                  <p className="text-zinc-200 text-sm md:text-base font-light leading-relaxed">
                    {filteredItems[lightboxIndex]?.caption}
                  </p>
                </div>
              </motion.div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-0 md:-right-16 bg-zinc-900/80 hover:bg-pink-500 border border-zinc-800 hover:border-pink-400 text-white p-4 rounded-full transition-all cursor-pointer shadow-lg z-10 hover:scale-105"
              >
                <FaChevronRight size={20} />
              </button>
            </div>

            {/* Indicator Dot Sequence */}
            <div className="flex gap-2 mt-8">
              {filteredItems.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(idx);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    lightboxIndex === idx
                      ? "bg-pink-500 w-6 shadow-[0_0_8px_rgba(236,72,153,0.5)]"
                      : "bg-zinc-700 hover:bg-zinc-500"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;