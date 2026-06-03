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
    <section ref={containerRef} className="relative overflow-hidden" style={{ background: "linear-gradient(to bottom, var(--ink), #100711 45%, var(--ink))", padding: "clamp(76px,12vw,160px) clamp(4%,6%,8%) clamp(80px,12vw,140px)" }}>

      {/* Ambient blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full blur-[150px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(147,51,234,0.04) 0%, transparent 70%)" }} />

      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-12 md:mb-32 relative z-10">
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

        {/* Mobile: left gradient line */}
        <div className="absolute top-0 bottom-0 block md:hidden"
          style={{ left: "24px", width: "2px", background: "linear-gradient(to bottom, rgba(244,63,94,0.15), var(--rose), var(--plum), rgba(147,51,234,0.12))", opacity: 0.8, borderRadius: "2px", boxShadow: "0 0 18px rgba(244,63,94,0.18)" }} />

        <div className="space-y-12 md:space-y-36 relative z-10">
          {timelineData.map((item, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div key={index} className="timeline-item relative">

                {/* Desktop connector dot */}
                <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20 hidden md:block">
                  <div className="timeline-dot w-3.5 h-3.5 rounded-full border-2 transition-all duration-500"
                    style={{ borderColor: "rgba(244,63,94,0.3)", background: "var(--ink)" }} />
                </div>

                {/* ── MOBILE layout — redesigned ── */}
                <div className="block md:hidden pl-11 pr-0">
                  {/* Left dot — aligned with the line at left:28px */}
                  <div className="absolute top-6 z-20 block md:hidden"
                    style={{ left: "16px" }}>
                    <div className="timeline-dot w-4 h-4 rounded-full border-2"
                      style={{ borderColor: "rgba(253,164,175,0.55)", background: "var(--ink)", boxShadow: "0 0 0 7px rgba(244,63,94,0.08)" }} />
                  </div>

                  {/* Year badge floating above the card */}
                  <div className="text-wrapper mb-4 max-w-[340px] mx-auto rounded-2xl px-4 py-3 flex items-center gap-3"
                    style={{ background: "rgba(14,8,15,0.58)", border: "1px solid rgba(253,164,175,0.1)", backdropFilter: "blur(14px)" }}>
                    <span className="font-display grad-rose leading-none select-none"
                      style={{ fontSize: "clamp(2.65rem, 12vw, 3.8rem)", letterSpacing: "-0.03em",
                        background: "linear-gradient(135deg, rgba(244,63,94,0.7) 0%, rgba(147,51,234,0.5) 100%)",
                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                      {item.year}
                    </span>
                    <div className="h-px flex-1 self-center" style={{ background: "linear-gradient(to right, var(--rose), transparent)", opacity: 0.35 }} />
                    <span className="font-sans uppercase"
                      style={{ color: "rgba(253,164,175,0.52)", fontSize: "0.58rem", letterSpacing: "0.28em" }}>
                      Memory
                    </span>
                  </div>

                  {/* Image card */}
                  <div className="polaroid-wrapper flex justify-center">
                    <div className="w-full max-w-[340px] rounded-[28px] overflow-hidden shadow-[0_22px_70px_rgba(0,0,0,0.45)] relative p-3"
                      style={{ background: "linear-gradient(145deg, rgba(21,10,23,0.92), rgba(8,3,10,0.98))", border: "1px solid rgba(253,164,175,0.13)", backdropFilter: "blur(18px)" }}>
                      <div className="relative overflow-hidden rounded-[22px]" style={{ aspectRatio: "3 / 4", background: "rgba(8,3,10,0.82)" }}>
                        <img src={item.image} alt="" loading="lazy"
                          className="w-full h-full object-contain"
                          style={{ filter: "brightness(0.82) saturate(1.15)" }} />
                        {/* Gradient bottom for text readability */}
                        <div className="absolute inset-0"
                          style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(14,8,15,0.7) 100%)" }} />
                        {/* Year chip inside image */}
                        <div className="absolute top-4 right-4">
                          <span className="font-sans font-semibold px-2.5 py-1 rounded-full"
                            style={{ background: "rgba(8,3,10,0.52)", border: "1px solid rgba(253,164,175,0.24)", color: "var(--blush)", fontSize: "0.68rem", letterSpacing: "0.04em", backdropFilter: "blur(8px)" }}>
                            {item.year}
                          </span>
                        </div>
                      </div>
                      <div className="text-wrapper px-1 pt-4 pb-1">
                        <div className="w-9 h-px mb-3" style={{ background: "linear-gradient(to right, var(--rose), transparent)" }} />
                        <p className="font-serif font-light leading-relaxed"
                          style={{ color: "rgba(255,241,242,0.78)", fontStyle: "italic", fontSize: "clamp(0.95rem, 3.8vw, 1.06rem)" }}>
                          {item.caption}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Desktop layout: two columns */}
                <div className={`hidden md:grid grid-cols-2 gap-16 items-center`}>
                  {/* Image side */}
                  <div className={`polaroid-wrapper flex justify-center ${isLeft ? "order-1 justify-end" : "order-2 justify-start"}`}>
                    <div className="w-full max-w-[340px] rounded-[28px] overflow-hidden shadow-2xl p-3 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_28px_80px_rgba(244,63,94,0.13)]"
                      style={{ background: "linear-gradient(145deg, rgba(24,12,26,0.78), rgba(8,3,10,0.9))", border: "1px solid rgba(253,164,175,0.14)", backdropFilter: "blur(22px)" }}>
                      <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: "2 / 3", background: "rgba(8,3,10,0.75)" }}>
                        <img src={item.image} alt="" loading="lazy"
                          className="w-full h-full object-contain"
                          style={{ filter: "brightness(0.88) saturate(1.1)" }} />
                        <div className="absolute top-4 left-4">
                          <span className="font-sans font-semibold px-3 py-1.5 rounded-full"
                            style={{ background: "rgba(8,3,10,0.48)", border: "1px solid rgba(253,164,175,0.25)", color: "var(--blush)", fontSize: "0.72rem", backdropFilter: "blur(8px)" }}>
                            {item.year}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Text side */}
                  <div className={`text-wrapper flex justify-center ${isLeft ? "order-2 justify-start" : "order-1 justify-end"}`}>
                    <div className="w-full max-w-[400px] p-8 rounded-[28px]"
                      style={{ background: "linear-gradient(145deg, rgba(14,8,15,0.34), rgba(14,8,15,0.08))", border: "1px solid rgba(253,164,175,0.08)" }}>
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
