import { useMemo } from "react";

const BackgroundParticles = () => {
  const particles = useMemo(() => {
    return [...Array(52)].map((_, i) => {
      const type = i % 5; // 0=heart, 1=star, 2=dot, 3=petal, 4=sparkle
      const size = type === 0
        ? Math.random() * 18 + 8
        : type === 3
        ? Math.random() * 12 + 5
        : Math.random() * 7 + 3;
      return {
        id: i,
        type,
        size,
        left: `${Math.random() * 100}%`,
        bottom: `-${Math.random() * 25}%`,
        delay: `${Math.random() * 25}s`,
        duration: `${Math.random() * 18 + 12}s`,
        opacity: type === 0
          ? Math.random() * 0.25 + 0.08
          : Math.random() * 0.35 + 0.08,
        drift: Math.random() > 0.5 ? 1 : -1,
      };
    });
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" style={{ background: "var(--ink)" }}>
      {/* Deep atmospheric gradients */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 15% 10%, rgba(244,63,94,0.07) 0%, transparent 60%),
            radial-gradient(ellipse 60% 60% at 85% 85%, rgba(147,51,234,0.07) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 50% 50%, rgba(244,63,94,0.03) 0%, transparent 70%)
          `
        }}
      />

      {/* Subtle horizontal scan lines for depth */}
      <div
        className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.08) 2px, rgba(255,255,255,0.08) 3px)",
          backgroundSize: "100% 3px"
        }}
      />

      {/* Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: p.left,
            bottom: p.bottom,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animation: `float-up ${p.duration} linear infinite`,
            animationDelay: p.delay,
          }}
        >
          {p.type === 0 ? (
            /* Heart */
            <svg viewBox="0 0 24 24" style={{ filter: "drop-shadow(0 0 6px rgba(244,63,94,0.4))" }}>
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill="rgba(244,63,94,0.35)"
              />
            </svg>
          ) : p.type === 1 ? (
            /* 4-point star */
            <svg viewBox="0 0 24 24" style={{ filter: "drop-shadow(0 0 5px rgba(255,200,210,0.5))" }}>
              <path
                d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z"
                fill="rgba(255,220,228,0.4)"
              />
            </svg>
          ) : p.type === 2 ? (
            /* Glowing dot */
            <div
              className="w-full h-full rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 70%)",
                boxShadow: "0 0 8px rgba(255,255,255,0.3)",
              }}
            />
          ) : p.type === 3 ? (
            /* Petal */
            <svg viewBox="0 0 20 20">
              <ellipse
                cx="10" cy="10" rx="5" ry="9"
                transform="rotate(45 10 10)"
                fill="rgba(253,164,175,0.3)"
              />
            </svg>
          ) : (
            /* 6-point sparkle */
            <svg viewBox="0 0 24 24" style={{ filter: "drop-shadow(0 0 4px rgba(244,63,94,0.3))" }}>
              <path
                d="M12 1 L12.8 11.2 L23 12 L12.8 12.8 L12 23 L11.2 12.8 L1 12 L11.2 11.2 Z"
                fill="rgba(244,63,94,0.25)"
              />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
};

export default BackgroundParticles;