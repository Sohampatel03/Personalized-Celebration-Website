import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const Hero = () => {
const scrollToNext = () => {
window.scrollTo({
top: window.innerHeight,
behavior: "smooth",
});
};

return ( <section className="relative h-screen overflow-hidden flex items-center justify-center">

```
  <img
    src="/images/hero/hero.webp"
    alt="hero"
    className="
    absolute
    inset-0
    w-full
    h-full
    object-cover
    scale-110
    "
  />

  <div className="absolute inset-0 bg-black/60" />

  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />

  <motion.div
    className="relative z-10 text-center px-6"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1.5 }}
  >
    <motion.p
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="uppercase tracking-[8px] text-zinc-400 text-sm"
    >
      Special Day
    </motion.p>

    <motion.h1
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="
      text-6xl
      md:text-8xl
      lg:text-[120px]
      font-black
      leading-none
      "
    >
      Happy
      <br />
      Birthday
    </motion.h1>

    <motion.h2
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.1 }}
      className="
      mt-6
      text-3xl
      md:text-5xl
      font-light
      "
    >
      Piya ❤️
    </motion.h2>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
      className="
      mt-8
      max-w-xl
      mx-auto
      text-zinc-300
      "
    >
      Every picture tells a story,
      every memory holds a feeling.
    </motion.p>
  </motion.div>

  <motion.button
    onClick={scrollToNext}
    className="
    absolute
    bottom-10
    left-1/2
    -translate-x-1/2
    z-20
    "
    animate={{
      y: [0, 12, 0],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
    }}
  >
    <FaChevronDown
      size={28}
      className="text-white"
    />
  </motion.button>
</section>

);
};

export default Hero;
