import { useEffect, useRef } from "react";
import { timelineData } from "../../data/timelineData";
import gsap from "../../animations/gsapAnimations";

const Timeline = () => {
  const containerRef = useRef(null);
  const progressLineRef = useRef(null);

  useEffect(() => {
    // 1. Central Line Drawing scroll trigger
    gsap.fromTo(
      progressLineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 20%",
          end: "bottom 80%",
          scrub: true,
        },
      }
    );

    // 2. Animate cards staggered entrance
    const items = containerRef.current.querySelectorAll(".timeline-item");
    items.forEach((item) => {
      // Slide in from left/right based on order
      const cardPolaroid = item.querySelector(".polaroid-wrapper");
      const cardText = item.querySelector(".text-wrapper");

      gsap.fromTo(
        cardPolaroid,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
          }
        }
      );

      gsap.fromTo(
        cardText,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 75%",
          }
        }
      );

      // Year indicator pulse
      const dot = item.querySelector(".timeline-dot");
      if (dot) {
        gsap.fromTo(
          dot,
          { scale: 0.8, backgroundColor: "#27272a" },
          {
            scale: 1.4,
            backgroundColor: "#ec4899",
            borderColor: "#f472b6",
            scrollTrigger: {
              trigger: item,
              start: "top 60%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative section-padding overflow-hidden bg-zinc-950"
    >
      {/* Background soft glow blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-32 relative z-10">
        <span className="text-pink-400 font-bold tracking-[4px] text-xs uppercase mb-3 block">
          ✨ A Journey Through Time ✨
        </span>
        <h2 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6 glow-text-pink">
          Our Growing Years
        </h2>
        <p className="text-zinc-400 font-light max-w-xl mx-auto text-sm md:text-base leading-relaxed">
          Every year is a milestone of shared laughter, silly arguments, and warm blessings. Here is a timeline of our beautiful adventure.
        </p>
      </div>

      {/* Timeline pathway structure */}
      <div className="relative max-w-6xl mx-auto">
        {/* Core Vertical Thread (Desktop only) */}
        <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-[2px] bg-zinc-800/80 pointer-events-none hidden md:block">
          {/* Animated Neon pink progress bar */}
          <div
            ref={progressLineRef}
            className="w-full h-full bg-gradient-to-b from-pink-500 via-pink-400 to-purple-500 origin-top shadow-[0_0_15px_rgba(236,72,153,0.6)]"
            style={{ transformOrigin: "top" }}
          />
        </div>

        {/* Timeline Items Grid */}
        <div className="space-y-24 md:space-y-36 relative z-10">
          {timelineData.map((item, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={index}
                className="timeline-item grid md:grid-cols-2 gap-10 md:gap-16 items-center relative"
              >
                {/* Visual Connector Dot for Desktop */}
                <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20 pointer-events-none hidden md:block">
                  <div className="timeline-dot w-4 h-4 rounded-full border-2 border-zinc-700 bg-zinc-800 shadow-xl transition-all duration-500" />
                </div>

                {/* Polaroid Picture division (Always stacked first on mobile) */}
                <div className={`polaroid-wrapper flex justify-center w-full order-1 ${
                  isLeft ? "md:order-1 md:justify-end" : "md:order-2 md:justify-start"
                }`}>
                  <div className="w-full max-w-[420px] rounded-[32px] overflow-hidden shadow-2xl border border-zinc-800/80 bg-zinc-900/30 backdrop-blur-md p-4 transition-all duration-300 hover:border-pink-500/25 hover:shadow-[0_0_30px_rgba(236,72,153,0.1)]">
                    <div className="relative rounded-2xl overflow-hidden h-[240px] md:h-[280px] bg-zinc-950">
                      <img
                        src={item.image}
                        alt=""
                        loading="lazy"
                        className="w-full h-full object-cover filter brightness-[0.9] hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  </div>
                </div>

                {/* Text Content division (Always stacked second on mobile) */}
                <div className={`text-wrapper flex justify-center w-full order-2 ${
                  isLeft ? "md:order-2 md:justify-start" : "md:order-1 md:justify-end"
                }`}>
                  <div className="w-full max-w-[420px] p-8 md:p-10 rounded-[32px] border border-zinc-800/60 bg-zinc-900/10 backdrop-blur-sm relative overflow-hidden group hover:border-zinc-800 transition-colors duration-300">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/5 blur-[30px] rounded-full pointer-events-none" />
                    
                    {/* Glowing Large Outlined Year */}
                    <h3 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-zinc-800 to-zinc-900 tracking-tighter group-hover:from-pink-500/20 group-hover:to-purple-500/20 transition-all duration-500 select-none">
                      {item.year}
                    </h3>
                    
                    <div className="w-12 h-[2px] bg-pink-500/40 mt-3 mb-5" />
                    
                    {/* Clean readable alignment */}
                    <p className="text-base md:text-lg text-zinc-300 leading-relaxed font-light text-justify">
                      {item.caption}
                    </p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Timeline;