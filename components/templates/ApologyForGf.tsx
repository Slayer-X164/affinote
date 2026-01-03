// components/templates/ApologyForGf.tsx
"use client";

import { FaLock } from "react-icons/fa";
import { PiCursorClickThin } from "react-icons/pi";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { playfairDisplay } from "@/app/font";
type apologyPropType = {
  from_name?: string;
  sorry_message?: string;
  end_message?: string;
};
const ApologyForGf = ({
  from_name = "Raj",
  sorry_message = `I’m really sorry, okay? I messed up and I know I hurt you. That was not cool of me at all. You matter to me a lot and I hate that I made you feel bad. Please forgive me`,
  end_message = ` Got this Bouquet and a Cat for you baby ❤️`
}: apologyPropType) => {
  const [phase, setPhase] = useState<"ph1" | "ph2" | "ph3" | "ph4">("ph1");

  return (
    <div className="w-full overflow-hidden min-h-screen bg-[#fffceb] flex justify-center items-center  px-3">
      {/* Phone */}
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
              duration: 0.6,
              ease: "backInOut",
            }}
            className="relative -bottom-40 w-[300px] h-[620px] rounded-[40px] bg-[#E9FFD2] border-[3px] border-[#9B6CFF]  shadow-xl"
          >
            {/* Notch */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-22 h-4 rounded-full bg-[#9B6CFF]" />

            {/* Side buttons */}
            <div className="absolute left-[-6px] top-32 w-1 h-12 bg-[#9B6CFF] rounded-l-md" />
            <div className="absolute left-[-6px] top-48 w-1 h-8 bg-[#9B6CFF] rounded-l-md" />
            <div className="absolute right-[-6px] top-40 w-1 h-16 bg-[#9B6CFF] rounded-r-md" />

            {/* Content */}
            <div className="flex flex-col items-center pt-20 text-center px-4">
              {/* Lock */}
              <span className="text-sm">
                <FaLock />
              </span>

              {/* Date */}
              <p className="text-sm text-black mt-2 font-medium">
                Saturday, 25 May
              </p>

              {/* Time */}
              <h1 className="text-5xl font-bold mt-2 text-black">11:11</h1>

              {/* Notification */}
              <div
                onClick={() => setPhase("ph2")}
                className="mt-10 w-full relative hover:scale-105 transition-all duration-300 cursor-default active:scale-105 "
              >
                <motion.h3
                  animate={{
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    ease: "easeInOut",
                    duration: 1,
                  }}
                  className="absolute text-5xl right-0 -bottom-8 "
                >
                  <PiCursorClickThin className="text-[#5421c2]" />
                </motion.h3>

                <div className="flex items-start gap-3 bg-[#FDF6FF] border-2 border-[#9B6CFF] rounded-2xl px-4 py-3 shadow-xl shadow-neutral-400/40">
                  <img
                    src="/ApologyGf/teddy.jpg"
                    alt="pfp"
                    className="w-8 pt-1 rounded-full"
                  />
                  <div className="text-left text-sm w-32">
                    <p className="font-bold">{from_name} 💕</p>
                    <p className="text-gray-700 font-semibold text-xs">
                      I have smth for you &lt;3
                    </p>
                  </div>
                  <span className="ml-auto text-xs text-blue-600">1m ago</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        {phase == "ph2" && (
          <motion.div
            initial={{
              scale: 0.8,
              opacity: 0.8,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: 0.1,
              opacity: 0.8,
            }}
            key={"ph2"}
            className="flex flex-col items-center gap-8"
            onLoad={() => {
              setTimeout(() => {
                setPhase("ph3");
              }, 5000);
            }}
          >
            <h1 className="text-2xl font-semibold">
              i know you are mad at me babe{" "}
            </h1>
            <img
              src="/ApologyGf/sad_teddy.gif"
              alt="teddy gif"
              className="border-4 border-[#9b6cffaf] rounded-2xl"
            />
            <HeartRain />
            <h3 className="text-center text-xl font-semibold">
              Wait to see what <br /> i made for you...
            </h3>
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
            transition={{
              duration: 1,
              ease: "backInOut",
            }}
            exit={{
              y: -500,
            }}
            className="flex flex-col items-center gap-8 px-3"
          >
            <div className="relative rounded-2xl bg-[#ff988c] w-60  h-auto p-4 flex flex-col items-center gap-6 py-8 border-2 border-[#522912]">
              <motion.img
                initial={{
                  y: 50,
                }}
                animate={{
                  y: 0,
                }}
                src="/ApologyGf/cat.gif"
                alt="cat gif"
                className="absolute -top-45 w-44"
              />
              <h3 className="text-center font-semibold text-[#35180a]">
               {sorry_message}
              </h3>

              <div className="w-full flex justify-center">
                <button
                  onClick={() => {
                    setPhase("ph4");
                  }}
                  className="bg-[#fffceb] px-6 py-2 cursor-pointer hover:scale-105 active:scale-105 transition-all duration-300 text-lg font-semibold rounded-full shadow-xl shadow-[#e98d82]"
                >
                  Accept This Gift
                </button>
              </div>
            </div>
          </motion.div>
        )}
        {phase == "ph4" && (
          <motion.div
            initial={{
              y: 500,
              scale: 0.5,
            }}
            animate={{
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 1,
              ease: "backInOut",
            }}
            key={"ph4"}
            className="flex w-screen min-h-screen pt-10 flex-col gap-4 items-center"
          >
            <h1
              className={`${playfairDisplay.className} text-[#4a4941] font-bold text-3xl w-[60%] text-center `}
            >
              i'm Sorry i Hurt You!
            </h1>
            <h3 className="text-center italic text-[#4a4941]  text-lg font-semibold w-46">
             {end_message}
            </h3>
            <div className="w-auto h-auto flex flex-col items-center md:flex-row gap-4">
              <img
                src="/ApologyGf/fl2.png"
                alt="flower bouq"
                className="-rotate-45 w-40"
              />
              <img
                src="/ApologyGf/fly_cat.gif"
                alt="cat gif flying"
                className="w-60"
              />
            </div>

            <div className="flex flex-col gap-3  items-center">
              <h3 className="text-3xl uppercase font-bold text-pink-400">
                i love you babe 💗
              </h3>
              <img
                src="/ApologyGf/fly_kiss.gif"
                alt="cat fly kiss gif"
                className="w-50"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
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

export default ApologyForGf;
