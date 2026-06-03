import { motion } from "framer-motion";

const SectionDivider = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="flex items-center justify-center py-20 gap-5"
    >
      <div className="h-px flex-1 max-w-[120px]"
        style={{ background: "linear-gradient(to right, transparent, rgba(244,63,94,0.25))" }} />

      {/* Central ornament */}
      <div className="flex items-center gap-2">
        <div className="w-1 h-1 rounded-full" style={{ background: "var(--rose)", opacity: 0.35 }} />
        <svg width="18" height="18" viewBox="0 0 24 24" style={{ opacity: 0.3 }}>
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="var(--rose)"
          />
        </svg>
        <div className="w-1 h-1 rounded-full" style={{ background: "var(--rose)", opacity: 0.35 }} />
      </div>

      <div className="h-px flex-1 max-w-[120px]"
        style={{ background: "linear-gradient(to left, transparent, rgba(244,63,94,0.25))" }} />
    </motion.div>
  );
};

export default SectionDivider;