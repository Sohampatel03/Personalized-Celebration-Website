import { useEffect, useRef } from "react";
import { timelineData } from "../../data/timelineData";
import gsap from "../../animations/gsapAnimations";

const Timeline = () => {
  const containerRef    = useRef(null);
  const progressLineRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(progressLineRef.current, { scaleY: 0 }, {
      scaleY: 1, ease: "none",
      scrollTrigger: { trigger: containerRef.current, start: "top 25%", end: "bottom 75%", scrub: true },
    });

    const items = containerRef.current.querySelectorAll(".timeline-item");
    items.forEach((item) => {
      const polaroid = item.querySelector(".polaroid-wrapper");
      const textEl   = item.querySelector(".text-wrapper");
      const dot      = item.querySelector(".timeline-dot");

      gsap.fromTo(polaroid, { opacity: 0, y: 45, scale: 0.96 }, {
        opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: item, start: "top 85%" }
      });
      gsap.fromTo(textEl, { opacity: 0, y: 55 }, {
        opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: item, start: "top 82%" }
      });
      if (dot) {
        gsap.fromTo(dot, { scale: 0.5, backgroundColor: "rgba(255,255,255,0.04)" }, {
          scale: 1.25, backgroundColor: "var(--rose)", borderColor: "var(--blush)",
          boxShadow: "0 0 18px rgba(244,63,94,0.5)",
          scrollTrigger: { trigger: item, start: "top 62%", toggleActions: "play none none reverse" }
        });
      }
    });
  }, []);

  return (
    <section ref={containerRef} className="relative overflow-hidden" style={{ background: "var(--ink)", padding: "clamp(80px,12vw,160px) clamp(5%,8%,8%) clamp(80px,12vw,140px)" }}>

      {/* Ambient blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full blur-[150px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(147,51,234,0.04) 0%, transparent 70%)" }} />

      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-16 md:mb-32 relative z-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-8 h-px" style={{ background: "linear-gradient(to right, transparent, var(--rose))" }} />
          <span className="font-sans font-medium uppercase"
            style={{ color: "var(--blush)", opacity: 0.65, fontSize: "clamp(0.55rem, 2vw, 0.68rem)", letterSpacing: "0.4em" }}>
            A Journey Through Time
          </span>
          <div className="w-8 h-px" style={{ background: "linear-gradient(to left, transparent, var(--rose))" }} />
        </div>
        <h2 className="font-display grad-blush glow-rose leading-none mb-5"
          style={{ fontSize: "clamp(2.4rem, 9vw, 6rem)", letterSpacing: "-0.02em" }}>
          Our Growing Years
        </h2>
        <p className="font-sans font-light leading-relaxed max-w-xl mx-auto"
          style={{ color: "rgba(196,160,170,0.55)", fontSize: "clamp(0.8rem, 3vw, 1rem)" }}>
          Every year is a milestone of shared laughter, silly arguments, and warm blessings.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative max-w-5xl mx-auto">

        {/* Vertical line — desktop only */}
        <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-px hidden md:block"
          style={{ background: "rgba(255,255,255,0.04)" }}>
          <div ref={progressLineRef} className="w-full h-full origin-top"
            style={{ background: "linear-gradient(to bottom, var(--rose), var(--plum))", boxShadow: "0 0 10px rgba(244,63,94,0.35)" }} />
        </div>

        {/* Mobile: left border line */}
        <div className="absolute left-4 top-0 bottom-0 w-px block md:hidden"
          style={{ background: "linear-gradient(to bottom, var(--rose), var(--plum))", opacity: 0.3 }} />

        <div className="space-y-16 md:space-y-36 relative z-10">
          {timelineData.map((item, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div key={index} className="timeline-item relative">

                {/* Desktop connector dot */}
                <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20 hidden md:block">
                  <div className="timeline-dot w-3.5 h-3.5 rounded-full border-2 transition-all duration-500"
                    style={{ borderColor: "rgba(244,63,94,0.3)", background: "var(--ink)" }} />
                </div>

                {/* Mobile: left dot */}
                <div className="absolute left-3 top-5 z-20 block md:hidden">
                  <div className="timeline-dot w-2.5 h-2.5 rounded-full border-2"
                    style={{ borderColor: "rgba(244,63,94,0.4)", background: "var(--ink)" }} />
                </div>

                {/* Mobile layout: single column, indent from left line */}
                <div className="block md:hidden pl-10">
                  <div className="polaroid-wrapper mb-5">
                    <div className="rounded-2xl overflow-hidden shadow-xl"
                      style={{ background: "rgba(14,8,15,0.6)", border: "1px solid rgba(244,63,94,0.1)" }}>
                      <div className="relative h-52 overflow-hidden">
                        <img src={item.image} alt="" loading="lazy"
                          className="w-full h-full object-cover"
                          style={{ filter: "brightness(0.87) saturate(1.1)" }} />
                        {/* Year chip */}
                        <div className="absolute top-3 left-3">
                          <span className="font-sans font-semibold px-2.5 py-1 rounded-full"
                            style={{ background: "rgba(244,63,94,0.15)", border: "1px solid rgba(244,63,94,0.3)", color: "var(--blush)", fontSize: "0.7rem", letterSpacing: "0.05em" }}>
                            {item.year}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-wrapper">
                    <div className="font-display leading-none mb-2 select-none"
                      style={{ fontSize: "clamp(3rem, 14vw, 5rem)", letterSpacing: "-0.03em", background: "linear-gradient(135deg, rgba(244,63,94,0.14) 0%, rgba(147,51,234,0.09) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                      {item.year}
                    </div>
                    <div className="w-8 h-px mb-3" style={{ background: "linear-gradient(to right, var(--rose), transparent)" }} />
                    <p className="font-serif font-light leading-relaxed"
                      style={{ color: "rgba(196,160,170,0.75)", fontStyle: "italic", fontSize: "0.95rem" }}>
                      {item.caption}
                    </p>
                  </div>
                </div>

                {/* Desktop layout: two columns */}
                <div className={`hidden md:grid grid-cols-2 gap-16 items-center`}>
                  {/* Image side */}
                  <div className={`polaroid-wrapper flex justify-center ${isLeft ? "order-1 justify-end" : "order-2 justify-start"}`}>
                    <div className="w-full max-w-[400px] rounded-3xl overflow-hidden shadow-2xl p-4 transition-all duration-500 hover:shadow-[0_0_40px_rgba(244,63,94,0.1)]"
                      style={{ background: "rgba(14,8,15,0.6)", border: "1px solid rgba(244,63,94,0.1)", backdropFilter: "blur(20px)" }}>
                      <div className="relative rounded-2xl overflow-hidden h-64">
                        <img src={item.image} alt="" loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                          style={{ filter: "brightness(0.88) saturate(1.1)" }} />
                        <div className="absolute top-4 left-4">
                          <span className="font-sans font-semibold px-3 py-1.5 rounded-full"
                            style={{ background: "rgba(244,63,94,0.15)", border: "1px solid rgba(244,63,94,0.3)", color: "var(--blush)", fontSize: "0.72rem" }}>
                            {item.year}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Text side */}
                  <div className={`text-wrapper flex justify-center ${isLeft ? "order-2 justify-start" : "order-1 justify-end"}`}>
                    <div className="w-full max-w-[380px] p-8">
                      <div className="font-display leading-none mb-4 select-none"
                        style={{ fontSize: "clamp(4rem, 9vw, 7.5rem)", letterSpacing: "-0.03em", background: "linear-gradient(135deg, rgba(244,63,94,0.13) 0%, rgba(147,51,234,0.08) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                        {item.year}
                      </div>
                      <div className="w-10 h-px mb-5" style={{ background: "linear-gradient(to right, var(--rose), transparent)" }} />
                      <p className="font-serif font-light leading-relaxed text-justify"
                        style={{ color: "rgba(196,160,170,0.75)", fontStyle: "italic", fontSize: "1.05rem" }}>
                        {item.caption}
                      </p>
                    </div>
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