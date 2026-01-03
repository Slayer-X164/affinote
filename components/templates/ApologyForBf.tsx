"use client";
import { AnimatePresence, delay, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BsCameraVideo, BsTelephone } from "react-icons/bs";
import { TbDotsVertical } from "react-icons/tb";
import { Variants } from "framer-motion";
import { GoHeart, GoHeartFill } from "react-icons/go";
type Kiss = {
  id: number;
  x: number;
  y: number;
};

const chatContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 1,
    },
  },
};
const HeartRain = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 14 }).map((_, i) => (
        <HollowHeart
          key={i}
          left={`${Math.random() * 100}%`}
          size={Math.random() * 14 + 12}
          duration={Math.random() * 6 + 6}
          delay={Math.random() * 2}
        />
      ))}
    </div>
  );
};
const HollowHeart = ({ left, size, duration, delay }: any) => (
  <svg
    className="heart"
    style={{
      left,
      width: size,
      height: size,
      animationDuration: `${duration}s`,
      animationDelay: `${delay}s`,
    }}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#9B6CFF"
    strokeWidth="2"
  >
    <path d="M20.8 4.6c-1.4-1.4-3.6-1.4-5 0L12 8.4 8.2 4.6c-1.4-1.4-3.6-1.4-5 0s-1.4 3.6 0 5l8.8 8.8 8.8-8.8c1.4-1.4 1.4-3.6 0-5z" />
  </svg>
);
const chatBubble: Variants = {
  hidden: {
    y: 30,
    opacity: 0,
    scale: 0.95,
  },
  show: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 22,
    },
  },
};
type ApologyPropType = {
    from_name?:string
    left_text_1?:string
    right_text_1?:string
    right_text_2?:string
    sorry_message?:string
    final_message?:string

}
export default function ApologyForBf({
    from_name = 'Raj❤️',
    left_text_1 = "Im soo done with you 😠",
    right_text_1 = "im sorry babe i know i messed up😔",
    right_text_2 = "But i made smth for you",
    sorry_message = `I’m really sorry, okay? I messed up and I know I hurt you. That was not cool of me at all. You matter to me a lot and I hate that I made you feel bad. Please forgive me`,
    final_message = 'Forgive me baby ily ❤️'

}:ApologyPropType) {
  const [phase, setPhase] = useState<"ph1" | "ph2" | "ph3" | "ph4">("ph1");
  const [kisses, setKisses] = useState<Kiss[]>([]);

  useEffect(() => {
    if (phase !== "ph4") return;

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
  }, [phase]);

  return (
    <div className="w-full min-h-screen flex overflow-hidden justify-center items-center bg-[#daf6ff]">
      <AnimatePresence mode="wait">
        {phase == "ph1" && (
          <motion.div
            key={"ph1"}
            initial={{
              y: 300,
              opacity: 0.5,
              scale: 0.8,
            }}
            animate={{
              y: 0,
              opacity: 1,
              scale: 1,
            }}
            exit={{
              y: 1200,
              opacity: 0.5,
              scale: 0.8,
            }}
            transition={{
              duration: 0.7,
              ease: "backInOut",
            }}
            style={{
              backgroundImage: `url('/ApologyBf/wallpaper.png')`,
              backgroundSize: "cover",
            }}
            className="relative  w-[300px]  h-[560px] rounded-[40px]  border-[3px] border-[#23141a]  shadow-xl flex flex-col justify-between"
          >
            <div className="w-full h-full bg-neutral-900/40 z-0 absolute top-0 left-0 rounded-[38px]"></div>
            {/* Notch */}
            <div className="absolute top-3 z-2 left-1/2 -translate-x-1/2 w-16 h-4 rounded-full bg-[#23141a]" />
            {/* Side buttons */}
            <div className="absolute left-[-6px] top-32 w-1 h-12 bg-[#23141a] rounded-l-md" />
            <div className="absolute left-[-6px] top-48 w-1 h-8 bg-[#23141a] rounded-l-md" />
            <div className="absolute right-[-6px] top-40 w-1 h-16 bg-[#23141a] rounded-r-md" />
            {/* top bar */}
            <div className="bg-[#d4eabc] relative z-1 w-full h-20 rounded-t-[38px] flex justify-between items-center pt-6  px-4 py-1">
              <div className="flex items-center gap-3">
                <img
                  src="/ApologyGf/teddy.jpg"
                  alt="teddy image"
                  className="w-8 rounded-full"
                />
                <h3 className="text-xl font-bold">{from_name}</h3>
              </div>
              <div className="flex items-center gap-3 ">
                <BsCameraVideo className="text-xl" />
                <BsTelephone className="text-lg" />
                <TbDotsVertical className="text-lg" />
              </div>
            </div>
            {/* Content chat */}
            <motion.div
              variants={chatContainer}
              initial="hidden"
              animate="show"
              className="w-full p-4 pb-20 text-md relative z-1 space-y-6"
            >
              {/* Left chat */}
              <motion.div variants={chatBubble} className="flex justify-start">
                <h3 className="bg-[#c9f19d] max-w-50 px-4 py-2 rounded-r-2xl rounded-tl-2xl border-2 border-[#8ca671c6] font-semibold">
                  {left_text_1}
                </h3>
              </motion.div>

              {/* Right chats */}
              <div className="flex flex-col gap-4 items-end">
                <motion.h3
                  variants={chatBubble}
                  className="bg-[#f8def6] max-w-50 px-4 py-2 rounded-l-2xl rounded-tr-2xl border-2 border-[#c6a6c3] font-semibold"
                >
                  {right_text_1}
                </motion.h3>

                <motion.h3
                  variants={chatBubble}
                  className="bg-[#f8def6] max-w-50 px-4 py-2 rounded-l-2xl rounded-tr-2xl border-2 border-[#c6a6c3] font-semibold"
                >
                  {right_text_2}
                </motion.h3>

                <motion.button
                  variants={chatBubble}
                  onClick={() => setPhase("ph2")}
                >
                  <h3 className="bg-[#f8def6] max-w-50 cursor-pointer px-4 py-2 rounded-l-2xl rounded-tr-2xl border-2 border-[#c6a6c3] text-blue-500 underline font-semibold">
                    Click on this
                  </h3>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
        {phase == "ph2" && (
          <motion.div
            key={"ph2"}
            initial={{
              scale: 0,
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
              y: -500,
              opacity: 0,
            }}
            className="flex flex-col items-center gap-2 px-3"
          >
            <motion.img
              initial={{
                y: 50,
              }}
              animate={{
                y: 0,
              }}
              src="/ApologyBf/sadBear2.gif"
              alt="bear gif"
              className="  w-44"
            />
            <div className="relative rounded-2xl bg-[#d17598] w-64  h-auto px-6 flex flex-col items-center gap-6 py-8 border-2 border-[#7e485d]">
              <h3 className="text-center font-semibold text-[#daf6ff]">
               {sorry_message}
              </h3>
              <div className="w-full flex justify-center">
                <button
                  onClick={() => {
                    setPhase("ph3");
                  }}
                  className="bg-[#fffceb] px-6 py-2 cursor-pointer hover:scale-105 active:scale-105 transition-all text-[#442833] duration-300 text-lg font-semibold rounded-full shadow-xl shadow-[#b96887]"
                >
                  Accept This Gift
                </button>
              </div>
            </div>
          </motion.div>
        )}
        {phase == "ph3" && (
          <motion.div
            key={"ph3"}
            initial={{
              scale: 0,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: 0,
              opacity: 0,
            }}
            transition={{
              ease: "backInOut",
              duration: 1,
            }}
            onLoad={() => {
              setTimeout(() => {
                setPhase("ph4");
              }, 5000);
            }}
            className="w-screen min-h-screen flex flex-col items-center justify-center "
          >
            <HeartLoading />
            <img
              src="/ApologyBf/kissingBear.gif"
              alt="kissing bears"
              className="pr-4 "
            />
          </motion.div>
        )}
        {phase == "ph4" && (
          <motion.div
            initial={{
              scale: 0,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: 0,
              opacity: 0,
            }}
            transition={{
              ease: "backInOut",
              duration: 1,
            }}
            key={"ph4"}
            className="gap-3 z-1 flex-col flex justify-center items-center relative"
          >
            <h3 className="text-2xl font-bold text-[#442833] pb-4">
              FOR YOU !
            </h3>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <img
                src="/ApologyBf/g1.png"
                alt="gift 1"
                className="w-30 -rotate-12"
              />
              <img src="/ApologyBf/g2.png" alt="gift 1" className="w-30" />

            </div>
            <img
              src="/ApologyBf/sorry.gif"
              alt="sorry bear"
              className="w-40 pr-4"
            />
            <h3 className="text-xl font-bold w-30 text-center">
              {final_message}
            </h3>
            <AnimatePresence>
              {kisses.map((kiss) => (
                <motion.img
                  key={kiss.id}
                  src="/ApologyBf/kiss.png"
                  alt="kiss"
                  className="w-16 absolute pointer-events-none -z-1"
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
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
function HeartLoading() {
  const TOTAL_HEARTS = 4;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % (TOTAL_HEARTS + 1));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Hearts */}
      <div className="flex gap-3  px-4 py-2">
        {Array.from({ length: TOTAL_HEARTS }).map((_, i) => (
          <motion.span
            key={i}
            animate={{
              scale: i < activeIndex ? 1.2 : 1,
              opacity: i < activeIndex ? 1 : 0.9,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="text-2xl"
          >
            {i < activeIndex ? (
              <GoHeartFill className="text-[#d54e82] text-2xl" />
            ) : (
              <GoHeart className="text-[#913458] text-2xl" />
            )}
          </motion.span>
        ))}
      </div>

      {/* Loading text */}
      <p className="font-semibold tracking-widest">LOADING YOUR PRESENT...</p>
    </div>
  );
}
