import { useState } from "react";

const VideoSection = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="section-padding">
        <h2 className="text-5xl font-bold text-center mb-10">
          Our Best Moments
        </h2>

        <div
          onClick={() => setOpen(true)}
          className="max-w-5xl mx-auto cursor-pointer"
        >
          <div className="rounded-3xl overflow-hidden border border-zinc-800">
            <img
              src="/images/hero/hero.webp"
              alt=""
              className="w-full h-[500px] object-cover"
            />
          </div>
        </div>
      </section>

      {open && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={() => setOpen(false)}
        >
          <video
            controls
            autoPlay
            className="w-[90%] max-w-5xl rounded-3xl"
          >
            <source
              src="/videos/birthday-video.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      )}
    </>
  );
};

export default VideoSection;