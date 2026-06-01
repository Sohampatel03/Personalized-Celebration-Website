import { galleryData } from "../../data/galleryData";

const Gallery = () => {
  return (
    <section className="section-padding">
      <h2 className="text-5xl text-center font-bold mb-20">
        Memory Gallery
      </h2>

      <div
        className="columns-2 md:columns-3 gap-4"
      >
        {galleryData.map((img, index) => (
          <img
            key={index}
            src={img}
            loading="lazy"
            alt=""
            className="mb-4 rounded-2xl hover:scale-[1.03] transition duration-500"
          />
        ))}
      </div>
    </section>
  );
};

export default Gallery;