import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaHeart, FaPlay, FaEnvelopeOpenText } from "react-icons/fa";

const VideoSection = () => {
  const [open, setOpen]                 = useState(false);
  const [activeTab, setActiveTab]       = useState("letter");
  const [isVideoError, setIsVideoError] = useState(false);
  const videoRef                        = useRef(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow   = "hidden";
      document.body.style.touchAction = "none";
      window.lenis?.stop();
    } else {
      document.body.style.overflow   = "";
      document.body.style.touchAction = "";
      window.lenis?.start();
    }
    return () => {
      document.body.style.overflow   = "";
      document.body.style.touchAction = "";
      window.lenis?.start();
    };
  }, [open]);

  // Mute background music when video tab is active & playing, resume when closed/switched
  useEffect(() => {
    const bgAudio = document.querySelector("audio");
    if (!bgAudio) return;

    if (open && activeTab === "video") {
      // Fade out background music smoothly
      bgAudio.volume = 0;
    } else {
      // Fade back in
      bgAudio.volume = 1;
      // Also pause the birthday video if switching away
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
  }, [open, activeTab]);

  // When modal closes, also restore audio
  const handleClose = () => {
    setOpen(false);
    const bgAudio = document.querySelector("audio");
    if (bgAudio) bgAudio.volume = 1;
    if (videoRef.current) videoRef.current.pause();
  };

  return (
    <>
      <section className="relative perform-contain"
        style={{ background: "rgba(14,8,15,0.15)", padding: "clamp(70px,10vw,140px) clamp(5%,8%,8%) clamp(70px,10vw,120px)" }}>
        <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full blur-[130px] pointer-events-none"
          style={{ background: "rgba(147,51,234,0.05)" }} />

        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 md:mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ background: "linear-gradient(to right, transparent, var(--rose))" }} />
              <span className="font-sans font-medium uppercase"
                style={{ color: "var(--blush)", opacity: 0.65, fontSize: "clamp(0.55rem, 2vw, 0.68rem)", letterSpacing: "0.4em" }}>
                For Your Eyes Only
              </span>
              <div className="w-8 h-px" style={{ background: "linear-gradient(to left, transparent, var(--rose))" }} />
            </div>
            <h2 className="font-display grad-blush glow-rose leading-none mb-4"
              style={{ fontSize: "clamp(2.4rem, 9vw, 6rem)", letterSpacing: "-0.02em" }}>
              A Brother's Gift
            </h2>
            <p className="font-sans font-light leading-relaxed max-w-xl mx-auto text-center"
              style={{ color: "rgba(196,160,170,0.55)", fontSize: "clamp(0.8rem, 3vw, 1rem)" }}>
              A little birthday message special written to my sister. Tap the envelope to open ❤️
            </p>
          </div>

          {/* Envelope card */}
          <motion.div
            onClick={() => setOpen(true)}
            whileHover={{ scale: 1.015, y: -3 }} whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.35 }}
            className="relative cursor-pointer max-w-4xl mx-auto group z-10"
          >
            <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl"
              style={{ padding: "clamp(14px,4vw,32px)", background: "rgba(14,8,15,0.55)", border: "1px solid rgba(244,63,94,0.1)", backdropFilter: "blur(22px)" }}>
              <div className="relative rounded-xl md:rounded-2xl overflow-hidden flex flex-col items-center justify-center"
                style={{ height: "clamp(200px, 50vw, 420px)", background: "rgba(8,3,10,0.7)" }}>
                <div className="absolute inset-0 opacity-[0.025]" style={{
                  backgroundImage: "linear-gradient(rgba(244,63,94,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(244,63,94,0.5) 1px, transparent 1px)",
                  backgroundSize: "50px 50px"
                }} />
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse 55% 55% at 50% 50%, rgba(244,63,94,0.07) 0%, transparent 70%)" }} />

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
                    A personalized letter and memory video await inside.
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

      {/* Modal */}
      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center"
              style={{ background: "rgba(8,3,10,0.93)", backdropFilter: "blur(22px)" }}
              onClick={handleClose}>

              <motion.div
                initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 130, damping: 22 }}
                className="relative w-full md:max-w-4xl rounded-t-3xl md:rounded-3xl overflow-hidden shadow-2xl flex flex-col"
                style={{ height: "92vh", background: "#0a050b", border: "1px solid rgba(244,63,94,0.1)" }}
                onClick={e => e.stopPropagation()}>

                {/* Pull bar mobile */}
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
                        style={{
                          fontSize: "clamp(0.65rem, 2.5vw, 0.8rem)", letterSpacing: "0.28em",
                          ...(activeTab === key
                            ? { color: "var(--rose)", borderColor: "var(--rose)" }
                            : { color: "rgba(196,160,170,0.4)", borderColor: "transparent" })
                        }}>
                        {label}
                      </button>
                    ))}
                  </div>
                  <button onClick={handleClose}
                    className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-colors"
                    style={{ background: "rgba(244,63,94,0.08)", border: "1px solid rgba(244,63,94,0.2)" }}
                    onMouseEnter={e => e.currentTarget.style.background = "var(--rose)"}
                    onMouseLeave={e => e.currentTarget.style.background = "rgba(244,63,94,0.08)"}>
                    <FaTimes size={13} color="#fff" />
                  </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto relative"
                  style={{ background: "rgba(10,5,11,0.9)", padding: "clamp(20px,6vw,48px)" }}>
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse 45% 35% at 50% 0%, rgba(244,63,94,0.04) 0%, transparent 65%)" }} />

                  {activeTab === "letter" ? (
                    <motion.div key="letter"
                      initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45 }}
                      className="max-w-2xl mx-auto relative z-10">
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
"Happy Birthday, Piya! Honestly, hum dono jitna ladte hain na, kisi ko lagega hi nahi ki hum ek dusre ke bina reh bhi sakte hain 😭❤️ But no matter how many arguments we have, life would feel incomplete without you.",

"Tu har choti baat pe ro deti hai, aur fir khud hi haste haste sab normal bhi kar deti hai. That’s the funniest and cutest thing about you — emotional bhi, drama queen bhi, aur sabse pyari bhi 😄",

"No matter what happens, you are always there for everyone. Tu itni caring hai ki bina bole hi samajh jati hai kis ko kya chahiye. Aur haan, kaam karne me bhi tu surprisingly achi hai 😂",

"But apart from all this, one thing I truly admire about you is how understanding and strong you are. Even after tough days, you still manage to smile and make everyone around you happy.",

"And obviously… beautiful toh tu hai hi ✨ But what makes you truly special is your heart. Stay the same crazy, caring, emotional, and lovable sister forever. No matter where life takes us, I’ll always be there to irritate you, protect you, and laugh with you ❤️"
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
                        <p className="font-sans font-light mb-1.5" style={{ color: "rgba(196,160,170,0.45)", fontSize: "0.8rem" }}>
                          With infinite love & blessings,
                        </p>
                        <p className="font-display grad-rose" style={{ fontSize: "clamp(1rem, 4vw, 1.3rem)" }}>
                          Your Big Brother ❤️
                        </p>
                      </div>
                    </motion.div>

                  ) : (
                    <motion.div key="video"
                      initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="h-full flex flex-col items-center justify-center max-w-3xl mx-auto relative z-10 min-h-[300px]">

                      {/* Music mute notice */}
                      <p className="font-sans text-center mb-4"
                        style={{ color: "rgba(253,164,175,0.45)", fontSize: "0.65rem", letterSpacing: "0.2em" }}>
                        🎵 Background music muted while video plays
                      </p>

                      {!isVideoError ? (
                        <video
                          ref={videoRef}
                          controls
                          autoPlay
                          onError={() => setIsVideoError(true)}
                          className="w-full rounded-xl md:rounded-2xl shadow-2xl"
                          style={{ maxHeight: "55vh", border: "1px solid rgba(244,63,94,0.1)" }}
                        >
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
                            Birthday Video
                          </h4>
                          <p className="font-sans font-light leading-relaxed max-w-xs mx-auto mb-6"
                            style={{ color: "rgba(196,160,170,0.55)", fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)" }}>
                            Video abhi upload nahi hua hai — music player play karke scroll karen!
                          </p>
                          <div className="px-5 py-2.5 rounded-full border inline-block"
                            style={{ borderColor: "rgba(244,63,94,0.3)", background: "rgba(244,63,94,0.05)", color: "var(--blush)", fontSize: "0.6rem", letterSpacing: "0.3em", fontFamily: "var(--font-sans)", fontWeight: 600, textTransform: "uppercase" }}>
                            ✨ Music player — bottom right ✨
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default VideoSection;