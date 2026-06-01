import { useEffect, useRef } from "react";

const MouseGlow = () => {
  const glowRef = useRef(null);

  useEffect(() => {
    const move = (e) => {
      if (!glowRef.current) return;

      glowRef.current.style.left = `${e.clientX - 250}px`;
      glowRef.current.style.top = `${e.clientY - 250}px`;
    };

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="
      pointer-events-none
      fixed
      z-0
      w-[500px]
      h-[500px]
      rounded-full
      blur-[150px]
      "
      style={{
        background:
          "radial-gradient(circle, rgba(168,85,247,.18), transparent 70%)",
      }}
    />
  );
};

export default MouseGlow;