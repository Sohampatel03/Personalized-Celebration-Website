import { useEffect, useRef } from "react";
import { timelineData } from "../../data/timelineData";
import gsap from "../../animations/gsapAnimations";

const Timeline = () => {
  const sectionRef = useRef(null);
useEffect(() => {

  const cards =
    sectionRef.current.querySelectorAll(".memory-card");

  cards.forEach((card) => {

    gsap.fromTo(
      card,
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
        },
      }
    );

    const image = card.querySelector("img");

    gsap.fromTo(
      image,
      {
        scale: 1.3,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        scrollTrigger: {
          trigger: card,
          start: "top 75%",
        },
      }
    );

  });

  gsap.utils
    .toArray(".timeline-image")
    .forEach((img) => {

      gsap.to(img, {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: img,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

    });

}, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding"
    >
      <h2 className="text-5xl text-center mb-24 font-bold">
        Our Journey
      </h2>

      <div className="max-w-6xl mx-auto space-y-40">
        {timelineData.map((item, index) => (
          <div
            key={index}
            className="memory-card grid md:grid-cols-2 gap-10 items-center"
          >
            <img
              src={item.image}
              alt=""
              loading="lazy"
              className="
timeline-image
rounded-3xl
w-full
shadow-2xl
"
            />

            <div>
              <h3 className="text-6xl font-bold text-zinc-600">
                {item.year}
              </h3>

              <p className="text-xl mt-6 text-zinc-300">
                {item.caption}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;