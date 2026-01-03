"use client";

import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { motion, AnimatePresence, PanInfo, Variants } from "motion/react";
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
  const [showThanks, setShowThanks] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);

  const handlePhotoTaken = (photo: string) => {
    setCapturedPhoto(photo);
    setShowThanks(true);

    setTimeout(() => {
      setPhase("ph2");
    }, 3000);
  };
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Delay between each row appearing
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
  const images = [
    "https://i.pinimg.com/1200x/2b/3e/79/2b3e79f2d32ec07b641b11bde78a87f3.jpg",
    "https://i.pinimg.com/736x/32/68/01/326801f67ffd3acdf9c84dd78dfbf948.jpg",
    "https://i.pinimg.com/736x/5a/f6/1a/5af61a207bb8e7c773eef7e300a3b8bb.jpg",
    "https://i.pinimg.com/736x/5e/ce/ca/5ececa93c1e0b8e6ee2aca0e45f8214c.jpg",
  ];
  return (
    <div className="w-full overflow-hidden min-h-screen bg-[#d0e0f4] flex justify-center items-center">
      <AnimatePresence mode="wait">
        {phase === "ph1" && (
          <motion.div
            key="ph1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full flex flex-col gap-3 items-center relative"
          >
            <Confetti />

            <img src="/Memotime/hibear.gif" alt="bear" className="w-60" />

            <CameraComponent onPhotoTaken={handlePhotoTaken} />

            <h3 className="text-xl italic w-60 text-center">
              smile and take a picture to continue
            </h3>

            {/* THANK YOU OVERLAY WITH PHOTO */}
            <AnimatePresence>
              {showThanks && capturedPhoto && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute   top-0 left-0  backdrop-blur-md
                             flex flex-col items-center w-full h-full justify-center gap-4 z-50"
                >
                  <div className="flex w-auto flex-col items-center gap-3 justify-start bg-white p-4 h-70">
                    <img
                      src={capturedPhoto}
                      alt="your smile"
                      className="w-52 h-48 object-cover  shadow-lg"
                    />
                    <p className="text-sm text-neutral-500 font-semibold">
                      Thank you for smiling
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
        {phase === "ph2" && (
          <motion.div
            key="ph2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: 20,
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full min-h-screen bg-[#dbe9fb] flex flex-col items-center justify-center gap-8 py-10 relative overflow-hidden"
          >
            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl text-center font-serif italic text-[#ff3898]"
            >
              Welcome to our ✨ Timeline ✨
            </motion.h1>

            {/* Subtitle */}
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl font-semibold text-[#ff3898]"
            >
              {title_1}
            </motion.h2>

            {/* Hanging string */}
            <div className="w-full flex justify-center relative mt-6">
              <div className="absolute top-2 w-[420px] h-[2px]  border border-[#ff3898] border-dashed  rounded-full" />

              {/* Polaroids */}
              <div className="flex gap-10 mt-6">
                {/* photo */}
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
                  {/* Clip */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-6 bg-gray-700 rounded-sm z-10" />

                  {/* Polaroid */}
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
                    ></div>

                    <p className="text-center text-sm mt-3 text-rose-600 font-medium"></p>
                  </div>
                </motion.div>
                {/* photo */}
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
                  {/* Clip */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-6 bg-gray-700 rounded-sm z-10" />

                  {/* Polaroid */}
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
                    ></div>

                    <p className="text-center text-sm mt-3 text-rose-600 font-medium"></p>
                  </div>
                </motion.div>
              </div>
            </div>
            <button
              onClick={() => {
                setPhase("ph3");
              }}
              className="px-10 py-1 mt-6 rounded-2xl bg-[#f7cfe2] cursor-pointer shadow-xl shadow-[#ef479855] text-xl font-semibold text-[#ff3898] border-[#ff3898] border-dashed border-2"
            >
              Next
            </button>
          </motion.div>
        )}{" "}
        {phase === "ph3" && (
          <motion.div
            key="ph3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="w-full h-full flex flex-col items-center gap-3"
          >
            <h3 className="text-xl font-bold uppercase tracking-wider  py-10 text-[#ff3898]">
              {title_2}
            </h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible" // Animates when it enters the viewport
              viewport={{ once: true }} // Only animate once
              className="flex flex-col items-center gap-3"
            >
              {/* Row 1 */}
              <motion.div
                variants={rowVariants}
                className="row1 flex items-center gap-4"
              >
                <img src="/Memotime/g1.png" alt="g1" className="w-30" />
                <div className="p-4 w-46 h-64 rotate-12 bg-white flex items-start relative">
                  <div
                    style={{
                      backgroundImage: `url(${photo_3})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                    className="w-full  h-46 "
                  ></div>
                  <img
                    src="/Memotime/star.png"
                    alt="star"
                    className="absolute w-10 -top-5 -right-5"
                  />
                </div>
              </motion.div>

              {/* Row 2 */}
              <motion.div
                variants={rowVariants}
                className="row2 flex items-center gap-4"
              >
                <div className="p-4 w-46 h-64 -rotate-12 bg-white flex items-start relative">
                  <div
                    style={{
                      backgroundImage: `url(${photo_4})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                    className="w-full  h-46 "
                  ></div>
                  <img
                    src="/Memotime/star.png"
                    alt="star"
                    className="absolute w-10 -top-5 -left-5"
                  />
                </div>
                <img src="/Memotime/g2.png" alt="g1" className="w-30" />
              </motion.div>

              {/* Row 3 */}
              <motion.div
                variants={rowVariants}
                className="row3 flex items-center gap-4"
              >
                <img src="/Memotime/g3.png" alt="g1" className="w-30" />
                <div className="p-4 w-46 h-64 rotate-12 bg-white flex items-start relative">
                  <div
                    style={{
                      backgroundImage: `url(${photo_5})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                    className="w-full  h-46 "
                  ></div>
                  <img
                    src="/Memotime/star.png"
                    alt="star"
                    className="absolute w-10 -top-5 -right-5"
                  />
                </div>
              </motion.div>
            </motion.div>
            <button
              onClick={() => {
                setPhase("ph4");
              }}
              className="px-10 my-10 py-1 mt-6 rounded-2xl bg-[#f7cfe2] cursor-pointer shadow-xl shadow-[#ef479855] text-xl font-semibold text-[#ff3898] border-[#ff3898] border-dashed border-2"
            >
              Next
            </button>
          </motion.div>
        )}
        {phase == "ph4" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            key="ph4"
            className="w-full min-h-screen flex items-center justify-center pt-20 px-4"
            style={{
              backgroundImage: `url("https://i.pinimg.com/1200x/02/ad/b1/02adb1beb56fc11a7bd7c584b3f1ef3b.jpg")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h3 className="sm:w-[450px] w-full min-h-sm text-lg text-center bg-[#a2cbed] rounded-xl p-6 font-bold border-3 border-[#522912] text-[#274660] relative break-words">
              {end_message}
              <img
                src="/Memotime/flg.gif"
                alt="bear giving flower"
                className="absolute -top-40 left-26"
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

/* =========================
   CAMERA COMPONENT
========================= */

type FacingMode = "user" | "environment";

interface CameraComponentProps {
  onPhotoTaken?: (photo: string) => void;
}

const CameraComponent: React.FC<CameraComponentProps> = ({ onPhotoTaken }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [isOn, setIsOn] = useState(false);
  const [flash, setFlash] = useState(false);
  const [facingMode, setFacingMode] = useState<FacingMode>("user");

  const startCamera = async () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());

    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode },
    });

    streamRef.current = stream;
    if (videoRef.current) videoRef.current.srcObject = stream;
  };

  useEffect(() => {
    if (isOn) startCamera();
    return () => streamRef.current?.getTracks().forEach((t) => t.stop());
  }, [isOn, facingMode]);

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    setFlash(true);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    ctx.drawImage(videoRef.current, 0, 0);

    const photo = canvas.toDataURL("image/png");

    setTimeout(() => {
      setFlash(false);
      onPhotoTaken?.(photo); // 🔥 SEND PHOTO UP
    }, 200);
  };

  return (
    <div className="relative w-[360px]">
      {flash && (
        <div className="absolute inset-0 bg-white z-50 animate-flash" />
      )}

      <div className="bg-[#ff3898] rounded-3xl p-4 shadow-2xl">
        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-2">
          <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center">
            {isOn && (
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setIsOn(true)}
              className="bg-green-600 text-white text-xs px-3 py-1 rounded-full font-semibold"
            >
              ON
            </button>

            {isOn && (
              <button
                onClick={() =>
                  setFacingMode((prev) =>
                    prev === "user" ? "environment" : "user"
                  )
                }
                className="bg-white text-xs px-3 py-1 rounded-full font-semibold"
              >
                FLIP
              </button>
            )}
          </div>
        </div>

        {/* SCREEN */}
        <div className="bg-black rounded-xl overflow-hidden h-[220px]">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover ${
              facingMode === "user" ? "scale-x-[-1]" : ""
            }`}
          />
        </div>

        {/* CAPTURE */}
        {isOn && (
          <div className="flex justify-center mt-4">
            <button
              onClick={capturePhoto}
              className="w-14 h-14 bg-white rounded-full border-4 border-gray-300 active:scale-95"
            />
          </div>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default MemoryTimeline;
