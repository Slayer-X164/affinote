"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, Variants } from "motion/react";

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.6,
    },
  },
};

const item: Variants = {
  hidden: {
    scale: 2,
    opacity: 0,
  },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      ease: "backInOut",
      duration: 0.6,
    },
  },
};

type AppreciationFriendProptype = {
  photo_text_1?: string;
  photo_1?: string;
  photo_text_2?: string;
  photo_2?: string;
  photo_text_3?: string;
  photo_3?: string;
  end_message?: string;
  audio_src?: string; // Path to your audio file inside public/
};

export default function AppreciationFriend({
  photo_text_1 = "day at college",
  photo_1 = "https://i.pinimg.com/1200x/01/7c/04/017c04c42e32a0a774fed4fe54c4a3a5.jpg",

  photo_text_2 = "our cafe hops",
  photo_2 = "https://i.pinimg.com/736x/53/21/16/5321167fe285f106a7630ccf1e527b1d.jpg",

  photo_text_3 = "Random hangout",
  photo_3 = "https://i.pinimg.com/736x/3b/2e/a2/3b2ea263064478864d4349a6211a4443.jpg",

  audio_src = "/AppFriend/memories.mp3",

  end_message = ` I was just thinking about how much I appreciate having you in my life. No matter how much time passes, nothing ever changes between us, and I love that. Thanks for being the one person I can always be 100% myself around, no filters needed. You’ve been there for the big wins and the messy days, and it means the world to me. Life is just a lot better and way funnier with you in my corner. I don’t say it enough, but thanks for being the best friend I could ask for. You’re stuck with me forever , just thought you should know! no filters needed. You’ve been there for the big wins and the messy days, and it means the world to me. Life is just a lot better and way funnier with you in my corner.`,
}: AppreciationFriendProptype) {
  const [phase, setPhase] = useState<"ph1" | "ph2" | "ph3">("ph1");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Audio playback error:", err));
    }
  };

  return (
    <div className="w-full overflow-hidden min-h-screen bg-[#fdf9e8] flex justify-center items-center">
      {/* Background Audio */}
      <audio ref={audioRef} src={audio_src} loop preload="auto" />

      <AnimatePresence mode="wait">
        {/* PHASE 1: Retro Mixtape / Cassette Deck Intro */}
        {phase === "ph1" && (
          <motion.div
            key="ph1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              ease: "backInOut",
              duration: 0.6,
            }}
            className="w-full h-full flex flex-col items-center justify-center gap-4 relative px-4"
          >
            <motion.img
              src="/AppFriend/hi.gif"
              alt="bear"
              className="w-36 drop-shadow-sm transform translate-y-5 z-1"
            />

            {/* Vintage Cassette Card */}
            <div className="w-80 sm:w-96 z-20 bg-[#dda58a] rounded-3xl p-5 shadow-2xl border-4 border-[#4a2420] flex flex-col items-center gap-4">
              {/* Tape Label Header */}
              <div className="w-full bg-[#f3e299] border-2 border-[#4a2420] rounded-xl pt-2 pb-1 px-3 flex justify-between items-center text-[#4b421c] font-mono text-xs font-bold tracking-wider">
                <span>SONG:MEMORIES</span>
                <span className={isPlaying ? "text-red-600 animate-pulse" : ""}>
                  {isPlaying ? "PLAYING ❚❚" : "PAUSED ▶"}
                </span>
              </div>

              {/* Tape Spool Display */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={toggleMusic}
                className="w-full bg-[#3c2a21] rounded-2xl p-4 flex items-center justify-around cursor-pointer border-2 border-[#4a2420] shadow-inner select-none"
              >
                {/* Left Spool */}
                <motion.div
                  animate={{ rotate: isPlaying ? 360 : 0 }}
                  transition={{
                    repeat: isPlaying ? Infinity : 0,
                    duration: 2,
                    ease: "linear",
                  }}
                  className="w-14 h-14 rounded-full border-4 border-dashed border-[#e6c280] bg-[#1a120b] flex items-center justify-center text-xs text-[#e6c280] font-mono"
                >
                  ✿
                </motion.div>

                <div className="flex flex-col items-center">
                  <span className="text-[#f3e299] font-mono text-xs tracking-widest font-semibold uppercase">
                    {isPlaying ? "Tap to Pause" : "Tap to Play"}
                  </span>

                </div>

                {/* Right Spool */}
                <motion.div
                  animate={{ rotate: isPlaying ? 360 : 0 }}
                  transition={{
                    repeat: isPlaying ? Infinity : 0,
                    duration: 2,
                    ease: "linear",
                  }}
                  className="w-14 h-14 rounded-full border-4 border-dashed border-[#e6c280] bg-[#1a120b] flex items-center justify-center text-xs text-[#e6c280] font-mono"
                >
                  ✿
                </motion.div>
              </motion.div>

              <p className="text-sm font-mono font-semibold text-[#4a2420] text-center px-2">
                {isPlaying
                  ? "Track playing! Press continue to view our moments."
                  : "Click the cassette to start the music!"}
              </p>

              {/* Next Phase Button */}
              <button
                onClick={() => {
                  // Auto-start audio on continue if not already playing
                  if (!isPlaying && audioRef.current) {
                    audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
                  }
                  setPhase("ph2");
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-[#794f06] hover:scale-105 active:scale-95 text-[#f7efcf] font-sans cursor-pointer font-bold text-sm tracking-wider uppercase border-2 border-[#4a2420] shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Continue to timeline</span>
                <span>➔</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* PHASE 2 */}
        {phase === "ph2" && (
          <motion.div
            key="ph2"
            onLoad={() => {
              setTimeout(() => {
                setPhase("ph3");
              }, 7000);
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              ease: "backInOut",
              duration: 0.6,
            }}
            className="flex flex-col justify-center items-center w-full min-h-screen py-20 relative"
          >
            <img
              src="/AppFriend/decor1.svg"
              alt=""
              className="absolute left-0 top-0 rotate-180"
            />
            <img
              src="/AppFriend/decor1.svg"
              alt=""
              className="absolute right-0 top-0 rotate-270"
            />
            <img
              src="/AppFriend/decor1.svg"
              alt=""
              className="absolute left-0 bottom-0 rotate-90"
            />
            <img
              src="/AppFriend/decor1.svg"
              alt=""
              className="absolute right-0 bottom-0"
            />

            {/* Stage wrapper */}
            <div className="w-80 h-80 relative flex items-center justify-center">
              {/* Continuously Rotating Disc Layer */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 8,
                  ease: "linear",
                }}
                style={{
                  backgroundImage: 'url("/AppFriend/disc.png")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                className="absolute inset-0 w-80 h-80 rounded-full shadow-2xl pointer-events-none"
              />

              {/* Photos Stagger Container (Stationary & Staggered Animations) */}
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="w-full h-full relative"
              >
                {/* Photo 1 */}
                <motion.div
                  variants={item}
                  className="bg-white shadow-xl shadow-neutral-800/20 p-4 w-50 scale-85 md:scale-100 h-66 flex flex-col gap-4 items-center justify-start absolute rotate-12 -top-40"
                >
                  <img
                    src="/AppFriend/star.png"
                    alt="star"
                    className="w-16 fixed -left-3 -top-3"
                  />
                  <div
                    style={{
                      backgroundImage: `url(${photo_1})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    className="w-44 h-46"
                  />
                  <h3 className="text-[#615b41] font-mono font-semibold text-md">
                    {photo_text_1}
                  </h3>
                </motion.div>

                {/* Photo 2 */}
                <motion.div
                  variants={item}
                  className="bg-white shadow-xl shadow-neutral-800/20 p-4 w-50 scale-85 md:scale-100 h-66 flex flex-col gap-4 items-center justify-start absolute -right-6 md:-right-10 -rotate-6"
                >
                  <img
                    src="/AppFriend/cat2.png"
                    alt=""
                    className="fixed -bottom-5 -right-10 w-20"
                  />
                  <div
                    style={{
                      backgroundImage: `url(${photo_2})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    className="w-44 h-46"
                  />
                  <h3 className="text-[#615b41] font-mono font-semibold text-md">
                    {photo_text_2}
                  </h3>
                </motion.div>

                {/* Photo 3 */}
                <motion.div
                  variants={item}
                  className="bg-white shadow-xl shadow-neutral-800/20 p-4 w-50 scale-85 md:scale-100 h-66 flex flex-col gap-4 items-center justify-start absolute right-30 md:right-34 rotate-6 -bottom-40"
                >
                  <img
                    src="/AppFriend/cat.png"
                    alt=""
                    className="fixed -bottom-2 -left-10 w-20"
                  />
                  <div
                    style={{
                      backgroundImage: `url(${photo_3})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    className="w-44 h-46"
                  />
                  <h3 className="text-[#615b41] font-mono font-semibold text-md">
                    {photo_text_3}
                  </h3>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* PHASE 3 */}
        {phase === "ph3" && (
          <motion.div
            key="ph3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              ease: "backInOut",
              duration: 0.6,
            }}
            className="px-4 pb-6 flex flex-col items-center justify-center"
          >
            <img
              src="https://media.tenor.com/TRSYCx4GnGoAAAAj/budding-pop-friends.gif"
              alt="high five gif"
              className="w-50 translate-y-1"
            />
            <div className="rounded-2xl border-3 border-[#beab54] text-[#4b421c] max-w-[500px] text-md font-mono font-semibold px-4 py-10 min-h-60 bg-[#f3e299] text-center relative wrap-words">
              <img
                src="https://i.pinimg.com/originals/af/1f/9d/af1f9d34e42a47edf37a27417977c8d5.png"
                alt=""
                className="absolute -top-8 rotate-12 -left-8 w-20"
              />
              <img
                src="https://i.pinimg.com/originals/af/1f/9d/af1f9d34e42a47edf37a27417977c8d5.png"
                alt=""
                className="absolute -bottom-8 -rotate-12 -right-8 w-20"
              />
              {end_message}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}