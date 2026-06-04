const photos = [
  "/images/gallery/born.webp"
];

for (let i = 1; i <= 41; i++) {
  photos.push(`/images/gallery/gallery${i}.webp`);
}

export const galleryData = photos;