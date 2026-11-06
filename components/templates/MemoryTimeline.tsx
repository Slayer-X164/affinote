"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "motion/react";

type memoryTlPropType = {
  title_1?: string;
  photo_1?: string;
  photo_2?: string;
  title_2?: string;
  photo_3?: string;
  photo_4?: string;
  photo_5?: string;
  end_message?: string;
};

const MemoryTimeline = ({
  title_1 = "Our first Date 🥺",
  photo_1 = "https://i.pinimg.com/1200x/52/e5/96/52e596c979015a0bb72835198aebc89a.jpg",
  photo_2 = "https://i.pinimg.com/736x/00/d2/26/00d2261b4b92ad59a2e64371b08a6be7.jpg",
  title_2 = "day out at mall 💗",
  photo_3 = "https://i.pinimg.com/736x/a0/a9/b4/a0a9b4f285ef4d79d094f795a85ac84e.jpg",
  photo_4 = "https://i.pinimg.com/736x/de/e0/19/dee0195c9e22d5e46ee86a8fba3b9f1a.jpg",
  photo_5 = "https://i.pinimg.com/736x/8f/45/1a/8f451a332ea20582b015708fa1097027.jpg",
  end_message = `Looking back through these photos, I’m reminded that even the simplest days—like just wandering through the mall together—become my favorite memories because you’re in them. I love how our energy just fits, like these stickers tucked between our pictures. Whether we’re geeking out over cute characters, losing track of time in our favorite shops, or just acting like kids again, every second feels like a highlight reel`,
}: memoryTlPropType) => {
  const [phase, setPhase] = useState<"ph1" | "ph2" | "ph3" | "ph4">("ph1");
  const [isOpened, setIsOpened] = useState(false);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const rowVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="w-full overflow-hidden min-h-screen bg-[#d9e6ff] flex justify-center items-center">
      <AnimatePresence mode="wait">
        {/* PHASE 1: Interactive Memory Capsule / Envelope */}
        {phase === "ph1" && (
          <motion.div
            key="ph1"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full flex flex-col items-center justify-center gap-5 p-6 relative"
          >
            <Confetti />

            <motion.img
              initial={{ y: -10 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              src="/Memotime/hibear.gif"
              alt="bear"
              className="w-48 sm:w-56 drop-shadow-md"
            />

            {/* Creative Card Box */}
            <div className="relative w-80 sm:w-96    rounded-3xl p-6  flex flex-col items-center text-center gap-4">


              <div className="space-y-3">
                <h2 className="text-2xl font-serif italic font-bold text-[#ff3898]">
                  A Little Trip Down Memory Lane
                </h2>
                <p className="text-sm font-medium text-neutral-600 px-2">
                   Ready to relive some of our absolute favorite memories?

                </p>
              </div>

              {/* Next Phase Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPhase("ph2")}
                className="mt-2 w-auto py-3 px-6 rounded-2xl bg-radial cursor-pointer from-[#ff75b5] to-[#ff3898] text-white font-bold text-lg shadow-lg shadow-[#ff389844] flex items-center justify-center gap-2 transition-all hover:brightness-105"
              >
                <span>Let’s Begin</span>
                <span className="text-xl">➔</span>
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* PHASE 2 */}
        {phase === "ph2" && (
          <motion.div
            key="ph2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full min-h-screen bg-[#dbe9fb] flex flex-col items-center justify-center gap-8 py-10 relative overflow-hidden"
          >
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl text-center font-serif italic text-[#ff3898]"
            >
              Welcome to our Timeline ✨
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl font-semibold text-[#ff3898]"
            >
              {title_1}
            </motion.h2>

            <div className="w-full flex justify-center relative mt-6">
              <div className="absolute top-2 w-[420px] h-[2px] border border-[#ff3898] border-dashed rounded-full" />

              <div className="flex gap-10 mt-6">
                <motion.div
                  initial={{ rotate: -8 }}
                  animate={{ rotate: 8 }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 1.5,
                  }}
                  className="relative"
                >
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-6 bg-gray-700 rounded-sm z-10" />
                  <div
                    style={{
                      backgroundImage: `url("https://i.pinimg.com/1200x/4d/b5/62/4db562e1925a1ac7685c9d201a50314a.jpg")`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    className="w-44 h-56 bg-[#f7d7c9] rounded-md p-3 shadow-lg"
                  >
                    <div
                      style={{
                        backgroundImage: `url(${photo_1})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                      className="w-full h-36 rounded-sm"
                    />
                    <p className="text-center text-sm mt-3 text-rose-600 font-medium"></p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ rotate: 8 }}
                  animate={{ rotate: -8 }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 1.5,
                  }}
                  className="relative"
                >
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-6 bg-gray-700 rounded-sm z-10" />
                  <div
                    style={{
                      backgroundImage: `url("https://i.pinimg.com/1200x/4d/b5/62/4db562e1925a1ac7685c9d201a50314a.jpg")`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    className="w-44 h-56 bg-[#f7d7c9] rounded-md p-3 shadow-lg"
                  >
                    <div
                      style={{
                        backgroundImage: `url(${photo_2})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                      className="w-full h-36 rounded-sm"
                    />
                    <p className="text-center text-sm mt-3 text-rose-600 font-medium"></p>
                  </div>
                </motion.div>
              </div>
            </div>

            <button
              onClick={() => setPhase("ph3")}
              className="px-10 py-1 mt-6 rounded-2xl bg-[#f7cfe2] cursor-pointer shadow-xl shadow-[#ef479855] text-xl font-semibold text-[#ff3898] border-[#ff3898] border-dashed border-2 hover:brightness-105 active:scale-95 transition-all"
            >
              Next
            </button>
          </motion.div>
        )}

        {/* PHASE 3 */}
        {phase === "ph3" && (
          <motion.div
            key="ph3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="w-full h-full flex flex-col items-center gap-3"
          >
            <h3 className="text-xl font-bold text-center uppercase tracking-wider py-10 text-[#ff3898]">
              {title_2}
            </h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col items-center gap-3"
            >
              {/* Row 1 */}
              <motion.div variants={rowVariants} className="row1 flex items-center gap-4">
                <img src="/Memotime/g1.png" alt="g1" className="w-30" />
                <div className="p-4 w-46 h-64 rotate-12 bg-white flex items-start relative">
                  <div
                    style={{
                      backgroundImage: `url(${photo_3})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                    className="w-full h-46"
                  />
                  <img
                    src="/Memotime/star.png"
                    alt="star"
                    className="absolute w-10 -top-5 -right-5"
                  />
                </div>
              </motion.div>

              {/* Row 2 */}
              <motion.div variants={rowVariants} className="row2 flex items-center gap-4">
                <div className="p-4 w-46 h-64 -rotate-12 bg-white flex items-start relative">
                  <div
                    style={{
                      backgroundImage: `url(${photo_4})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                    className="w-full h-46"
                  />
                  <img
                    src="/Memotime/star.png"
                    alt="star"
                    className="absolute w-10 -top-5 -left-5"
                  />
                </div>
                <img src="/Memotime/g2.png" alt="g1" className="w-30" />
              </motion.div>

              {/* Row 3 */}
              <motion.div variants={rowVariants} className="row3 flex items-center gap-4">
                <img src="/Memotime/g3.png" alt="g1" className="w-30" />
                <div className="p-4 w-46 h-64 rotate-12 bg-white flex items-start relative">
                  <div
                    style={{
                      backgroundImage: `url(${photo_5})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                    className="w-full h-46"
                  />
                  <img
                    src="/Memotime/star.png"
                    alt="star"
                    className="absolute w-10 -top-5 -right-5"
                  />
                </div>
              </motion.div>
            </motion.div>

            <button
              onClick={() => setPhase("ph4")}
              className="px-10 my-10 py-1 mt-6 rounded-2xl bg-[#f7cfe2] cursor-pointer shadow-xl shadow-[#ef479855] text-xl font-semibold text-[#ff3898] border-[#ff3898] border-dashed border-2 hover:brightness-105 active:scale-95 transition-all"
            >
              Next
            </button>
          </motion.div>
        )}

        {/* PHASE 4 */}
        {phase === "ph4" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            key="ph4"
            className="w-full h-dvh flex justify-center px-4 py-32"
            style={{
              backgroundImage: `url("https://i.pinimg.com/1200x/02/ad/b1/02adb1beb56fc11a7bd7c584b3f1ef3b.jpg")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h3 className="sm:w-[450px] mt-20 sm:mt-24 w-full h-fit text-lg text-center bg-[#a2cbed] rounded-xl p-6 font-bold border-3 border-[#522912] text-[#274660] relative break-words">
              {end_message}
              <img
                src="/Memotime/flg.gif"
                alt="bear giving flower"
                className="absolute -top-40 left-1/2 -translate-x-1/2"
              />
            </h3>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* =========================
   CONFETTI (SSR SAFE)
========================= */

const Confetti = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {[...Array(40)].map((_, i) => {
        const isLeft = i % 2 === 0;
        return (
          <span
            key={i}
            className="absolute w-2 h-4 rounded-sm animate-confetti"
            style={{
              left: isLeft
                ? `${Math.random() * 20}%`
                : `${80 + Math.random() * 20}%`,
              top: "-10px",
              backgroundColor: ["#ff5c8a", "#ffd166", "#6c63ff", "#00c2ff"][
                Math.floor(Math.random() * 4)
              ],
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        );
      })}
    </div>
  );
};

export default MemoryTimeline;