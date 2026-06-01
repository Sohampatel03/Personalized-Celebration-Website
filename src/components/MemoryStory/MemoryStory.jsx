import { useEffect, useRef } from "react";
import gsap from "../../animations/gsapAnimations";

const MemoryStory = ({
  image,
  title,
  subtitle,
}) => {
  const sectionRef = useRef();

  useEffect(() => {
    const section = sectionRef.current;

    const imageEl =
      section.querySelector(".story-image");

    const textEl =
      section.querySelector(".story-content");

    gsap.fromTo(
      imageEl,
      {
        scale: 1.2,
      },
      {
        scale: 1,
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      textEl,
      {
        opacity: 0,
        y: 80,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden"
    >
      <img
        src={image}
        alt=""
        className="
        story-image
        absolute
        inset-0
        w-full
        h-full
        object-cover
        "
      />

      <div className="absolute inset-0 bg-black/50" />

      <div
        className="
        story-content
        relative
        z-10
        h-full
        flex
        flex-col
        justify-center
        items-center
        text-center
        px-6
        "
      >
        <h2 className="text-6xl md:text-8xl font-bold">
          {title}
        </h2>

        <p className="mt-6 text-xl text-zinc-300">
          {subtitle}
        </p>
      </div>
    </section>
  );
};

export default MemoryStory;