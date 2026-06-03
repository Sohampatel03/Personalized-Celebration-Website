import { useEffect, useRef } from "react";

const MouseGlow = () => {
  const glowRef  = useRef(null);
  const glowRef2 = useRef(null);
  const pos      = useRef({ x: 0, y: 0 });
  const target   = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    let raf;
    const lerp = (a, b, t) => a + (b - a) * t;

    const loop = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.07);
      pos.current.y = lerp(pos.current.y, target.current.y, 0.07);

      if (glowRef.current) {
        glowRef.current.style.left  = `${pos.current.x - 280}px`;
        glowRef.current.style.top   = `${pos.current.y - 280}px`;
      }
      if (glowRef2.current) {
        glowRef2.current.style.left = `${pos.current.x - 180}px`;
        glowRef2.current.style.top  = `${pos.current.y - 180}px`;
      }
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Outer wide rose glow */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed z-0 w-[560px] h-[560px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(244,63,94,0.07) 0%, rgba(147,51,234,0.04) 40%, transparent 70%)",
          filter: "blur(20px)",
          transition: "none",
        }}
      />
      {/* Inner tight highlight */}
      <div
        ref={glowRef2}
        className="pointer-events-none fixed z-0 w-[360px] h-[360px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(244,63,94,0.05) 0%, transparent 65%)",
          filter: "blur(8px)",
          transition: "none",
        }}
      />
    </>
  );
};

export default MouseGlow;