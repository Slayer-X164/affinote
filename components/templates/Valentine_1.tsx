"use client";

import { AnimatePresence, motion, Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaHeart } from "react-icons/fa";

type Valentine_1PropType = {
  your_message?: String;
};
const Valentine_1 = ({
  your_message = `In your eyes, I have found a home where my soul finally feels at rest. Every moment spent with you is a beautiful reminder that true happiness exists, and I am so grateful to walk this path by your side. You are the melody that my heart beats to and the light that guides me through every storm. Thank you for loving me so completely and for making even the simplest days feel like a dream come true. I love you more than words could ever express, now and for all the days to come.`,
}: Valentine_1PropType) => {
  const [phase, setPhase] = useState<
    "ph1" | "ph2" | "ph3" | "ph4" | "no" | null
  >("ph1");
  const [selectedGift, setSelectedGift] = useState<
    "gift1" | "gift2" | "gift3" | null
  >(null);
  const [showCurtain, setShowCurtain] = useState<boolean>(false);

  useEffect(() => {
    if (phase === "ph1") {
      const t = setTimeout(() => setPhase("ph2"), 3000);
      return () => clearTimeout(t);
    }
    if (phase === "no") {
      const t = setTimeout(() => setPhase("ph2"), 3000);
      return () => clearTimeout(t);
    }
  }, [phase]);
  const curtainVariants: Variants = {
    open: {
      scaleY: 0,
      transition: { duration: 1.2, ease: "easeInOut" },
    },
    closed: {
      scaleY: 1,
      transition: { duration: 1.2, ease: "easeInOut" },
    },
  };
  const handleGiftClick = (gift: "gift1" | "gift2" | "gift3") => {
    setShowCurtain(true); // close curtain

    setTimeout(() => {
      setSelectedGift(gift); // reveal gift section
      setShowCurtain(false); // open curtain
    }, 1200); // match curtain animation time
  };
  type Kiss = {
  id: number;
  x: number;
  y: number;
};
  const [kisses, setKisses] = useState<Kiss[]>([]);

  useEffect(() => {
    if (selectedGift !== 'gift3') return;

    const interval = setInterval(() => {
      const newKiss: Kiss = {
        id: Date.now(),
        x: Math.random() * 80 + 10, // % based
        y: Math.random() * 80 + 10,
      };

      setKisses((prev) => [...prev, newKiss]);

      // remove after animation
      setTimeout(() => {
        setKisses((prev) => prev.filter((k) => k.id !== newKiss.id));
      }, 1500);
    }, 1200);

    return () => clearInterval(interval);
  }, [selectedGift]);
  return (
    <div className="w-full min-h-screen  bg-radial from-white from-40% to-[#fddec8] flex  items-center justify-center text-center">
      <motion.div
        className="fixed inset-0 bg-[#28061f] origin-top z-50"
        variants={curtainVariants}
        initial="open"
        animate={showCurtain ? "closed" : "open"}
      />

      <AnimatePresence mode="wait">
        {phase == "ph1" && (
          <motion.div
            key={"ph1"}
            initial={{
              scale: 0.5,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              duration: 1,
              ease: "backInOut",
            }}
            exit={{
              scale: 0.5,
              opacity: 0,
            }}
            className="flex flex-col items-center gap-6 justify-center px-3"
          >
            <img
              src="https://media.tenor.com/yCFHzEvKa9MAAAAj/hello.gif"
              alt="character saying hi"
              className="-translate-x-3 w-40 md:w-40"
            />
            <h1 className="text-3xl md:text-4xl font-serif text-[#734220]">
              Babe!
            </h1>
            <h3 className=" text-center text-2xl md:text-4xl capitalize font-serif font-bold text-[#734220]">
              happy valentine's day{" "}
              <img
                src="/Valentine_1/red-rose.png"
                alt="rose"
                className="inline-flex w-10 md:w-14"
              />
            </h3>
          </motion.div>
        )}

        {phase == "ph2" && (
          <motion.div
            key={"ph2"}
            initial={{
              scale: 0.5,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              duration: 1,
              ease: "backInOut",
            }}
            exit={{
              scale: 0.5,
              opacity: 0,
            }}
            className="flex flex-col items-center gap-6 justify-center px-3"
          >
            <h2 className="text-2xl md:text-5xl font-bold text-[#734220] font-serif">
              Will You Be My Valentine?
            </h2>
            <img
              src="https://media.tenor.com/Obm7FIMrbVcAAAAi/tonton-chick.gif"
              alt="toton chcick"
              className="w-40"
            />
            <div className="w-md flex items-center justify-between">
              <button
                onClick={() => setPhase("ph3")}
                className="bg-[#28061f] text-amber-50 text-2xl px-6 py-2 rounded-2xl border-2 border-[#28061f] transition-all duration-300 cursor-pointer hover:border-2 hover:scale-110  hover:shadow-2xl shadow-amber-950/80 active:scale-90"
              >
                Yes
              </button>
              <button
                onClick={() => {
                  setPhase("no");
                }}
                className="bg-[#28061f] text-amber-50 text-2xl px-6 py-2 rounded-2xl border-2 border-[#28061f] transition-all duration-300 cursor-pointer hover:border-2 hover:scale-110 hover:shadow-2xl shadow-amber-950/80 active:scale-90"
              >
                No
              </button>
            </div>
          </motion.div>
        )}
        {phase == "ph3" && (
          <motion.div
            key={"ph3"}
            initial={{
              scale: 0.5,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              duration: 1,
              ease: "backInOut",
            }}
            exit={{
              opacity: 0,
              transition: {
                duration: 1,
              },
            }}
            className="flex flex-col items-center gap-6 justify-center px-3"
          >
            <img
              src="https://media.tenor.com/GXol-8FjPFYAAAAi/milk-mocha-bear.gif"
              alt="milk and mocha gif"
              className="w-40"
            />
            <h1 className="text-3xl font-bold md:text-4xl font-serif text-[#734220]">
              Choose a Gift!
            </h1>
            <div className="flex items-center gap-6 justify-center flex-wrap">
              <motion.img
                src="/Valentine_1/gift.svg"
                className="w-40 cursor-pointer hover:scale-110 transition-transform active:scale-90"
                onClick={() => {
                  handleGiftClick("gift1");
                  setPhase(null);
                }}
                animate={{ y: [0, -16, 0], scale: 1 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <motion.img
                src="/Valentine_1/gift.svg"
                className="w-40 cursor-pointer hover:scale-110 transition-transform active:scale-90"
                onClick={() => {
                  handleGiftClick("gift2");
                  setPhase(null);
                }}
                animate={{ y: [0, -16, 0], scale: 1 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2,
                }}
              />

              <motion.img
                src="/Valentine_1/gift.svg"
                className="w-40 cursor-pointer hover:scale-110 transition-transform active:scale-90"
                onClick={() => {
                  handleGiftClick("gift3");
                  setPhase(null);
                }}
                animate={{ y: [0, -13, 0] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4,
                }}
              />
            </div>
          </motion.div>
        )}
        {selectedGift == "gift1" && (
          <motion.div
            key={"gift1"}
            initial={{
              scale: 0.5,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              duration: 1,
              ease: "backInOut",
            }}
            exit={{
              scale: 0.5,
              opacity: 0,
            }}
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-3">
              <img
                src="https://media.tenor.com/O-tKN4NYQOsAAAAi/milk-mocha-dance.gif"
                alt="milk dance"
                className="w-40"
              />
              <MusicPlayer
                songSrc="/Valentine_1/BirdsOfFeather.mp3"
                coverImg="/Valentine_1/songCover.jpg"
                title="nice song"
              />

              <img
                src="https://media.tenor.com/fgrl47RyOkcAAAAi/mocha.gif"
                alt="mocha dance"
                className="w-40"
              />
            </div>
            <button
              onClick={() => {
                setPhase("ph3");
                setSelectedGift(null);
              }}
              className="bg-[#28061f] text-amber-50 text-sm font-semibold px-6 py-2 rounded-2xl border-2 border-[#28061f] transition-all duration-300 cursor-pointer hover:border-2 hover:scale-110  hover:shadow-2xl shadow-amber-950/80 active:scale-90 my-6"
            >
              Go Back
            </button>
          </motion.div>
        )}
        {selectedGift == "gift2" && (
          <motion.div
            key={"gift2"}
            initial={{
              scale: 0.5,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              duration: 1,
              ease: "backInOut",
            }}
            exit={{
              scale: 0.5,
              opacity: 0,
            }}
            className="relative flex flex-col items-center justify-center gap-6 p-3 overflow-hidden min-h-screen h-full w-full"
          >
            <Balloons />
            <div className="flex  items-center gap-6">
              <img
                src="https://i.pinimg.com/originals/bc/6b/a0/bc6ba0a1bb25fb7017dced005eb7d204.png"
                alt="rose"
                className="w-50 -rotate-12"
              />
              <img
                src="https://i.pinimg.com/originals/1a/29/b6/1a29b6153d8a7e8f81086c5d3f59b40d.png"
                alt="rose"
                className="w-30 rotate-12"
              />
            </div>
            <h3 className="text-3xl mt-6 font-semibold text-[#28061fcb] font-serif">
              Got This For You &lt;3
            </h3>
            <button
              onClick={() => {
                setPhase("ph3");
                setSelectedGift(null);
              }}
              className="bg-[#28061f] text-amber-50 text-sm font-semibold px-6 py-2 rounded-2xl border-2 border-[#28061f] transition-all duration-300 cursor-pointer hover:border-2 hover:scale-110  hover:shadow-2xl shadow-amber-950/80 active:scale-90 my-6"
            >
              Go Back
            </button>
          </motion.div>
        )}
        {selectedGift == "gift3" && (
          <motion.div
            key={"gift3"}
            initial={{
              scale: 0.5,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              duration: 1,
              ease: "backInOut",
            }}
            exit={{
              scale: 0.5,
              opacity: 0,
            }}
            className=" flex flex-col items-center justify-center gap-6 p-3 overflow-hidden min-h-screen h-full w-full "
          >
{kisses.map((kiss) => (
                <motion.img
                  key={kiss.id}
                  src="/ApologyBf/kiss.png"
                  alt="kiss"
                  className="w-16 absolute pointer-events-none z-0"
                  style={{
                    left: `${kiss.x}%`,
                    top: `${kiss.y}%`,
                  }}
                  initial={{ scale: 0, opacity: 0, rotate: -20 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                />
              ))}
            <div className="wrap-words max-w-[550px] text-lg md:text-xl font-sans font-normal px-6 py-6  rounded-3xl min-h-60 bg-[#4a2611] text-[#fff4ea] relative">

              {your_message}
              <img src="https://i.pinimg.com/originals/ee/4f/31/ee4f31ff74d72b7a66483c423f5df84c.png" alt="tulip flower" className="absolute md:w-26 rotate-26 -right-5 w-16 -bottom-8 md:-right-14 md:-bottom-10" />
              <div className="flex items-center gap-6 absolute left-1/2 -translate-x-1/2 -top-2">
                <FaHeart className="text-pink-500 text-xl -rotate-6" />
                <FaHeart className="text-rose-300 text-xl rotate-6" />
                <FaHeart className="text-pink-500 text-xl -rotate-6" />
                <FaHeart className="text-rose-300 text-xl rotate-6" />
                <FaHeart className="text-pink-500 text-xl -rotate-6" />
                <FaHeart className="text-rose-300 text-xl rotate-6" />
              </div>
            </div>

            <button
              onClick={() => {
                setPhase("ph3");
                setSelectedGift(null);
              }}
              className="bg-[#28061f] text-amber-50 text-sm font-semibold px-6 py-2 rounded-2xl border-2 border-[#28061f] transition-all duration-300 cursor-pointer hover:border-2 hover:scale-110  hover:shadow-2xl shadow-amber-950/80 active:scale-90"
            >
              Go Back
            </button>
          </motion.div>
        )}

        {/* no */}
        {phase == "no" && (
          <motion.div
            key={"no"}
            initial={{
              scale: 0.5,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              duration: 1,
              ease: "backInOut",
            }}
            exit={{
              scale: 0.5,
              opacity: 0,
            }}
            className="flex flex-col items-center gap-6 justify-center px-3"
          >
            <img
              src="https://media.tenor.com/xSdP8nYROncAAAAi/milk-and-mocha-crying.gif"
              alt="milk crying gif"
              className="w-40"
            />
            <h2 className="text-2xl md:text-5xl font-bold text-[#734220] font-serif">
              I don’t accept No as an Answer
            </h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
// balloon
const Balloons = () => {
  const balloons = Array.from({ length: 8 });

  return (
    <>
      {balloons.map((_, i) => {
        const isLeft = Math.random() > 0.5;
        const x = isLeft
          ? Math.random() * 20 // left side
          : 80 + Math.random() * 20; // right side

        return (
          <motion.img
            key={i}
            src="https://i.pinimg.com/originals/62/c6/e7/62c6e7528aac2835a0a2dae848223eb3.png" // use any balloon image
            className="absolute bottom-0 w-12 opacity-80 pointer-events-none"
            style={{ left: `${x}%` }}
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: -600, opacity: 1 }}
            transition={{
              duration: 6 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "linear",
            }}
          />
        );
      })}
    </>
  );
};

// music
type MusicPlayerProps = {
  songSrc: string;
  coverImg: string;
  title?: string;
};

const MusicPlayer = ({
  songSrc,
  coverImg,
  title = "BIRDS OF A FEATHER",
}: MusicPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    };

    audio.addEventListener("timeupdate", updateProgress);
    return () => audio.removeEventListener("timeupdate", updateProgress);
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) audio.pause();
    else audio.play();

    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = (Number(e.target.value) / 100) * audio.duration;
    setProgress(Number(e.target.value));
  };

  return (
    <div
      style={{
        backgroundImage:
          "url(https://i.pinimg.com/736x/7f/be/f6/7fbef69f403c7a863cf70f49b796ec74.jpg)",
        backgroundSize: "cover",
      }}
      className="w-[260px]  shadow-[#28061f7e] shadow-2xl p-4 rounded-xl font-serif"
    >
      {/* IMAGE FRAME */}
      <motion.div
        animate={{ scale: isPlaying ? 1.03 : 1 }}
        transition={{ duration: 0.5 }}
        className=" border-[#28061f] p-2 mb-4"
      >
        <img
          src={coverImg}
          alt="cover"
          className="w-full rounded-lg h-[180px] object-cover"
        />
      </motion.div>

      {/* TITLE */}
      <p className="text-lg font-mono mb-2">BIRDS OF A FEATHER</p>

      {/* PROGRESS BAR */}
      <input
        type="range"
        value={progress}
        onChange={handleSeek}
        className="w-full accent-[#28061f] mb-4"
      />

      {/* CONTROLS */}
      <div className="flex items-center justify-center gap-6">
        <button className="text-xl">⏮</button>

        <button
          onClick={togglePlay}
          className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center text-xl"
        >
          {isPlaying ? "⏸" : "▶"}
        </button>

        <button className="text-xl">⏭</button>
      </div>

      <audio ref={audioRef} src={songSrc} />
    </div>
  );
};

export default Valentine_1;
