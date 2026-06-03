import { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from "react-icons/fa";

const MusicPlayer = () => {
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted,   setIsMuted]   = useState(false);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) { audioRef.current.pause(); setIsPlaying(false); }
    else audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    audioRef.current?.play().then(() => setIsPlaying(true)).catch(() => {});
    const handle = () => {
      if (audioRef.current && !audioRef.current.paused) { window.removeEventListener("click", handle); return; }
      audioRef.current?.play().then(() => { setIsPlaying(true); window.removeEventListener("click", handle); }).catch(() => {});
    };
    window.addEventListener("click", handle);
    return () => window.removeEventListener("click", handle);
  }, []);

  return (
    <>
      <audio ref={audioRef} loop src="/music/background.mp3" />

      {/* Player — larger tap targets on mobile */}
      <div onClick={togglePlay}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex items-center gap-3 cursor-pointer select-none transition-all duration-400"
        style={{
          padding: "10px 12px 10px 14px",
          borderRadius: "50px",
          background: "rgba(10,5,11,0.8)",
          border: "1px solid rgba(244,63,94,0.18)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 6px 28px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)",
          WebkitTapHighlightColor: "transparent",
        }}>

        {/* Equalizer bars */}
        <div className="flex items-end gap-[3px]" style={{ height: "18px", width: "24px" }}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="rounded-full origin-bottom"
              style={{
                width: "4px",
                height: isPlaying ? "100%" : "20%",
                background: "linear-gradient(to top, var(--rose), var(--blush))",
                boxShadow: isPlaying ? "0 0 5px rgba(244,63,94,0.45)" : "none",
                animation: isPlaying ? `eq-bounce ${0.55 + i * 0.12}s ease-in-out infinite alternate` : "none",
                transition: "height 0.3s ease"
              }} />
          ))}
        </div>

        {/* Label — hidden on very small screens */}
        <div className="hidden sm:flex flex-col">
          <span className="font-sans font-medium uppercase" style={{ color: "rgba(196,160,170,0.4)", fontSize: "0.58rem", letterSpacing: "0.32em" }}>
            Birthday Song
          </span>
          <span className="font-sans font-medium transition-colors duration-300"
            style={{ color: isPlaying ? "var(--blush)" : "rgba(196,160,170,0.5)", fontSize: "0.65rem" }}>
            {isPlaying ? "Playing…" : "Paused"}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          <button onClick={toggleMute}
            className="flex items-center justify-center rounded-full transition-colors cursor-pointer"
            style={{ width: "28px", height: "28px", background: "rgba(244,63,94,0.08)", border: "1px solid rgba(244,63,94,0.15)" }}>
            {isMuted
              ? <FaVolumeMute size={10} color="rgba(196,160,170,0.55)" />
              : <FaVolumeUp   size={10} color="rgba(196,160,170,0.55)" />
            }
          </button>

          <div className="flex items-center justify-center rounded-full transition-all duration-300"
            style={{
              width: "34px", height: "34px",
              background: "linear-gradient(135deg, var(--rose), var(--plum))",
              border: "1px solid rgba(244,63,94,0.3)",
              boxShadow: "0 0 14px rgba(244,63,94,0.22)"
            }}>
            {isPlaying
              ? <FaPause size={10} color="#fff" />
              : <FaPlay  size={10} color="#fff" style={{ marginLeft: "1px" }} />
            }
          </div>
        </div>
      </div>

      <style>{`
        @keyframes eq-bounce { 0% { transform: scaleY(0.18); } 100% { transform: scaleY(1); } }
      `}</style>
    </>
  );
};

export default MusicPlayer;