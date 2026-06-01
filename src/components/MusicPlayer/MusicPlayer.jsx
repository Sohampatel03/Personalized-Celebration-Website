import { useRef } from "react";

const MusicPlayer = () => {
  const audioRef = useRef();

  const playMusic = () => {
    audioRef.current.play();
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop
        src="/music/background.mp3"
      />

      <button
        onClick={playMusic}
        className="
        fixed
        bottom-6
        right-6
        z-50
        bg-white
        text-black
        px-4
        py-2
        rounded-full
        "
      >
        Music
      </button>
    </>
  );
};

export default MusicPlayer;