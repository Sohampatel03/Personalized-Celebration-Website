import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const Hero = () => {
  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative h-screen overflow-hidden flex items-center justify-center bg-black">
      {/* Dynamic Background Image with subtle Ken Burns effect */}
      <motion.div 
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1.05, opacity: 0.6 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src="/images/hero/hero.webp"
          alt="Celebrating Piya"
          className="w-full h-full object-cover filter brightness-[0.7]"
        />
      </motion.div>

      {/* Decorative Glow Blobs */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-pink-500/10 blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-[150px] animate-pulse" style={{ animationDuration: '6s' }} />

      {/* Aesthetic Overlay Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
      <div className="absolute inset-0 bg-radial-gradient(circle at center, transparent 30%, rgba(5,5,5,0.8) 100%)" />

      {/* Content Container */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {/* Special Day Floating Tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="inline-block px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/5 backdrop-blur-md mb-8"
        >
          <span className="uppercase tracking-[6px] text-pink-400 text-xs font-semibold">
            ✨ A Journey Through Memories ✨
          </span>
        </motion.div>

        {/* Happy Birthday Neon Heading */}
        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 50 }}
            className="text-7xl md:text-9xl font-black tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-100 to-pink-300 drop-shadow-[0_0_30px_rgba(236,72,153,0.3)]"
          >
            Happy
            <br />
            Birthday
          </motion.h1>
        </div>

        {/* Glowing Sister's Name */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3, type: "spring", stiffness: 60 }}
          className="text-4xl md:text-6xl font-extrabold tracking-wide mt-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]"
        >
          Piya ❤️
        </motion.h2>

        {/* Emotional Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7, duration: 1 }}
          className="mt-8 max-w-xl mx-auto text-base md:text-lg text-zinc-300 font-light leading-relaxed tracking-wider drop-shadow-md"
        >
          "Every picture tells a story, every memory holds a feeling. Celebrating the beautiful soul that you are."
        </motion.p>
      </motion.div>

      {/* Downward Scroll Indicator */}
      <motion.button
        onClick={scrollToNext}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 group cursor-pointer"
        animate={{
          y: [0, 8, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <span className="text-zinc-500 group-hover:text-pink-400 text-xs tracking-[4px] uppercase transition-colors duration-300">
          Scroll Down
        </span>
        <div className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center group-hover:border-pink-400/50 group-hover:bg-pink-500/5 transition-all duration-300 shadow-lg">
          <FaChevronDown
            size={14}
            className="text-zinc-400 group-hover:text-pink-400 transition-colors duration-300"
          />
        </div>
      </motion.button>
    </section>
  );
};

export default Hero;
