import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Loader = ({ onFinish }) => {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count <= 0) {
      const finishTimer = setTimeout(() => {
        onFinish();
      }, 1000);

      return () => clearTimeout(finishTimer);
    }

    const timer = setTimeout(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, onFinish]);

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
      <div className="absolute w-[400px] h-[400px] rounded-full bg-purple-500/20 blur-[150px]" />

      {count > 0 ? (
        <motion.h1
          key={count}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-8xl md:text-[180px] font-black"
        >
          {count}
        </motion.h1>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-8xl font-black">
            Happy Birthday
          </h1>

          <p className="mt-4 text-zinc-400">
            A journey through memories
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default Loader;