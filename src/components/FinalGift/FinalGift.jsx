import { useState } from "react";
import Confetti from "react-confetti";

const FinalGift = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="min-h-screen flex items-center justify-center">
      {open && <Confetti />}

      <div className="text-center">
        <button
          onClick={() => setOpen(true)}
          className="text-8xl"
        >
          🎁
        </button>

        {open && (
          <>
            <h2 className="mt-10 text-6xl font-bold">
              Happy Birthday ❤️
            </h2>

            <p className="mt-6 text-zinc-400">
              Thank you for every memory.
            </p>
          </>
        )}
      </div>
    </section>
  );
};

export default FinalGift;