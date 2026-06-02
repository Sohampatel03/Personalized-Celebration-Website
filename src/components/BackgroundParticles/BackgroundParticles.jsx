import { useMemo } from "react";

const BackgroundParticles = () => {
  // Generate random particles once using useMemo to avoid re-renders on every scroll/state-change
  const particles = useMemo(() => {
    return [...Array(40)].map((_, i) => {
      const isHeart = i % 3 === 0;
      const size = Math.random() * (isHeart ? 16 : 8) + 4;
      return {
        id: i,
        isHeart,
        size,
        left: `${Math.random() * 100}%`,
        bottom: `-${Math.random() * 20}%`,
        delay: `${Math.random() * 20}s`,
        duration: `${Math.random() * 15 + 10}s`,
        opacity: Math.random() * 0.4 + 0.1,
      };
    });
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-zinc-950">
      {/* Decorative large backdrop gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-500/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-pink-500/10 blur-[150px] rounded-full" />

      {/* Floating Sparkles Canvas */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute origin-center select-none"
          style={{
            left: p.left,
            bottom: p.bottom,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animation: `float-upward ${p.duration} linear infinite`,
            animationDelay: p.delay,
          }}
        >
          {p.isHeart ? (
            /* Soft glowing heart */
            <svg
              viewBox="0 0 24 24"
              className="fill-pink-500/30 text-pink-500/10 drop-shadow-[0_0_8px_rgba(236,72,153,0.3)]"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            /* Twinkling star particle */
            <div 
              className="w-full h-full rounded-full bg-white/20 shadow-[0_0_10px_#ffffff] animate-pulse"
              style={{ animationDuration: `${Math.random() * 2 + 1}s` }}
            />
          )}
        </div>
      ))}

      {/* Custom keyframes for upward drifting animation */}
      <style>{`
        @keyframes float-upward {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-120vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default BackgroundParticles;