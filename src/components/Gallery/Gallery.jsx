import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { galleryData } from "../../data/galleryData";

// Convert galleryData array to dynamic items
const galleryItems = galleryData.map((src, i) => ({
  src,
  id: i,
}));

const Gallery = () => {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [visibleCount, setVisibleCount] = useState(12);

  // Lock / unlock body scroll
  useEffect(() => {
    if (lightboxIndex !== null) {
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
  }, [lightboxIndex]);

  const handleNext = useCallback((e) => {
    e?.stopPropagation();
    setLightboxIndex((p) => (p === galleryItems.length - 1 ? 0 : p + 1));
  }, []);

  const handlePrev = useCallback((e) => {
    e?.stopPropagation();
    setLightboxIndex((p) => (p === 0 ? galleryItems.length - 1 : p - 1));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") setLightboxIndex(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, handleNext, handlePrev]);

  // Load more images handler
  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 12, galleryItems.length));
  };

  const renderedItems = galleryItems.slice(0, visibleCount);

  return (
    <section
      className="relative perform-contain"
      style={{
        background: "rgba(14,8,15,0.3)",
        padding: "clamp(70px,10vw,140px) clamp(4%,5%,6%) clamp(70px,10vw,120px)",
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-[150px] pointer-events-none"
        style={{ background: "rgba(244,63,94,0.04)" }}
      />

      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-10 md:mb-16 relative z-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-8 h-px" style={{ background: "linear-gradient(to right, transparent, var(--rose))" }} />
          <span
            className="font-sans font-medium uppercase"
            style={{ color: "var(--blush)", opacity: 0.65, fontSize: "clamp(0.55rem, 2vw, 0.68rem)", letterSpacing: "0.4em" }}
          >
            Visual Diary
          </span>
          <div className="w-8 h-px" style={{ background: "linear-gradient(to left, transparent, var(--rose))" }} />
        </div>
        <h2
          className="font-display grad-blush glow-rose leading-none mb-4"
          style={{ fontSize: "clamp(2.4rem, 9vw, 6rem)", letterSpacing: "-0.02em" }}
        >
          Memory Album
        </h2>
        <p
          className="font-sans font-light leading-relaxed max-w-xl mx-auto"
          style={{ color: "rgba(196,160,170,0.55)", fontSize: "clamp(0.8rem, 3vw, 1rem)" }}
        >
          A beautiful collection of {galleryItems.length} happy moments, sweet smiles, and sibling bonds.
        </p>
      </div>

      {/* Masonry grid */}
      <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-2 md:gap-3 max-w-7xl mx-auto">
        {renderedItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ delay: (index % 12) * 0.03, duration: 0.45 }}
            className="relative group cursor-pointer break-inside-avoid mb-2 md:mb-3 rounded-lg md:rounded-xl overflow-hidden glass"
            style={{ border: "1px solid rgba(255,255,255,0.05)" }}
            onClick={() => setLightboxIndex(item.id)}
          >
            <img
              src={item.src}
              alt=""
              loading="lazy"
              decoding="async"
              className="w-full block transition-all duration-600 group-hover:scale-[1.04]"
              style={{ filter: "brightness(0.87) saturate(1.1)", display: "block" }}
            />
            {/* Hover overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
              style={{ background: "rgba(8,3,10,0.45)" }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(244,63,94,0.9)",
                  boxShadow: "0 0 16px rgba(244,63,94,0.6)",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 3 21 3 21 9" />
                  <polyline points="9 21 3 21 3 15" />
                  <line x1="21" y1="3" x2="14" y2="10" />
                  <line x1="3" y1="21" x2="10" y2="14" />
                </svg>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More Button */}
      {visibleCount < galleryItems.length && (
        <div className="flex justify-center mt-12 md:mt-16 relative z-10">
          <button
            onClick={handleLoadMore}
            className="glass px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            style={{
              borderColor: "rgba(244,63,94,0.25)",
              background: "rgba(244,63,94,0.06)",
              boxShadow: "0 0 20px rgba(244,63,94,0.04)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--rose)";
              e.currentTarget.style.background = "rgba(244,63,94,0.12)";
              e.currentTarget.style.boxShadow = "0 0 25px rgba(244,63,94,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(244,63,94,0.25)";
              e.currentTarget.style.background = "rgba(244,63,94,0.06)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(244,63,94,0.04)";
            }}
          >
            Reveal More Memories
          </button>
        </div>
      )}

      {/* ── LIGHTBOX ── */}
      {createPortal(
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center"
              style={{ background: "rgba(6,2,8,0.97)" }}
              onClick={() => setLightboxIndex(null)}
            >
              {/* Counter — top left */}
              <div
                className="absolute top-5 left-5 font-sans font-medium z-10 select-none"
                style={{ color: "rgba(253,164,175,0.45)", fontSize: "0.72rem", letterSpacing: "0.18em" }}
              >
                {String(lightboxIndex + 1).padStart(2, "0")}
                <span style={{ color: "rgba(255,255,255,0.15)", margin: "0 4px" }}>/</span>
                {String(galleryItems.length).padStart(2, "0")}
              </div>

              {/* Close button — top right */}
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200"
                style={{ background: "rgba(244,63,94,0.1)", border: "1px solid rgba(244,63,94,0.22)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--rose)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(244,63,94,0.1)")}
              >
                <FaTimes size={13} color="#fff" />
              </button>

              {/* Prev button */}
              <button
                onClick={handlePrev}
                className="hidden sm:flex absolute left-3 md:left-6 z-10 items-center justify-center rounded-full cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95"
                style={{
                  width: "clamp(40px,10vw,52px)",
                  height: "clamp(40px,10vw,52px)",
                  background: "rgba(14,8,15,0.75)",
                  border: "1px solid rgba(244,63,94,0.2)",
                  backdropFilter: "blur(8px)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--rose)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(244,63,94,0.2)")}
              >
                <FaChevronLeft size={16} color="rgba(253,164,175,0.85)" />
              </button>

              {/* Next button */}
              <button
                onClick={handleNext}
                className="hidden sm:flex absolute right-3 md:right-6 z-10 items-center justify-center rounded-full cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95"
                style={{
                  width: "clamp(40px,10vw,52px)",
                  height: "clamp(40px,10vw,52px)",
                  background: "rgba(14,8,15,0.75)",
                  border: "1px solid rgba(244,63,94,0.2)",
                  backdropFilter: "blur(8px)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--rose)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(244,63,94,0.2)")}
              >
                <FaChevronRight size={16} color="rgba(253,164,175,0.85)" />
              </button>

              {/* Image — centred, full height, click doesn't close */}
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
                style={{
                  maxWidth: "min(84vw, 900px)",
                  maxHeight: "75vh",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={galleryItems[lightboxIndex]?.src}
                  alt=""
                  decoding="async"
                  style={{
                    maxWidth: "min(84vw, 900px)",
                    maxHeight: "75vh",
                    width: "auto",
                    height: "auto",
                    display: "block",
                    borderRadius: "12px",
                    boxShadow: "0 32px 80px rgba(0,0,0,0.8)",
                    border: "1px solid rgba(244,63,94,0.08)",
                  }}
                />
                
                {/* Tap navigation zones on mobile */}
                <div className="absolute inset-0 flex sm:hidden">
                  <div className="w-1/2 h-full cursor-pointer" onClick={handlePrev} />
                  <div className="w-1/2 h-full cursor-pointer" onClick={handleNext} />
                </div>
              </motion.div>

              {/* Dot strip — bottom (hidden on mobile to prevent clutter) */}
              <div
                className="hidden md:flex absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 z-10"
                style={{ maxWidth: "min(80vw, 400px)", flexWrap: "wrap", justifyContent: "center" }}
              >
                {galleryItems.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => { e.stopPropagation(); setLightboxIndex(idx); }}
                    className="rounded-full cursor-pointer transition-all duration-300"
                    style={{
                      width: lightboxIndex === idx ? "18px" : "5px",
                      height: "5px",
                      background: lightboxIndex === idx ? "var(--rose)" : "rgba(255,255,255,0.18)",
                      boxShadow: lightboxIndex === idx ? "0 0 6px rgba(244,63,94,0.6)" : "none",
                      flexShrink: 0,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};

export default Gallery;