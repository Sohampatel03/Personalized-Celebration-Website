import { useState } from "react";

import Loader from "./components/Loader/Loader";
import Hero from "./components/Hero/Hero";
import MouseGlow from "./components/MouseGlow/MouseGlow";

import FloatingMemories from "./components/FloatingMemories/FloatingMemories";
import MemoryStory from "./components/MemoryStory/MemoryStory";
import Gallery from "./components/Gallery/Gallery";
import VideoSection from "./components/VideoSection/VideoSection";
import FinalGift from "./components/FinalGift/FinalGift";

import { storyData } from "./data/storyData";

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
<> <MouseGlow />

```
  <Hero />

  <FloatingMemories />

  {storyData.map((item, index) => (
    <MemoryStory
      key={index}
      image={item.image}
      title={item.title}
      subtitle={item.subtitle}
    />
  ))}

  <Gallery />

  <VideoSection />

  <FinalGift />
</>


);
}

export default App;
