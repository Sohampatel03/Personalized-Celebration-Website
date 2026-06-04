# 🎂 Piya's Birthday Website

A premium, animated birthday surprise website built with **React + Vite**, featuring smooth scroll, cinematic animations, a memory gallery, timeline, birthday letter, and a wish-to-email feature.

---

## ✨ Features

| Section | Description |
|---|---|
| **Loader** | 3-second countdown with animated progress ring |
| **Hero** | Full-screen parallax image with animated heading |
| **Floating Memories** | Polaroid cards with lightbox modal |
| **Timeline** | Scroll-animated year-by-year photo timeline |
| **Memory Album** | Masonry gallery — 40+ photos with lightbox |
| **A Brother's Gift** | Birthday letter + video player (mutes bg music) |
| **Final Gift** | Interactive cake, blow candles, send a wish via email |
| **Music Player** | Floating background music widget |

---

## 🗂️ Project Structure

```
public/
├── images/
│   ├── hero/hero.webp          ← Hero background image
│   ├── gallery/gallery1.webp   ← Gallery photos (gallery1–gallery41 + born.webp)
│   └── timeline/memory1.webp  ← Timeline photos (memory1–memory4)
├── videos/
│   └── birthday-video.mp4      ← Birthday video (H.264 MP4)
├── music/
│   └── background.mp3          ← Background music
└── favicon.svg

src/
├── components/
│   ├── Loader/
│   ├── Hero/
│   ├── FloatingMemories/
│   ├── Timeline/
│   ├── Gallery/
│   ├── VideoSection/
│   ├── FinalGift/
│   ├── MusicPlayer/
│   ├── BackgroundParticles/
│   ├── MouseGlow/
│   └── SectionDivider/
├── data/
│   ├── galleryData.js      ← List of all gallery image paths
│   └── timelineData.js     ← Year, image, caption for each timeline entry
├── hooks/
│   └── useLenis.js         ← Smooth scroll setup
└── animations/
    └── gsapAnimations.js   ← GSAP + ScrollTrigger setup
```

---

## 🚀 Setup & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📧 Email Setup (Birthday Wish Feature)

The wish box at the end sends Piya's birthday wish to your email via **EmailJS**.

1. Create a free account at [emailjs.com](https://www.emailjs.com/)
2. Add a Gmail/Outlook service → copy **Service ID**
3. Create a template with body `{{email_body}}` → copy **Template ID**
4. Go to Account → API Keys → copy **Public Key**
5. Create `.env.local` in the project root:

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxx
```

> `.env.local` is gitignored by default — your keys are safe.

---

## 🖼️ Adding / Changing Photos

**Gallery photos** — add images to `public/images/gallery/` named `gallery1.webp`, `gallery2.webp` ... then update `src/data/galleryData.js`:

```js
for (let i = 1; i <= YOUR_COUNT; i++) {
  photos.push(`/images/gallery/gallery${i}.webp`);
}
```

**Timeline photos** — update `src/data/timelineData.js`:

```js
export const timelineData = [
  { year: "2021", image: "/images/timeline/memory1.webp", caption: "Your caption here." },
  // ...
];
```

**Hero image** — replace `public/images/hero/hero.webp`

---

## 🎬 Video

Place your birthday video at:
```
public/videos/birthday-video.mp4
```
Format: **MP4 (H.264)**. Background music auto-mutes when the video plays.

---

## 🎵 Music

Place background music at:
```
public/music/background.mp3
```

---

## 🛠️ Tech Stack

- **React 19** + **Vite 8**
- **Framer Motion** — page & component animations
- **GSAP + ScrollTrigger** — timeline scroll animations
- **Lenis** — smooth scroll
- **Tailwind CSS v4** — utility styling
- **EmailJS** — serverless email for the wish feature
- **react-confetti** — birthday confetti effect