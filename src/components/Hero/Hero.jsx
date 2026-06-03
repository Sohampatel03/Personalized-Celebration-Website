import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FaChevronDown } from "react-icons/fa";

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY  = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const scrollToNext = () => window.scrollTo({ top: window.innerHeight, behavior: "smooth" });

  return (
    <section ref={ref} className="relative h-screen overflow-hidden flex items-center md:items-end justify-center pt-16 pb-28 md:pt-0 md:pb-24">
      {/* Parallax bg image */}
      <motion.div style={{ y: imageY }}
        className="absolute inset-0 w-full h-[115%] -top-[10%]">
        <img src="/images/hero/hero.webp" alt="Celebrating Piya"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.42) saturate(1.2)" }} />
      </motion.div>

      {/* Vignettes */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(to top, var(--ink) 0%, rgba(8,3,10,0.65) 35%, rgba(8,3,10,0.15) 70%, transparent 100%)"
      }} />
      <div className="absolute inset-0" style={{
        background: "linear-gradient(to right, rgba(8,3,10,0.35) 0%, transparent 25%, transparent 75%, rgba(8,3,10,0.35) 100%)"
      }} />

      {/* Glow orbs */}
      <div className="absolute top-1/3 left-1/3 w-60 md:w-80 h-60 md:h-80 rounded-full blur-[120px] animate-breathe pointer-events-none"
        style={{ background: "rgba(244,63,94,0.07)" }} />
      <div className="absolute top-1/4 right-1/4 w-48 md:w-60 h-48 md:h-60 rounded-full blur-[100px] pointer-events-none"
        style={{ background: "rgba(147,51,234,0.06)", animation: "breathe 6s ease-in-out infinite 2s" }} />

      {/* Content */}
      <motion.div style={{ y: textY, opacity }}
        className="relative z-10 text-center px-5 max-w-5xl w-full flex flex-col items-center">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-5 md:mb-8 flex items-center gap-3 md:gap-4"
        >
          <div className="w-8 md:w-12 h-px" style={{ background: "linear-gradient(to right, transparent, var(--rose))" }} />
          <span className="font-sans font-medium uppercase text-center"
            style={{ color: "var(--blush)", fontSize: "clamp(0.55rem, 2.2vw, 0.7rem)", letterSpacing: "0.4em" }}>
            A Journey Through Memories
          </span>
          <div className="w-8 md:w-12 h-px" style={{ background: "linear-gradient(to left, transparent, var(--rose))" }} />
        </motion.div>

        {/* Main heading — fluid size for all screens */}
        <div className="overflow-hidden mb-1">
          <motion.h1
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.55, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display grad-blush glow-rose leading-[0.86]"
            style={{ fontSize: "clamp(4.2rem, 18vw, 13rem)", letterSpacing: "-0.02em" }}
          >
            Happy
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-4 md:mb-5">
          <motion.h1
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display grad-blush glow-rose leading-[0.86]"
            style={{ fontSize: "clamp(4.2rem, 18vw, 13rem)", letterSpacing: "-0.02em" }}
          >
            Birthday
          </motion.h1>
        </div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 md:gap-5 mb-6 md:mb-8"
        >
          <div className="w-10 md:w-16 h-px" style={{ background: "linear-gradient(to right, transparent, var(--blush))" }} />
          <span className="font-serif italic grad-rose"
            style={{ fontSize: "clamp(1.6rem, 6vw, 3.5rem)", letterSpacing: "0.04em", fontWeight: 300 }}>
            Piya ❤️
          </span>
          <div className="w-10 md:w-16 h-px" style={{ background: "linear-gradient(to left, transparent, var(--blush))" }} />
        </motion.div>

        {/* Quote — smaller on mobile */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.3, duration: 1 }}
          className="font-serif italic text-center max-w-xs md:max-w-lg leading-relaxed"
          style={{ color: "#d4a0aa", fontWeight: 300, fontSize: "clamp(0.85rem, 3vw, 1.1rem)" }}
        >
          "Every picture tells a story, every memory holds a feeling."
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        style={{ opacity }}
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer"
      >
        <span className="font-sans font-medium uppercase" style={{ color: "rgba(253,164,175,0.45)", fontSize: "0.6rem", letterSpacing: "0.4em" }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-7 h-7 rounded-full flex items-center justify-center border"
          style={{ borderColor: "rgba(244,63,94,0.3)", background: "rgba(244,63,94,0.05)" }}
        >
          <FaChevronDown size={10} style={{ color: "rgba(253,164,175,0.55)" }} />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default Hero;
