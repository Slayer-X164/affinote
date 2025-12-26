"use client";
import { useEffect, useRef, useState } from "react";
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
  photo_text_1: string;
  photo_1: string;
  photo_text_2: string;
  photo_2: string;
  photo_text_3: string;
  photo_3: string;
  end_message: string;
};
export default function AppreciationFriend({
  photo_text_1 = "day at college",
  photo_1 = "https://i.pinimg.com/1200x/01/7c/04/017c04c42e32a0a774fed4fe54c4a3a5.jpg",

  photo_text_2 = "our cafe hops",
  photo_2 = "https://i.pinimg.com/736x/53/21/16/5321167fe285f106a7630ccf1e527b1d.jpg",

  photo_text_3 = "Random hangout",
  photo_3 = "https://i.pinimg.com/736x/3b/2e/a2/3b2ea263064478864d4349a6211a4443.jpg",

  end_message = ` I was just thinking about how much I appreciate having you in my life. No matter how much time passes, nothing ever changes between us, and I love that. Thanks for being the one person I can always be 100% myself around, no filters needed. You’ve been there for the big wins and the messy days, and it means the world to me. Life is just a lot better and way funnier with you in my corner. I don’t say it enough, but thanks for being the best friend I could ask for. You’re stuck with me forever , just thought you should know! no filters needed. You’ve been there for the big wins and the messy days, and it means the world to me. Life is just a lot better and way funnier with you in my corner.`,
}: AppreciationFriendProptype) {
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
  return (
    <div className="w-full overflow-hidden min-h-screen bg-[#fdf9e8] flex justify-center items-center ">
      <AnimatePresence mode="wait">
        {phase === "ph1" && (
          <motion.div
            key="ph1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              ease: "backInOut",
              duration: 0.6,
            }}
            className="w-full h-full flex flex-col gap-0 items-center relative px-2"
          >
            {/* <Confetti /> */}

            <img src="/AppFriend/hi.gif" alt="bear" className="w-40" />

            <CameraComponent onPhotoTaken={handlePhotoTaken} />

            <h3 className="text-xl italic w-60 text-neutral-500 text-center pt-4">
              click a picture to continue
            </h3>

            {/* THANK YOU OVERLAY WITH PHOTO */}
            <AnimatePresence>
              {showThanks && capturedPhoto && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute   top-0 left-0  backdrop-blur-md
                                         flex flex-col items-center w-full min-h-screen  justify-center gap-4 z-50"
                >
                  <div className="flex w-auto flex-col items-center gap-3 justify-start bg-white p-4 h-70">
                    <img
                      src={capturedPhoto}
                      alt="your smile"
                      className="w-52 h-48 object-cover  shadow-lg"
                    />
                    <p className="text-sm text-neutral-500 font-semibold">
                      Thank you for smiling :)
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
        {phase == "ph2" && (
          <motion.div
            key={"ph2"}
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
            className="flex flex-col justify-center items-center w-full min-h-screen py-20 "
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
              className="absolute right-0 bottom-0 "
            />
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              style={{
                backgroundImage: 'url("/AppFriend/disc.png")',
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="w-80 h-80 relative"
            >
              {/* photo 1 */}
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
                  className="w-44  h-46"
                ></div>
                <h3 className="text-[#615b41] font-mono font-semibold text-md">
                  {photo_text_1}
                </h3>
              </motion.div>
              {/* photo 2 */}
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
                  className="w-44  h-46"
                ></div>
                <h3 className="text-[#615b41] font-mono font-semibold text-md">
                  {photo_text_2}
                </h3>
              </motion.div>
              {/* photo 3  */}
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
                  className="w-44  h-46"
                ></div>
                <h3 className="text-[#615b41] font-mono font-semibold text-md">
                  {photo_text_3}
                </h3>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
        {phase == "ph3" && (
          <motion.div
            key={"ph3"}
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
            <div className="rounded-2xl border-3 border-[#beab54] text-[#4b421c] min-w-60 max-w-[500px] text-md font-mono font-semibold px-4 py-10 min-h-60 bg-[#f3e299] text-center relative break-words">
              <img
                src="https://i.pinimg.com/originals/af/1f/9d/af1f9d34e42a47edf37a27417977c8d5.png"
                alt=""
                className="absolute -top-8 rotate-12 -left-8  w-20"
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

      <div className="bg-[#dda58a] rounded-3xl p-4 shadow-2xl border-3 border-[#4a2420]">
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
