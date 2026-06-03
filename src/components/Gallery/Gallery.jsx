import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaChevronLeft, FaChevronRight, FaExpand } from "react-icons/fa";

const galleryItems = [
  { src: "/images/gallery/gallery1.webp", category: "Childhood",    caption: "Sweet little days when everything was simple and innocent. Sibling love since day one!" },
  { src: "/images/gallery/gallery2.webp", category: "Celebrations", caption: "Blowing out candles, making silent wishes, and sharing cake crumbs together." },
  { src: "/images/gallery/gallery3.webp", category: "Silly",        caption: "Making weird faces and crazy poses. Who knew we would turn out this elegant?" },
  { src: "/images/gallery/gallery4.webp", category: "Silly",        caption: "All those funny sibling banters and silly arguments that always end in happy laughter." },
  { src: "/images/gallery/gallery5.webp", category: "Celebrations", caption: "Under the beautiful glowing lights, celebrating your presence in our lives." },
];

const categories = ["All", "Childhood", "Celebrations", "Silly"];

const Gallery = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [lightboxIndex, setLightboxIndex]   = useState(null);

  const filteredItems = selectedFilter === "All" ? galleryItems
    : galleryItems.filter(i => i.category === selectedFilter);

  const handleNext = (e) => { e.stopPropagation(); setLightboxIndex(p => p === filteredItems.length - 1 ? 0 : p + 1); };
  const handlePrev = (e) => { e.stopPropagation(); setLightboxIndex(p => p === 0 ? filteredItems.length - 1 : p - 1); };

  return (
    <section className="relative" style={{ background: "rgba(14,8,15,0.3)", padding: "clamp(70px,10vw,140px) clamp(5%,8%,8%) clamp(70px,10vw,120px)" }}>

      {/* Ambient */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-[150px] pointer-events-none"
        style={{ background: "rgba(244,63,94,0.04)" }} />

      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-10 md:mb-16 relative z-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-8 h-px" style={{ background: "linear-gradient(to right, transparent, var(--rose))" }} />
          <span className="font-sans font-medium uppercase" style={{ color: "var(--blush)", opacity: 0.65, fontSize: "clamp(0.55rem, 2vw, 0.68rem)", letterSpacing: "0.4em" }}>
            Visual Diary
          </span>
          <div className="w-8 h-px" style={{ background: "linear-gradient(to left, transparent, var(--rose))" }} />
        </div>
        <h2 className="font-display grad-blush glow-rose leading-none mb-4"
          style={{ fontSize: "clamp(2.4rem, 9vw, 6rem)", letterSpacing: "-0.02em" }}>
          Memory Album
        </h2>
        <p className="font-sans font-light leading-relaxed max-w-xl mx-auto"
          style={{ color: "rgba(196,160,170,0.55)", fontSize: "clamp(0.8rem, 3vw, 1rem)" }}>
          A beautifully curated collage of our best poses, sweet events, and candid sibling madness.
        </p>
      </div>

      {/* Filter pills — horizontally scrollable on mobile */}
      <div className="flex gap-2.5 mb-10 md:mb-14 relative z-10 overflow-x-auto pb-2 justify-start md:justify-center px-1">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setSelectedFilter(cat)}
            className="shrink-0 rounded-full font-sans font-semibold uppercase cursor-pointer transition-all duration-300"
            style={{
              padding: "8px 18px",
              fontSize: "clamp(0.6rem, 2vw, 0.7rem)",
              letterSpacing: "0.3em",
              ...(selectedFilter === cat
                ? { background: "linear-gradient(135deg, var(--rose), var(--plum))", color: "#fff", border: "1px solid rgba(244,63,94,0.5)", boxShadow: "0 0 18px rgba(244,63,94,0.22)" }
                : { background: "rgba(14,8,15,0.5)", color: "rgba(196,160,170,0.55)", border: "1px solid rgba(255,255,255,0.07)" })
            }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Grid — 2 cols on mobile, 3 on desktop */}
      <motion.div layout className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 max-w-6xl mx-auto">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => (
            <motion.div layout key={item.src}
              initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.93 }} transition={{ duration: 0.4 }}
              className="relative rounded-xl md:rounded-2xl overflow-hidden group cursor-pointer"
              style={{ border: "1px solid rgba(244,63,94,0.07)", background: "rgba(14,8,15,0.2)", aspectRatio: index % 3 === 1 ? "3/4" : "4/5" }}
              onClick={() => setLightboxIndex(index)}
            >
              <img src={item.src} alt="" loading="lazy"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.06]"
                style={{ filter: "brightness(0.88) saturate(1.1)" }} />

              {/* Hover overlay — on mobile show faint gradient always */}
              <div className="absolute inset-0 md:opacity-0 md:group-hover:opacity-100 transition-all duration-400 flex flex-col justify-end p-3 md:p-5"
                style={{ background: "linear-gradient(to top, rgba(8,3,10,0.85) 0%, rgba(8,3,10,0.15) 55%, transparent 100%)" }}>
                <span className="inline-block mb-1.5 self-start font-sans font-bold uppercase"
                  style={{ color: "var(--rose)", fontSize: "0.55rem", letterSpacing: "0.25em" }}>
                  {item.category}
                </span>
                <p className="font-serif italic leading-snug line-clamp-2 hidden md:block"
                  style={{ color: "rgba(253,164,175,0.85)", fontSize: "0.8rem" }}>
                  {item.caption}
                </p>
                <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(14,8,15,0.65)", border: "1px solid rgba(244,63,94,0.2)" }}>
                  <FaExpand size={9} color="rgba(253,164,175,0.7)" />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox — slides up from bottom on mobile */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex flex-col items-end md:items-center justify-end md:justify-center p-0 md:p-4"
            style={{ background: "rgba(8,3,10,0.96)", backdropFilter: "blur(22px)" }}
            onClick={() => setLightboxIndex(null)}>

            <button onClick={() => setLightboxIndex(null)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer z-50"
              style={{ background: "rgba(244,63,94,0.1)", border: "1px solid rgba(244,63,94,0.25)" }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--rose)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(244,63,94,0.1)"}>
              <FaTimes size={14} color="#fff" />
            </button>

            {/* Mobile: sheet from bottom; Desktop: centered */}
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 140, damping: 22 }}
              className="w-full md:max-w-4xl rounded-t-3xl md:rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
              style={{ background: "rgba(10,5,11,0.98)", border: "1px solid rgba(244,63,94,0.1)", maxHeight: "92vh" }}
              onClick={e => e.stopPropagation()}>

              {/* Pull bar — mobile only */}
              <div className="md:hidden flex justify-center pt-3 pb-1 shrink-0">
                <div className="w-10 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
              </div>

              {/* Image area */}
              <div className="relative shrink-0" style={{ height: "clamp(200px, 50vw, 420px)", minWidth: "clamp(200px, 50vw, 420px)" }}>
                <AnimatePresence mode="wait">
                  <motion.img key={lightboxIndex}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    src={filteredItems[lightboxIndex]?.src} alt=""
                    className="w-full h-full object-cover" />
                </AnimatePresence>
                {/* Prev/next arrows on image for mobile */}
                <button onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center md:hidden"
                  style={{ background: "rgba(8,3,10,0.7)", border: "1px solid rgba(244,63,94,0.2)" }}>
                  <FaChevronLeft size={14} color="rgba(253,164,175,0.8)" />
                </button>
                <button onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center md:hidden"
                  style={{ background: "rgba(8,3,10,0.7)", border: "1px solid rgba(244,63,94,0.2)" }}>
                  <FaChevronRight size={14} color="rgba(253,164,175,0.8)" />
                </button>
              </div>

              {/* Caption */}
              <div className="flex-1 p-5 md:p-8 flex flex-col justify-center" style={{ background: "rgba(14,8,15,0.95)" }}>
                <span className="inline-block px-3 py-1 rounded-full mb-3 font-sans font-bold uppercase"
                  style={{ color: "var(--rose)", background: "rgba(244,63,94,0.08)", border: "1px solid rgba(244,63,94,0.2)", fontSize: "0.6rem", letterSpacing: "0.35em" }}>
                  {filteredItems[lightboxIndex]?.category}
                </span>
                <p className="font-serif italic leading-relaxed"
                  style={{ color: "rgba(196,160,170,0.8)", fontSize: "clamp(0.85rem, 2.5vw, 1.05rem)" }}>
                  {filteredItems[lightboxIndex]?.caption}
                </p>

                {/* Desktop prev/next */}
                <div className="hidden md:flex items-center gap-3 mt-8">
                  <button onClick={handlePrev}
                    className="w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110"
                    style={{ background: "rgba(244,63,94,0.08)", border: "1px solid rgba(244,63,94,0.2)" }}
                    onMouseEnter={e => e.currentTarget.style.background = "var(--rose)"}
                    onMouseLeave={e => e.currentTarget.style.background = "rgba(244,63,94,0.08)"}>
                    <FaChevronLeft size={16} color="rgba(253,164,175,0.9)" />
                  </button>
                  <button onClick={handleNext}
                    className="w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110"
                    style={{ background: "rgba(244,63,94,0.08)", border: "1px solid rgba(244,63,94,0.2)" }}
                    onMouseEnter={e => e.currentTarget.style.background = "var(--rose)"}
                    onMouseLeave={e => e.currentTarget.style.background = "rgba(244,63,94,0.08)"}>
                    <FaChevronRight size={16} color="rgba(253,164,175,0.9)" />
                  </button>
                  {/* Dots */}
                  <div className="flex gap-2 ml-2">
                    {filteredItems.map((_, idx) => (
                      <button key={idx} onClick={e => { e.stopPropagation(); setLightboxIndex(idx); }}
                        className="rounded-full cursor-pointer transition-all duration-300"
                        style={{ width: lightboxIndex === idx ? "20px" : "7px", height: "7px", background: lightboxIndex === idx ? "var(--rose)" : "rgba(255,255,255,0.15)", boxShadow: lightboxIndex === idx ? "0 0 8px rgba(244,63,94,0.5)" : "none" }} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Dot indicators — mobile bottom */}
            <div className="flex gap-2 py-4 md:hidden">
              {filteredItems.map((_, idx) => (
                <button key={idx} onClick={e => { e.stopPropagation(); setLightboxIndex(idx); }}
                  className="rounded-full cursor-pointer transition-all duration-300"
                  style={{ width: lightboxIndex === idx ? "18px" : "7px", height: "7px", background: lightboxIndex === idx ? "var(--rose)" : "rgba(255,255,255,0.2)" }} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;