import { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from "react-icons/fa";

const MusicPlayer = () => {
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Play/pause handler
  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Autoplay blocked: ", err));
    }
  };

  // Mute volume toggle
  const toggleMute = (e) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Auto-play trigger on mount (right after loader completes) + gesture fallback
  useEffect(() => {
    // Attempt play directly on mount
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.log("Initial autoplay blocked. Waiting for first user gesture:", err);
        });
    }

    const handleFirstGesture = () => {
      if (audioRef.current && !audioRef.current.paused) {
        // Already playing, clean up
        window.removeEventListener("click", handleFirstGesture);
        return;
      }

      if (audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            window.removeEventListener("click", handleFirstGesture);
          })
          .catch((err) => console.log("Autoplay blocked on click gesture:", err));
      }
    };

    window.addEventListener("click", handleFirstGesture);

    return () => {
      window.removeEventListener("click", handleFirstGesture);
    };
  }, []);

  return (
    <>
      {/* Background audio track */}
      <audio
        ref={audioRef}
        loop
        src="/music/background.mp3"
      />

      {/* Floating glassmorphic player capsule */}
      <div 
        onClick={togglePlay}
        className="
          fixed
          bottom-6
          right-6
          z-50
          flex
          items-center
          gap-4
          pl-5
          pr-4
          py-3
          rounded-full
          border
          border-zinc-800/80
          bg-zinc-900/60
          backdrop-blur-xl
          shadow-2xl
          hover:shadow-[0_0_30px_rgba(236,72,153,0.3)]
          hover:border-pink-500/30
          cursor-pointer
          select-none
          group
          transition-all
          duration-500
        "
      >
        {/* Equalizer Wave bar visualizer */}
        <div className="flex items-end gap-1.5 h-6 w-8">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="w-1 rounded-full bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.5)] origin-bottom transition-all duration-300"
              style={{
                height: isPlaying ? "100%" : "20%",
                animation: isPlaying 
                  ? `equalizer-bounce ${0.6 + i * 0.15}s ease-in-out infinite alternate`
                  : "none"
              }}
            />
          ))}
        </div>

        {/* Dynamic State Info */}
        <div className="flex flex-col text-left">
          <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">
            Birthday Song
          </span>
          <span className="text-[11px] font-bold text-white tracking-wide truncate max-w-20 group-hover:text-pink-400 transition-colors duration-300">
            {isPlaying ? "Playing..." : "Paused"}
          </span>
        </div>

        {/* Audio Control Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Mute toggle button */}
          <button
            onClick={toggleMute}
            className="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-700/80 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            {isMuted ? <FaVolumeMute size={11} /> : <FaVolumeUp size={11} />}
          </button>

          {/* Toggle play circle */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 group-hover:from-pink-400 group-hover:to-purple-400 flex items-center justify-center text-white border border-pink-400/20 shadow-md group-hover:scale-105 transition-all duration-300">
            {isPlaying ? <FaPause size={12} /> : <FaPlay size={12} className="ml-0.5" />}
          </div>
        </div>
      </div>

      {/* Bounce custom animation style */}
      <style>{`
        @keyframes equalizer-bounce {
          0% {
            transform: scaleY(0.25);
          }
          100% {
            transform: scaleY(1);
          }
        }
      `}</style>
    </>
  );
};

export default MusicPlayer;