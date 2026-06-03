import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaHeart, FaPlay, FaEnvelopeOpenText } from "react-icons/fa";

const VideoSection = () => {
  const [open, setOpen]               = useState(false);
  const [activeTab, setActiveTab]     = useState("letter");
  const [isVideoError, setIsVideoError] = useState(false);

  return (
    <>
      <section className="relative" style={{ background: "rgba(14,8,15,0.15)", padding: "clamp(70px,10vw,140px) clamp(5%,8%,8%) clamp(70px,10vw,120px)" }}>
        <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full blur-[130px] pointer-events-none"
          style={{ background: "rgba(147,51,234,0.05)" }} />

        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 md:mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ background: "linear-gradient(to right, transparent, var(--rose))" }} />
              <span className="font-sans font-medium uppercase" style={{ color: "var(--blush)", opacity: 0.65, fontSize: "clamp(0.55rem, 2vw, 0.68rem)", letterSpacing: "0.4em" }}>
                For Your Eyes Only
              </span>
              <div className="w-8 h-px" style={{ background: "linear-gradient(to left, transparent, var(--rose))" }} />
            </div>
            <h2 className="font-display grad-blush glow-rose leading-none mb-4"
              style={{ fontSize: "clamp(2.4rem, 9vw, 6rem)", letterSpacing: "-0.02em" }}>
              A Brother's Gift
            </h2>
            <p className="font-sans font-light leading-relaxed max-w-xl mx-auto"
              style={{ color: "rgba(196,160,170,0.55)", fontSize: "clamp(0.8rem, 3vw, 1rem)" }}>
              A quiet corner of the internet holding a direct message from my heart. Tap the envelope to open.
            </p>
          </div>

          {/* Envelope tap card */}
          <motion.div onClick={() => setOpen(true)}
            whileHover={{ scale: 1.015, y: -3 }} whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.35 }}
            className="relative cursor-pointer max-w-4xl mx-auto group z-10"
          >
            <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl"
              style={{ padding: "clamp(14px,4vw,32px)", background: "rgba(14,8,15,0.55)", border: "1px solid rgba(244,63,94,0.1)", backdropFilter: "blur(22px)" }}>
              <div className="relative rounded-xl md:rounded-2xl overflow-hidden flex flex-col items-center justify-center"
                style={{ height: "clamp(200px, 50vw, 420px)", background: "rgba(8,3,10,0.7)" }}>

                {/* Grid texture */}
                <div className="absolute inset-0 opacity-[0.025]" style={{
                  backgroundImage: "linear-gradient(rgba(244,63,94,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(244,63,94,0.5) 1px, transparent 1px)",
                  backgroundSize: "50px 50px"
                }} />
                <div className="absolute inset-0 pointer-events-none" style={{
                  background: "radial-gradient(ellipse 55% 55% at 50% 50%, rgba(244,63,94,0.07) 0%, transparent 70%)"
                }} />

                <div className="relative z-10 text-center px-5 flex flex-col items-center">
                  <motion.div
                    animate={{ scale: [1, 1.06, 1], y: [0, -5, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity }}
                    className="flex items-center justify-center mb-5 md:mb-8 group-hover:scale-110 transition-transform duration-500"
                    style={{
                      width: "clamp(60px,16vw,112px)", height: "clamp(60px,16vw,112px)",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, var(--rose), var(--plum))",
                      border: "1px solid rgba(244,63,94,0.4)",
                      boxShadow: "0 0 45px rgba(244,63,94,0.28), inset 0 1px 0 rgba(255,255,255,0.1)"
                    }}>
                    <FaEnvelopeOpenText size={28} color="#fff" />
                  </motion.div>

                  <h3 className="font-display grad-blush mb-3"
                    style={{ fontSize: "clamp(1.3rem, 5vw, 2.5rem)", letterSpacing: "-0.01em" }}>
                    Unfold Sibling Secrets
                  </h3>
                  <p className="font-sans font-light leading-relaxed max-w-sm mb-6"
                    style={{ color: "rgba(196,160,170,0.55)", fontSize: "clamp(0.75rem, 2.5vw, 0.9rem)" }}>
                    A personalized letter and memory slideshow await inside.
                  </p>

                  <span className="font-sans font-semibold uppercase rounded-full transition-all duration-300"
                    style={{ padding: "10px 24px", border: "1px solid rgba(244,63,94,0.35)", background: "rgba(244,63,94,0.06)", color: "var(--blush)", fontSize: "clamp(0.58rem, 1.8vw, 0.72rem)", letterSpacing: "0.35em" }}>
                    Open Sealed Envelope
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modal — sheet from bottom on mobile */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center"
            style={{ background: "rgba(8,3,10,0.93)", backdropFilter: "blur(22px)" }}
            onClick={() => setOpen(false)}>

            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 130, damping: 22 }}
              className="relative w-full md:max-w-4xl rounded-t-3xl md:rounded-3xl overflow-hidden shadow-2xl flex flex-col"
              style={{ height: "92vh", background: "#0a050b", border: "1px solid rgba(244,63,94,0.1)" }}
              onClick={e => e.stopPropagation()}>

              {/* Pull bar */}
              <div className="md:hidden flex justify-center pt-3 pb-1 shrink-0"
                style={{ background: "rgba(14,8,15,0.8)" }}>
                <div className="w-10 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
              </div>

              {/* Tab bar */}
              <div className="flex items-center justify-between px-5 md:px-8 py-3 md:py-4 shrink-0"
                style={{ borderBottom: "1px solid rgba(244,63,94,0.08)", background: "rgba(14,8,15,0.8)" }}>
                <div className="flex gap-4 md:gap-6">
                  {[{ key: "letter", label: "💌 Letter" }, { key: "video", label: "🎬 Video" }].map(({ key, label }) => (
                    <button key={key} onClick={() => setActiveTab(key)}
                      className="pb-2 font-sans font-semibold uppercase border-b-2 cursor-pointer transition-all duration-300"
                      style={{ fontSize: "clamp(0.65rem, 2.5vw, 0.8rem)", letterSpacing: "0.28em", ...(activeTab === key ? { color: "var(--rose)", borderColor: "var(--rose)" } : { color: "rgba(196,160,170,0.4)", borderColor: "transparent" }) }}>
                      {label}
                    </button>
                  ))}
                </div>
                <button onClick={() => setOpen(false)}
                  className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-colors"
                  style={{ background: "rgba(244,63,94,0.08)", border: "1px solid rgba(244,63,94,0.2)" }}
                  onMouseEnter={e => e.currentTarget.style.background = "var(--rose)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(244,63,94,0.08)"}>
                  <FaTimes size={13} color="#fff" />
                </button>
              </div>

              {/* Scrollable body */}
              <div className="flex-1 overflow-y-auto relative" style={{ background: "rgba(10,5,11,0.9)", padding: "clamp(20px,6vw,48px)" }}>
                <div className="absolute inset-0 pointer-events-none" style={{
                  background: "radial-gradient(ellipse 45% 35% at 50% 0%, rgba(244,63,94,0.04) 0%, transparent 65%)"
                }} />

                {activeTab === "letter" ? (
                  <motion.div key="letter"
                    initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                    className="max-w-2xl mx-auto relative z-10">
                    {/* Letter header */}
                    <div className="text-center mb-8 flex flex-col items-center">
                      <div className="flex items-center justify-center mb-4"
                        style={{ width: "52px", height: "52px", borderRadius: "50%", background: "rgba(244,63,94,0.08)", border: "1px solid rgba(244,63,94,0.2)" }}>
                        <FaHeart size={18} style={{ color: "var(--rose)" }} className="animate-pulse" />
                      </div>
                      <div className="w-16 h-px mb-4" style={{ background: "linear-gradient(90deg, transparent, var(--rose), transparent)" }} />
                      <h4 className="font-display grad-rose leading-none"
                        style={{ fontSize: "clamp(1.3rem, 5vw, 2.2rem)" }}>
                        To My Dearest Sister, Piya
                      </h4>
                      <div className="w-16 h-px mt-4" style={{ background: "linear-gradient(90deg, transparent, var(--plum), transparent)" }} />
                    </div>

                    {[
                      "Happy Birthday, Piya! On this very special day, I wanted to take a moment to tell you how incredibly lucky I am to have you as my sister.",
                      "From fighting over TV remotes to celebrating each other's smallest wins, we have grown up sharing a world of inside jokes, crazy dreams, and endless memories. You have this beautiful superpower of bringing warmth and light wherever you go.",
                      "Whenever life got tough, just knowing you were there to listen—or to make some silly joke—was enough to clear all the clouds. You aren't just my sibling; you are my permanent anchor and my closest friend.",
                      "As you turn another year older today, I wish that you get all the happiness, growth, and love you deserve. Never lose that sparkling smile, because it truly makes the world a better place.",
                      "Keep shining, keep being your amazing self, and remember that no matter where life takes us, I am always, always standing right behind you."
                    ].map((para, i) => (
                      <p key={i} className="mb-5 font-serif font-light leading-[1.9] text-justify"
                        style={{ color: "rgba(196,160,170,0.78)", fontStyle: "italic", fontSize: "clamp(0.88rem, 2.8vw, 1.05rem)" }}>
                        {i === 0 ? (
                          <><span className="font-display float-left mr-2 mt-0.5 grad-rose"
                            style={{ fontSize: "clamp(2.5rem, 8vw, 3.5rem)", lineHeight: 0.85, fontStyle: "normal" }}>H</span>
                          {para.slice(1)}</>
                        ) : para}
                      </p>
                    ))}

                    <div className="text-right pt-5 mt-2" style={{ borderTop: "1px solid rgba(244,63,94,0.1)" }}>
                      <p className="font-sans font-light mb-1.5" style={{ color: "rgba(196,160,170,0.45)", fontSize: "0.8rem" }}>With infinite love & blessings,</p>
                      <p className="font-display grad-rose" style={{ fontSize: "clamp(1rem, 4vw, 1.3rem)" }}>Your Big Brother ❤️</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="video"
                    initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="h-full flex flex-col items-center justify-center max-w-3xl mx-auto relative z-10 min-h-[300px]">
                    {!isVideoError ? (
                      <video controls autoPlay onError={() => setIsVideoError(true)}
                        className="w-full rounded-xl md:rounded-2xl shadow-2xl"
                        style={{ maxHeight: "55vh", border: "1px solid rgba(244,63,94,0.1)" }}>
                        <source src="/videos/birthday-video.mp4" type="video/mp4" />
                      </video>
                    ) : (
                      <div className="w-full text-center p-8 md:p-12 rounded-2xl md:rounded-3xl relative overflow-hidden"
                        style={{ background: "rgba(14,8,15,0.5)", border: "1px solid rgba(244,63,94,0.1)" }}>
                        <div className="flex items-center justify-center mb-5"
                          style={{ width: "56px", height: "56px", margin: "0 auto 20px", borderRadius: "50%", background: "rgba(244,63,94,0.08)", border: "1px solid rgba(244,63,94,0.2)" }}>
                          <FaPlay size={16} style={{ color: "var(--rose)", marginLeft: "2px" }} />
                        </div>
                        <h4 className="font-display grad-rose mb-3" style={{ fontSize: "clamp(1.2rem, 5vw, 1.6rem)" }}>
                          Acoustic Memories Montage
                        </h4>
                        <p className="font-sans font-light leading-relaxed max-w-xs mx-auto mb-6"
                          style={{ color: "rgba(196,160,170,0.55)", fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)" }}>
                          Video abhi upload nahi hua hai — music player play karke scroll karen!
                        </p>
                        <span className="inline-block font-sans font-semibold uppercase rounded-full"
                          style={{ padding: "8px 20px", border: "1px solid rgba(244,63,94,0.3)", background: "rgba(244,63,94,0.06)", color: "var(--blush)", fontSize: "0.6rem", letterSpacing: "0.3em" }}>
                          ✨ Music player — bottom right ✨
                        </span>
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