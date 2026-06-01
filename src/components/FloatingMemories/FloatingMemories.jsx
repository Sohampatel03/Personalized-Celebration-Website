import { motion } from "framer-motion";

const photos = [
  "/images/gallery/gallery1.webp",
  "/images/gallery/gallery2.webp",
  "/images/gallery/gallery3.webp",
  "/images/gallery/gallery4.webp",
  "/images/gallery/gallery5.webp",
];

const FloatingMemories = () => {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center">

      <h2 className="text-5xl md:text-7xl font-bold z-10 text-center">
        Beautiful Memories
      </h2>

      {photos.map((photo, index) => (
        <motion.img
          key={index}
          src={photo}
          alt=""
          className="absolute w-40 md:w-60 rounded-3xl shadow-2xl object-cover"
          style={{
            left: `${15 + index * 15}%`,
            top: `${20 + (index % 2) * 25}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [-3, 3, -3],
          }}
          transition={{
            duration: 5 + index,
            repeat: Infinity,
          }}
        />
      ))}
    </section>
  );
};

export default FloatingMemories;