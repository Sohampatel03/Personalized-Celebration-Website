import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaHeart, FaPlay, FaEnvelopeOpenText } from "react-icons/fa";

const VideoSection = () => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("letter"); // "letter" or "video"
  const [isVideoError, setIsVideoError] = useState(false);

  return (
    <>
      <section className="section-padding bg-zinc-950/20 relative">
        {/* Decorative ambient gradients */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-pink-400 font-bold tracking-[4px] text-xs uppercase mb-3 block">
              ✨ For Your Eyes Only ✨
            </span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6 glow-text-pink">
              A Brother's Gift
            </h2>
            <p className="text-zinc-400 font-light max-w-xl mx-auto text-sm md:text-base leading-relaxed">
              A quiet corner of the internet holding a direct message from my heart. Click the envelope below to open.
            </p>
          </div>

          {/* Interactive envelope */}
          <motion.div
            onClick={() => setOpen(true)}
            whileHover={{ scale: 1.02 }}
            className="relative cursor-pointer max-w-4xl mx-auto group z-10"
          >
            {/* Cinematic Outer Glassmorphic Shell */}
            <div className="rounded-[40px] overflow-hidden border border-zinc-800 bg-zinc-900/30 backdrop-blur-md p-6 md:p-10 shadow-2xl relative">
              <div className="relative rounded-[30px] overflow-hidden h-[300px] md:h-[450px] bg-zinc-950 flex flex-col items-center justify-center">
                <div className="absolute inset-0 bg-radial-gradient(circle at center, rgba(236,72,153,0.15), transparent 75%)" />
                <div className="absolute inset-0 bg-black/60 z-0" />
                
                {/* Cover Content */}
                <div className="relative z-10 text-center px-6 flex flex-col items-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 flex items-center justify-center border border-pink-400/30 shadow-[0_0_40px_rgba(236,72,153,0.4)] mb-6 group-hover:scale-110 transition-transform duration-500 animate-pulse-soft"
                  >
                    <FaEnvelopeOpenText size={32} className="text-white drop-shadow-lg" />
                  </motion.div>

                  <h3 className="text-2xl md:text-4xl font-extrabold text-white mb-3 tracking-tight">
                    Unfold Sibling Secrets
                  </h3>
                  <p className="text-zinc-400 text-xs md:text-sm font-light max-w-md leading-relaxed">
                    Tap to open a personalized handwritten letter and play the acoustic memory slideshow.
                  </p>

                  <span className="mt-8 px-6 py-2.5 rounded-full border border-pink-500/30 bg-pink-500/5 hover:bg-pink-500/20 text-pink-400 text-xs font-semibold uppercase tracking-widest transition-colors duration-300">
                    Open Sealed Envelope
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modal holding letter & video slides */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-lg p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className="relative max-w-4xl w-full bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Tab Selector Header */}
              <div className="flex border-b border-zinc-800 bg-zinc-950 p-4 justify-between items-center px-6 md:px-8">
                <div className="flex gap-4 md:gap-6">
                  <button
                    onClick={() => setActiveTab("letter")}
                    className={`pb-2 text-xs md:text-sm font-bold tracking-wider uppercase border-b-2 cursor-pointer transition-all duration-300 ${
                      activeTab === "letter"
                        ? "text-pink-500 border-pink-500"
                        : "text-zinc-400 border-transparent hover:text-zinc-200"
                    }`}
                  >
                    💌 Sibling Letter
                  </button>
                  <button
                    onClick={() => setActiveTab("video")}
                    className={`pb-2 text-xs md:text-sm font-bold tracking-wider uppercase border-b-2 cursor-pointer transition-all duration-300 ${
                      activeTab === "video"
                        ? "text-pink-500 border-pink-500"
                        : "text-zinc-400 border-transparent hover:text-zinc-200"
                    }`}
                  >
                    🎬 Memory Video
                  </button>
                </div>

                {/* Close button */}
                <button
                  onClick={() => setOpen(false)}
                  className="bg-zinc-800 hover:bg-pink-500 text-white p-2.5 rounded-full border border-zinc-700 hover:border-pink-400 transition-colors shadow cursor-pointer"
                >
                  <FaTimes size={14} />
                </button>
              </div>

              {/* Scrollable Container Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-12 bg-zinc-950/90 relative">
                <div className="absolute inset-0 bg-radial-gradient(circle at center, rgba(236,72,153,0.03), transparent 75%) pointer-events-none" />

                {activeTab === "letter" ? (
                  /* Premium Styled Sibling Scroll Letter with drop-cap and line-height */
                  <motion.div
                    key="letter"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-2xl mx-auto text-zinc-300 font-serif leading-[1.8] tracking-wide"
                  >
                    <div className="text-center mb-10 flex flex-col items-center">
                      <FaHeart size={28} className="text-pink-500 drop-shadow-[0_0_8px_rgba(236,72,153,0.4)] animate-pulse mb-3" />
                      <h4 className="text-2xl md:text-3.5xl font-black font-sans text-white tracking-tight glow-text-pink leading-tight">
                        To My Dearest Sister, Piya
                      </h4>
                    </div>

                    <p className="mb-6 text-base md:text-lg text-justify first-letter:text-5xl first-letter:font-black first-letter:text-pink-400 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-sans">
                      Happy Birthday, Piya! On this very special day, I wanted to take a moment to tell you how incredibly lucky I am to have you as my sister.
                    </p>

                    <p className="mb-6 text-base md:text-lg text-justify">
                      From fighting over TV remotes to celebrating each other's smallest wins, we have grown up sharing a world of inside jokes, crazy dreams, and endless memories. You have this beautiful superpower of bringing warmth and light wherever you go.
                    </p>

                    <p className="mb-6 text-base md:text-lg text-justify">
                      Whenever life got tough, just knowing you were there to listen—or to make some silly joke—was enough to clear all the clouds. You aren't just my sibling; you are my permanent anchor and my closest friend.
                    </p>

                    <p className="mb-6 text-base md:text-lg text-justify">
                      As you turn another year older today, I wish that you get all the happiness, growth, and love you deserve. Never lose that sparkling smile, because it truly makes the world a better place.
                    </p>

                    <p className="mb-10 text-base md:text-lg text-justify">
                      Keep shining, keep being your amazing self, and remember that no matter where life takes us, I am always, always standing right behind you.
                    </p>

                    <div className="text-right font-sans font-semibold tracking-wide text-zinc-400 text-sm border-t border-zinc-800 pt-6">
                      <p>With infinite love & blessings,</p>
                      <p className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 font-extrabold mt-1.5 text-base drop-shadow-[0_0_8px_rgba(236,72,153,0.3)]">Your Big Brother ❤️</p>
                    </div>
                  </motion.div>
                ) : (
                  /* Video Container */
                  <motion.div
                    key="video"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center max-w-3xl mx-auto"
                  >
                    {!isVideoError ? (
                      <video
                        controls
                        autoPlay
                        onError={() => setIsVideoError(true)}
                        className="w-full max-h-[50vh] rounded-2xl border border-zinc-800 shadow-2xl bg-zinc-950"
                      >
                        <source
                          src="/videos/birthday-video.mp4"
                          type="video/mp4"
                        />
                      </video>
                    ) : (
                      /* Slideshow fallback greeting */
                      <div className="w-full text-center bg-zinc-900/40 p-8 md:p-12 border border-zinc-800 rounded-3xl backdrop-blur-xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-radial-gradient(circle at center, rgba(236,72,153,0.06), transparent 75%)" />
                        
                        <div className="relative z-10 flex flex-col items-center">
                          <div className="w-16 h-16 rounded-full bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 mb-6 animate-pulse">
                            <FaPlay size={20} className="ml-1" />
                          </div>

                          <h4 className="text-xl md:text-2xl font-extrabold text-white mb-3">
                            Acoustic Memories Montage
                          </h4>
                          
                          <p className="text-zinc-400 font-light max-w-md text-sm md:text-base leading-relaxed mb-6">
                            Humara special video montage abhi upload nahi hua hai, lekin aap background music player play karke is pure website scroll ko memory video ki tarah read kar sakte hain!
                          </p>

                          <div className="px-5 py-2.5 rounded-full border border-pink-500/30 bg-pink-500/5 text-pink-400 font-semibold tracking-wider text-xs uppercase animate-pulse">
                            ✨ Turn on the music at the bottom-right corner! ✨
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VideoSection;