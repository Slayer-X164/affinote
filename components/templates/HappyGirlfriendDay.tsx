"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Heart, Folder, Mail, Flower2, Trophy, Star, Gift, MessageSquareHeart, InfinityIcon } from "lucide-react";
import Confetti from "react-confetti";
import { pressStart2P } from "@/app/font";
import Image from "next/image";

type Scene = "desktop" | "loading" | "scene1" | "scene2" | "scene3" | "scene5" | "scene8" | "final" | "scene_flowers" | "scene_hugs";
type SoundEffect = "click" | "confirm" | "error" | "open" | "celebrate";

// Palette
const colors = {
  bg: "#FFF8E7",
  primary: "#930500",
  secondary: "#95BBEA",
  pinkDark: "#FAD7DF",
  pinkLight: "#FFE9F2",
  cream: "#FFF3E8",
  white: "#FFFFFF",
  black: "#2B2B2B",
};

// --- Reusable UI Components ---

const PixelWindow = ({ title, children, onClose }: { title: string, children: React.ReactNode, onClose?: () => void }) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0, opacity: 0 }}
    className="bg-white border-4 border-[#2B2B2B] shadow-[8px_8px_0_0_rgba(43,43,43,1)] flex flex-col max-w-2xl w-full mx-4 overflow-hidden relative"
  >
    <div className="bg-[#95BBEA] border-b-4 border-[#2B2B2B] px-3 py-2 flex items-center justify-between select-none">
      <div className="flex items-center gap-2">
        <Heart className="text-[#930500] fill-[#930500] w-4 h-4" />
        <span className={`text-[#2B2B2B] text-xs sm:text-sm tracking-widest ${pressStart2P.className}`}>{title}</span>
      </div>
      <div className="flex gap-1">
        <div className="w-4 h-4 bg-[#FFF8E7] border-2 border-[#2B2B2B]" />
        <div className="w-4 h-4 bg-[#FFF8E7] border-2 border-[#2B2B2B]" />
        <div className="w-4 h-4 bg-[#930500] border-2 border-[#2B2B2B] cursor-pointer flex items-center justify-center" onClick={onClose}>
          <span className="text-white text-[10px] leading-none mb-0.5">x</span>
        </div>
      </div>
    </div>
    <div className="p-4 sm:p-6 bg-[#FFF8E7]">
      {children}
    </div>
  </motion.div>
);

const PixelButton = ({ children, onClick, soundEffect, style, className = "", variant = "primary" }: any) => {
  const bg = variant === "primary" ? "bg-[#930500]" : variant === "secondary" ? "bg-[#95BBEA]" : "bg-white";
  const text = variant === "primary" ? "text-white" : "text-[#2B2B2B]";

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95, y: 4, boxShadow: "0px 0px 0 0 rgba(43,43,43,1)" }}
      onClick={(event) => {
        soundEffect?.();
        onClick?.(event);
      }}
      style={style}
      className={`${bg} ${text} ${className} border-4 border-[#2B2B2B] px-4 py-2 sm:px-6 sm:py-3 shadow-[4px_4px_0_0_rgba(43,43,43,1)] font-bold uppercase transition-colors`}
    >
      <span className={`text-[10px] sm:text-xs ${pressStart2P.className}`}>{children}</span>
    </motion.button>
  );
};

const TypewriterText = ({ text, onComplete }: { text: string, onComplete?: () => void }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, 40);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return <span className={`whitespace-pre-wrap leading-loose text-[#2B2B2B] ${pressStart2P.className} text-[10px] sm:text-xs`}>{displayedText}</span>;
};

// --- Main Component ---
type HappyGirlfriendDayProp = {
  name?: string
  letter_text?: string

}
export default function HappyGirlfriendDay({
  name = "Aanya",
  letter_text = "To the most amazing girlfriend, I just wanted to make this tiny game to remind you how much you mean to me. Every day with you feels like unlocking a new beautiful achievement. Thank you for being you. I love you endlessly."

}:HappyGirlfriendDayProp) {
  const [scene, setScene] = useState<Scene>("desktop");
  const [lovePoints, setLovePoints] = useState(0);
  const [openedItems, setOpenedItems] = useState<string[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);

  const loadingScenes: Scene[] = ["scene1", "final"];

  useEffect(() => {
    return () => {
      audioContextRef.current?.close();
      audioContextRef.current = null;
    };
  }, []);

  const playSound = (effect: SoundEffect) => {
    if (typeof window === "undefined") return;

    const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = audioContextRef.current ?? new AudioContextClass();
    audioContextRef.current = ctx;

    if (ctx.state === "suspended") {
      void ctx.resume();
    }

    const tone = (
      startFrequency: number,
      endFrequency: number,
      startTime: number,
      duration: number,
      volume: number,
      type: OscillatorType = "square"
    ) => {
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();

      oscillator.type = type;
      oscillator.frequency.setValueAtTime(startFrequency, startTime);
      oscillator.frequency.exponentialRampToValueAtTime(endFrequency, startTime + duration);

      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.exponentialRampToValueAtTime(volume, startTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    };

    const now = ctx.currentTime;

    if (effect === "click") {
      tone(940, 620, now, 0.045, 0.025);
      return;
    }

    if (effect === "confirm") {
      tone(520, 780, now, 0.06, 0.03);
      tone(780, 1040, now + 0.05, 0.08, 0.025);
      return;
    }

    if (effect === "error") {
      tone(260, 190, now, 0.08, 0.03, "sawtooth");
      tone(190, 150, now + 0.06, 0.09, 0.02, "sawtooth");
      return;
    }

    if (effect === "celebrate") {
      tone(660, 880, now, 0.08, 0.03, "triangle");
      tone(880, 1320, now + 0.06, 0.09, 0.028, "triangle");
      tone(1320, 1760, now + 0.12, 0.1, 0.025, "square");
      tone(990, 1480, now + 0.18, 0.12, 0.02, "square");
      return;
    }

    tone(420, 620, now, 0.04, 0.025);
    tone(620, 930, now + 0.04, 0.05, 0.025);
    tone(930, 1240, now + 0.09, 0.07, 0.02);
  };

  const nextScene = (s: Scene) => {
    playSound(loadingScenes.includes(s) ? "open" : "confirm");

    if (loadingScenes.includes(s)) {
      setScene("loading");
      setTimeout(() => setScene(s), 2000);
      return;
    }

    setScene(s);
  };

  const DesktopScene = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center w-full h-full p-8 relative">
      {/* <div className="absolute top-8 left-8 flex flex-col gap-8">
        <div className="flex flex-col items-center gap-2 cursor-pointer group">
          <Folder className="w-12 h-12 text-[#95BBEA] fill-[#95BBEA] group-hover:scale-110 transition-transform" />
          <span className={`text-[#2B2B2B] text-[10px] bg-white/50 px-2 py-1 ${pressStart2P.className}`}>Memories</span>
        </div>
        <div className="flex flex-col items-center gap-2 cursor-pointer group">
          <Mail className="w-12 h-12 text-[#95BBEA] fill-[#95BBEA] group-hover:scale-110 transition-transform" />
          <span className={`text-[#2B2B2B] text-[10px] bg-white/50 px-2 py-1 ${pressStart2P.className}`}>Letters</span>
        </div>
      </div> */}
      <h3 className={`${pressStart2P.className} md:text-2xl text-lg text-center`}>Happy Girlfriend Day</h3>
      <h2 className={`${pressStart2P.className} md:text-2xl text-lg text-[#930500] mt-2 text-center`}>{name}</h2>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => nextScene("scene1")} // Add single click for mobile support
        className="flex flex-col items-center gap-4 cursor-pointer mt-10"
      >

        <div className="relative">
          <Heart className="w-20 h-20 text-[#930500] fill-[#930500]" />
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} className="absolute inset-0 flex items-center justify-center">
            <Heart className="w-10 h-10 text-white fill-white opacity-50" />
          </motion.div>
        </div>
        <span className={`text-[#2B2B2B] bg-white px-3 py-1 border-2 border-[#2B2B2B] shadow-[2px_2px_0_0_rgba(43,43,43,1)] text-xs sm:text-sm ${pressStart2P.className}`}>LOVE.exe</span>
      </motion.div>

      <div className="mt-10 text-center">
        <span className={`text-[#2B2B2B]/30 md:text-[10px] text-[8px]  ${pressStart2P.className}`}>Click to launch</span>
      </div>
    </motion.div>
  );

  const LoadingScene = () => (
    <div className="flex flex-col items-center justify-center h-full gap-8">
      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.8 }}>
        <Heart className="w-16 h-16 text-[#930500] fill-[#930500]" />
      </motion.div>
      <span className={`text-[#2B2B2B] text-xs sm:text-sm ${pressStart2P.className}`}>
        Loading...
      </span>
      <div className="flex gap-2">
        <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} className="w-4 h-4 bg-[#930500] border-2 border-[#2B2B2B]"></motion.div>
        <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-4 h-4 bg-[#930500] border-2 border-[#2B2B2B]"></motion.div>
        <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-4 h-4 bg-[#930500] border-2 border-[#2B2B2B]"></motion.div>
        <div className="w-4 h-4 border-2 border-[#2B2B2B]"></div>
        <div className="w-4 h-4 border-2 border-[#2B2B2B]"></div>
      </div>
    </div>
  );

  const Scene1 = () => {
    const [noClicks, setNoClicks] = useState(0);
    const [noPos, setNoPos] = useState({ x: 0, y: 0 });

    const handleNoClick = () => {
      playSound("error");
      setNoClicks((prev) => prev + 1);
      setNoPos({
        x: Math.random() * 160 - 80, // Constrain left/right to stay within screen
        y: Math.random() * -200 - 40 // Always move upwards to prevent clipping at the bottom
      });
    };

    const handleNoHover = () => {
      if (noClicks > 0) {
        setNoPos({
          x: Math.random() * 160 - 80,
          y: Math.random() * -200 - 40
        });
      }
    };

    return (
      <PixelWindow title="Hello.exe">
        <div className="flex flex-col items-center gap-8 min-h-[300px]">
          {/* Pixel Cat Approximation */}
          <div className="relative mt-8">
            <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="w-24 h-24 bg-[#2B2B2B] relative">
              <div className="absolute top-[-16px] left-0 w-8 h-16 bg-[#2B2B2B] clip-triangle"></div>
              <div className="absolute top-[-16px] right-0 w-8 h-16 bg-[#2B2B2B] clip-triangle"></div>
              <div className="absolute top-6 left-4 w-4 h-4 bg-white">
                <motion.div animate={{ scaleY: [1, 0.1, 1] }} transition={{ repeat: Infinity, duration: 3, delay: 1 }} className="w-full h-full bg-[#95BBEA]"></motion.div>
              </div>
              <div className="absolute top-6 right-4 w-4 h-4 bg-white">
                <motion.div animate={{ scaleY: [1, 0.1, 1] }} transition={{ repeat: Infinity, duration: 3, delay: 1 }} className="w-full h-full bg-[#95BBEA]"></motion.div>
              </div>
              <div className="absolute top-12 left-10 w-4 h-2 bg-pink-300"></div>
              {noClicks > 0 && (
                <div className="absolute top-4 left-4 w-4 h-2 bg-[#930500] rotate-45"></div>
              )}
            </motion.div>
          </div>

          <div className="bg-white border-4 border-[#2B2B2B] p-4 w-full min-h-[128px] h-auto relative">
            <TypewriterText text={ `Hey ${name}... I made something just for you. Continue?` } />
          </div>

          <div className="flex gap-4 sm:gap-8 mt-4">
            <PixelButton onClick={() => nextScene("scene2")}>YES</PixelButton>

            <motion.div
              animate={{ x: noPos.x, y: noPos.y }}
              onHoverStart={handleNoHover}
              onClick={handleNoClick}
            >
              <PixelButton variant="secondary">NO</PixelButton>
            </motion.div>
          </div>
        </div>
      </PixelWindow>
    );
  };

  const Scene2 = () => {
    useEffect(() => {
      setTimeout(() => setLovePoints(100), 1000);
    }, []);

    return (
      <PixelWindow title="Reward.exe">
        <div className="flex flex-col items-center justify-center min-h-[300px] gap-8">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1, rotate: [0, 10, -10, 0] }} transition={{ scale: { type: "spring", bounce: 0.6 }, rotate: { duration: 0.5 } }} className="flex flex-col items-center gap-4">
            <img src="https://media.tenor.com/-J9wqAoLbRQAAAAi/happy.gif" alt="happy cat" className="w-28 sm:w-40" />
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className={`text-[#2B2B2B] text-lg sm:text-xl ${pressStart2P.className}`}>+100 Love Points</motion.span>
          </motion.div>

          <AnimatePresence>
            {lovePoints > 0 && (
              <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mt-4 bg-[#FFE9F2] border-4 border-[#2B2B2B] p-4 flex items-center gap-4 shadow-[4px_4px_0_0_rgba(43,43,43,1)] w-full sm:w-[90%]">
                <Trophy className="text-[#930500]  w-8 h-8" />
                <div className="flex flex-col gap-2">
                  <span className={`text-[10px] text-[#2B2B2B] ${pressStart2P.className}`}>Achievement Unlocked</span>
                  <span className={`text-[13px] sm:text-xs text-[#930500] ${pressStart2P.className}`}>Best Girlfriend</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {lovePoints > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="mt-8 relative z-10">
              <PixelButton onClick={() => nextScene("scene3")}>Continue</PixelButton>
            </motion.div>
          )}

          {/* Floating Hearts */}
          {lovePoints > 0 && [...Array(5)].map((_, i) => {
            const randomX = Math.random() * 200 - 100;
            return (
              <motion.div
                key={i}
                initial={{ y: 20, opacity: 0, x: randomX }}
                animate={{ y: -250, opacity: [0, 0.6, 0], x: randomX + (Math.random() * 40 - 20) }}
                transition={{ duration: 4 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 3, ease: "easeInOut" }}
                className="absolute bottom-10 pointer-events-none"
              >
                <Heart className="w-5 h-5 text-[#930500] fill-[#930500]" />
              </motion.div>
            );
          })}
        </div>
      </PixelWindow>
    );
  };

  const Scene3 = () => {
    const [step, setStep] = useState(0);
    const [response, setResponse] = useState("");

    const handleChoice = (idx: number) => {
      playSound("click");
      if (idx === 0) setResponse("Not really? Well, you are the most amazing person in the world!");
      if (idx === 1) setResponse("Only maybe? I'll have to remind you every single day then.");
      if (idx === 2) setResponse("Of course you do! And don't you ever forget it. <3");
      setStep(1);
    };

    return (
      <PixelWindow title="Question.exe">
        <div className="flex flex-col items-center gap-6 min-h-[300px]">
          <div className="w-16 h-16 bg-[#2B2B2B] relative mt-4">
            {/* Small Cat Head */}
            <div className="absolute top-[-8px] left-0 w-4 h-8 bg-[#2B2B2B]"></div>
            <div className="absolute top-[-8px] right-0 w-4 h-8 bg-[#2B2B2B]"></div>
            <div className="absolute top-4 left-3 w-2 h-2 bg-white"></div>
            <div className="absolute top-4 right-3 w-2 h-2 bg-white"></div>
          </div>

          <div className="bg-white border-4 border-[#2B2B2B] p-4 w-full min-h-[100px]">
            {step === 0 ? (
              <TypewriterText text="Do you know how amazing you are?" />
            ) : (
              <TypewriterText text={response} />
            )}
          </div>

          {step === 0 ? (
            <div className="flex flex-col gap-4 w-full mt-4">
              <PixelButton variant="secondary" onClick={() => handleChoice(0)}>Not really</PixelButton>
              <PixelButton variant="secondary" onClick={() => handleChoice(1)}>Maybe</PixelButton>
              <PixelButton variant="secondary" onClick={() => handleChoice(2)}>Of course</PixelButton>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="mt-8">
              <PixelButton onClick={() => nextScene("scene5")}>Next</PixelButton>
            </motion.div>
          )}
        </div>
      </PixelWindow>
    );
  };



  const Scene5 = () => {
    const items = [
      { id: "flowers", icon: <Flower2 className="w-8 h-8 fill-current" />, name: "Flowers", target: "scene_flowers" },
      { id: "hugs", icon: <Heart className="w-8 h-8 fill-current" />, name: "Hugs", target: "scene_hugs" },
      { id: "letter", icon: <Mail className="w-8 h-8 fill-current" />, name: "Letter", target: "scene8" },
    ] as const;

    const handleOpen = (id: string, target: Scene) => {
      playSound(target === "scene8" ? "open" : "click");
      if (!openedItems.includes(id)) {
        setOpenedItems([...openedItems, id]);
      }
      nextScene(target);
    };

    return (
      <PixelWindow title="Inventory.exe">
        <div className="flex flex-col items-center gap-6 min-h-[300px]">
          <span className={`text-[#2B2B2B] text-xs sm:text-sm text-center ${pressStart2P.className} leading-loose`}>
            Inventory
            <br /><span className="text-[8px] text-[#930500]">Click items to open</span>
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-sm mt-4">
            {items.map(item => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleOpen(item.id, item.target)}
                className={`flex flex-col items-center justify-center p-4 border-4 border-[#2B2B2B] cursor-pointer shadow-[2px_2px_0_0_rgba(43,43,43,1)] ${openedItems.includes(item.id) ? 'bg-[#FFF8E7]' : 'bg-white'}`}
              >

                <div className={`text-[#930500] ${openedItems.includes(item.id) ? 'opacity-50' : ''}`}>
                  {item.icon}
                </div>
                <span className={`text-[#2B2B2B] mt-2 text-[8px] ${pressStart2P.className}`}>{item.name}</span>


              </motion.div>
            ))}
          </div>

          {openedItems.length === items.length && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8">
              <PixelButton onClick={() => nextScene("final")}>Continue</PixelButton>
            </motion.div>
          )}
        </div>
      </PixelWindow>
    );
  };



  const SceneFlowers = () => (
    <PixelWindow title="flowers.exe">
      <div className="flex flex-col items-center justify-center gap-8 min-h-[300px]">
        <img src="https://media.tenor.com/5NePTyN_FJIAAAAi/flowers-rose.gif" alt="flower" className="w-60" />
        <PixelButton onClick={() => nextScene("scene5")}>Back</PixelButton>
      </div>
    </PixelWindow>
  );

  const SceneHugs = () => (
    <PixelWindow title="hugs.exe">
      <div className="flex flex-col items-center justify-center gap-8 min-h-[300px]">
        <img src="https://media.tenor.com/APDVT7Y1smgAAAAi/cute.gif" alt="hug" className="w-60" />
        <PixelButton onClick={() => nextScene("scene5")}>Back</PixelButton>
      </div>
    </PixelWindow>
  );

  const Scene8 = () => {
    const [envelopeOpen, setEnvelopeOpen] = useState(false);
    const [letterDone, setLetterDone] = useState(false);



    return (
      <PixelWindow title="Inbox.exe">
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-8">

          {!envelopeOpen ? (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                playSound("open");
                setEnvelopeOpen(true);
              }}
              className="flex flex-col items-center gap-4 cursor-pointer"
            >
              <div className="relative">
                {/* <Mail className="w-24 h-24 text-[#930500] fill-[#FFF3E8]" /> */}
                <Image src="/HappyGFday/email.png" alt="Letter" width={100} height={100}></Image>
                <div className="absolute top-0 right-0 w-6 h-6 bg-[#930500] rounded-full border-2 border-[#2B2B2B] flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold">1</span>
                </div>
              </div>
              <span className={`text-[#2B2B2B] text-[10px] sm:text-xs ${pressStart2P.className} bg-white border-2 border-[#2B2B2B] px-3 py-1`}>For Your Eyes Only</span>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="w-full bg-[#FFF3E8] border-4 border-[#2B2B2B] p-4 sm:p-6 shadow-[8px_8px_0_0_rgba(43,43,43,1)] relative">
              <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-2">
                <div className="w-4 h-4 rounded-full bg-[#930500]/20"></div>
                <div className="w-4 h-4 rounded-full bg-[#930500]/20"></div>
                <div className="w-4 h-4 rounded-full bg-[#930500]/20"></div>
              </div>

              <div className="mt-8">
                <TypewriterText text={letter_text} onComplete={() => setLetterDone(true)} />
              </div>


            </motion.div>
          )}

          {letterDone && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-4">
              <PixelButton onClick={() => nextScene("scene5")}>Back</PixelButton>
            </motion.div>
          )}
        </div>
      </PixelWindow>
    );
  };

  const FinalScene = () => {
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
      playSound("celebrate");
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
      <div className="flex flex-col items-center justify-center min-h-[560px] p-8 text-center gap-12 z-10 relative w-full h-full">
        <Confetti width={windowSize.width} height={windowSize.height} colors={["#930500", "#95BBEA", "#FAD7DF", "#2B2B2B", "#FFFFFF"]} />

        <img src="https://media.tenor.com/-f6Vna8VsdEAAAAi/happy-cat.gif" alt="cat dancing" className="w-24 sm:w-32"></img>

        <div className="bg-white border-4 border-[#2B2B2B] p-6 shadow-[8px_8px_0_0_rgba(43,43,43,1)]">
          <h1 className={`text-[#930500] text-lg sm:text-xl md:text-2xl mb-6 leading-loose ${pressStart2P.className}`}>Congratulations!</h1>
          <p className={`text-[#2B2B2B] text-[10px] sm:text-xs mb-8  ${pressStart2P.className}`}>
            You completed<br /><br />
            Love.exe
          </p>
          <div className="bg-[#FFF8E7] border-2 border-[#2B2B2B] p-4 inline-block">
            <p className={`text-[#930500] text-xs ${pressStart2P.className} flex items-center gap-2`}>Reward:<InfinityIcon className="" /> Love Points</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 mt-8">
          <PixelButton
            variant="secondary"
            onClick={() => window.location.reload()}
            soundEffect={() => playSound("confirm")}
          >
            Replay
          </PixelButton>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-[#FFF8E7] flex flex-col items-center justify-center overflow-hidden selection:bg-[#95BBEA]">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(#930500 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

      {/* Scanlines effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.05)_50%)] bg-[length:100%_4px] z-50 mix-blend-overlay"></div>

      <AnimatePresence mode="wait">
        <motion.div
          key={scene}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="w-full min-h-[560px] flex items-center justify-center relative z-10"
        >
          {scene === "desktop" && <DesktopScene />}
          {scene === "loading" && <LoadingScene />}
          {scene === "scene1" && <Scene1 />}
          {scene === "scene2" && <Scene2 />}
          {scene === "scene3" && <Scene3 />}

          {scene === "scene5" && <Scene5 />}

          {scene === "scene_flowers" && <SceneFlowers />}
          {scene === "scene_hugs" && <SceneHugs />}
          {scene === "scene8" && <Scene8 />}
          {scene === "final" && <FinalScene />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
