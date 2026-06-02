import { useState } from "react";

import Loader from "./components/Loader/Loader";
import Hero from "./components/Hero/Hero";
import MouseGlow from "./components/MouseGlow/MouseGlow";
import FloatingMemories from "./components/FloatingMemories/FloatingMemories";
import Timeline from "./components/Timeline/Timeline";
import Gallery from "./components/Gallery/Gallery";
import VideoSection from "./components/VideoSection/VideoSection";
import FinalGift from "./components/FinalGift/FinalGift";
import BackgroundParticles from "./components/BackgroundParticles/BackgroundParticles";
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";
import SectionDivider from "./components/SectionDivider/SectionDivider";

import useLenis from "./hooks/useLenis";

function App() {
  useLenis();

  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <Loader
        onFinish={() => setLoading(false)}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-zinc-950 text-white overflow-hidden selection:bg-pink-500/30 selection:text-pink-200">
      {/* Immersive ambient star/heart particle system */}
      <BackgroundParticles />

      {/* Modern interactive mouse light pointer follow */}
      <MouseGlow />

      {/* Floating high-end music widget with bouncing waves */}
      <MusicPlayer />

      {/* Storytelling segments */}
      <Hero />

      <SectionDivider />

      <FloatingMemories />

      <SectionDivider />

      <Timeline />

      <SectionDivider />

      <Gallery />

      <SectionDivider />

      <VideoSection />

      <SectionDivider />

      <FinalGift />
    </div>
  );
}

export default App;
