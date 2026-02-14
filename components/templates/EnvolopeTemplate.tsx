"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cedarville } from "@/app/font";

type letterProps = {
  person_name?: string;
  paragraph_1?: string;
  paragraph_2?: string;
  signature?: string;
};
export default function EnvelopeLetter({
  person_name = "Happy Birthday Raj",
  paragraph_1 = `Today feels special, not just because it marks another year,
                  but because it celebrates you. Your birthday is the perfect
                  reminder of all the little moments that make life brighter —
                  the laughter, the quiet strength, the kindness you give
                  without even realizing it.`,
  paragraph_2 = `May this year bring you memories worth keeping, dreams that
                  feel closer than ever, and happiness that stays long after
                  today ends. Never forget how loved you are, how deeply you are
                  appreciated, and how many hearts are warmer because you exist.
                  Here’s to you — to your past, your future, and all the
                  beautiful moments in between. With love,`,
  signature = "Your Riya",
}: letterProps) {
  const [open, setOpen] = useState(false);
  const [showSurprise, setShowSurprise] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[url('/envTemp/heart-bg.svg')]   overflow-hidden">
      <AnimatePresence>
        {!showSurprise ? (
          /* ---------------- Envelope Section ---------------- */
          <motion.div
            key="envelope"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "circInOut" }}
            className="flex relative items-center justify-center min-h-screen"
          >
            {!showSurprise && (
              <motion.div
                animate={{ y: [0, 3, 0], opacity: [0.8, 1, 0.8] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-20"
              >
                <Tooltip text="click to Open" />
              </motion.div>
            )}

            <div
              className="relative w-[300px] h-[200px] md:w-[600px] md:h-[400px] cursor-pointer shadow-2xl shadow-neutral-500"
              onClick={() => setOpen(!open)}
            >
              {/* Letter */}
              <motion.div
                style={{
                  backgroundImage: "url('/envTemp/env1.jpg')",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
                initial={{ y: 40, opacity: 0 }}
                animate={open ? { y: -80, opacity: 1 } : { y: 40, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute left-4 right-4  top-4 bg-white rounded-md shadow-lg z-10 flex flex-col items-center gap-4 py-10 justify-center "
              >
                <p className="text-2xl font-mono font-bold text-center text-gray-700">
                  {person_name}🎉
                </p>

                <div className="text-sm w-full  text-sky-400 font-semibold flex flex-col   gap-2 relative">
                  <h3 className="text-center text-xs pb-4 font-sans">
                    click the present for Surprise Letter
                  </h3>
                  <img
                    src="/envTemp/arrow.svg"
                    alt="arrow"
                    className="w-6 absolute -bottom-14 left-10 md:left-40"
                  />
                </div>

                {/* Gift Box */}
                <motion.img
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  src="/envTemp/Gift Box.png"
                  alt="box"
                  className="w-20 md:w-36 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); // prevent envelope toggle
                    setShowSurprise(true);
                  }}
                />
              </motion.div>

              {/* Envelope Body */}
              <div className="absolute inset-0 bg-amber-950    border-gray-300 rounded-md overflow-hidden">
                <div
                  className="absolute bottom-0 w-full h-1/2
                bg-[url('/envTemp/letter-paper.svg')] bg-center opacity-90"
                />
                <div className="absolute left-0 top-0 w-1/2 h-full  bg-[url('/envTemp/letter-paper.svg')] bg-top  clip-left text-center" />

                <div className="absolute right-0 top-0 w-1/2 h-full bg-[url('/envTemp/letter-paper.svg')] bg-right  clip-left clip-right" />

                <motion.div
                  initial={{ rotateX: 0 }}
                  animate={{ rotateX: open ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  style={{ transformOrigin: "top" }}
                  className="absolute top-0 w-full h-1/2 bg-[url('/envTemp/letter-paper.svg')] bg-top   clip-top z-20"
                ></motion.div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* ---------------- Surprise Section ---------------- */
          <motion.div
            style={{
              backgroundImage: "url('/envTemp/env2.svg')",
            }}
            key="surprise"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="min-h-screen relative flex items-center px-4  justify-center bg-white py-20"
          >
            <img
              src="/envTemp/mainLeft.png"
              alt="bg"
              className="left-0 top-0 z-2 absolute"
            />
            <img
              src="/envTemp/mainRight.png"
              alt="bg"
              className="right-0 top-0 absolute z-1"
            />
            <img
              src="/envTemp/mainOL.png"
              alt="bg"
              className="right-20 top-20 absolute z-2 w-40"
            />
            <img
              src="/envTemp/main2.png"
              alt="bg"
              className="right-1/2 left-1/2 -translate-x-1/2 top-0 absolute z-0 w-full "
            />
            <img
              src="/envTemp/mainCen.png"
              alt="bg"
              className="-right-10 -bottom-30 z-1  absolute "
            />
            <img
              src="/envTemp/mainCen.png"
              alt="bg"
              className="-left-10  -bottom-30 z-1  absolute "
            />
            <img
              src="/envTemp/mainFl.png"
              alt="bg"
              className="left-0  top-0 z-1  absolute "
            />
            <img
              src="/envTemp/mainBot.png"
              alt="bg"
              className="left-0 bottom-0 z-1  absolute "
            />
            <div
              style={{
                backgroundImage: "url('/envTemp/actualLetter.svg') ",
                backgroundSize: "cover",
              }}
              className="max-w-3xl  relative shadow-2xl shadow-neutral-900 min-h-screen flex items-center flex-col old-paper bg-red-100 w-full px-10 pt-20 pb-20 md:pb-30 z-230"
            >
              <img
                src="/envTemp/fl1.png"
                alt=""
                className="absolute w-24 md:w-30 -top-5 -left-6 rotate-45"
              />
              <img
                src="/envTemp/heart.png"
                alt=""
                className="absolute w-20 -rotate-12 z-1 right-0 top-10"
              />

              <img
                src="/envTemp/leaves.png"
                alt=""
                className="absolute w-24 md:w-30  -top-5 left-10 rotate-120 z-1"
              />

              <img
                src="/envTemp/boq.png"
                alt=""
                className="absolute w-24 md:w-30 rotate-12 -bottom-10 -left-4 z-1"
              />
              <img
                src="/envTemp/fl3.png"
                alt=""
                className="absolute w-24 md:w-30  -bottom-10 left-10 rotate-45 z-0"
              />
              <img
                src="/envTemp/lips.png"
                alt=""
                className="absolute w-24 top-0 right-0 z-0"
              />

              <motion.div
                className={`flex flex-col items-center font-bold leading-[160%] ${cedarville.className}   italic text-md  md:text-2xl text-amber-900`}
              >
                <motion.h2 className=" text-center    py-4 max-w-xl pt-8 ">
                  {paragraph_1}
                </motion.h2>

                <motion.h2 className=" text-center    py-4 max-w-xl pt-2">
                  {paragraph_2}
                </motion.h2>
              </motion.div>

              <h3
                className={`max-w-xl w-full text-md md:text-xl  font-semibold ${cedarville.className}  text-right py-2 text-amber-900`}
              >
                - {signature}
              </h3>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clip paths */}
      <style>{`
        .clip-top {
          clip-path: polygon(0 0, 50% 100%, 100% 0);
        }
        .clip-left {
          clip-path: polygon(0 0, 100% 50%, 0 100%);
        }
        .clip-right {
          clip-path: polygon(100% 0, 100% 100%, 0 50%);
        }
      `}</style>
    </div>
  );
}

function Tooltip({ text = "click to Open" }) {
  return (
    <div className="relative inline-block">
      {/* Bubble */}
      <div className="px-6 py-1.5 border-2 border-dashed border-neutral-700 rounded-full text-gray-700 text-xs font-medium ">
        {text}
      </div>

      {/* Pointer */}
      <div className="absolute left-1/2 -bottom-3 -translate-x-1/2">
        <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-neutral-800"></div>
        <div className="w-0 h-0 border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-neutral-800 absolute top-0 left-1/2 -translate-x-1/2"></div>
      </div>
    </div>
  );
}
