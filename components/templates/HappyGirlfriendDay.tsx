"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Heart, Folder, Mail, Flower2, Trophy, Star, Gift, MessageSquareHeart } from "lucide-react";
import Confetti from "react-confetti";
import { pressStart2P } from "@/app/font";
import Image from "next/image";

type Scene = "desktop" | "loading" | "scene1" | "scene2" | "scene3" | "scene4" | "scene5" | "scene7" | "scene8" | "final";

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
    <div className="p-6 bg-[#FFF8E7]">
      {children}
    </div>
  </motion.div>
);

const PixelButton = ({ children, onClick, style, className = "", variant = "primary" }: any) => {
  const bg = variant === "primary" ? "bg-[#930500]" : variant === "secondary" ? "bg-[#95BBEA]" : "bg-white";
  const text = variant === "primary" ? "text-white" : "text-[#2B2B2B]";

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95, y: 4, boxShadow: "0px 0px 0 0 rgba(43,43,43,1)" }}
      onClick={onClick}
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

export default function HappyGirlfriendDay() {
  const [scene, setScene] = useState<Scene>("desktop");
  const [lovePoints, setLovePoints] = useState(0);



  const nextScene = (s: Scene) => {
    setScene("loading");
    setTimeout(() => setScene(s), 2000);
  };

  const DesktopScene = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center w-full h-full p-8 relative">
      <div className="absolute top-8 left-8 flex flex-col gap-8">
        <div className="flex flex-col items-center gap-2 cursor-pointer group">
          <Folder className="w-12 h-12 text-[#95BBEA] fill-[#95BBEA] group-hover:scale-110 transition-transform" />
          <span className={`text-[#2B2B2B] text-[10px] bg-white/50 px-2 py-1 ${pressStart2P.className}`}>Memories</span>
        </div>
        <div className="flex flex-col items-center gap-2 cursor-pointer group">
          <Mail className="w-12 h-12 text-[#95BBEA] fill-[#95BBEA] group-hover:scale-110 transition-transform" />
          <span className={`text-[#2B2B2B] text-[10px] bg-white/50 px-2 py-1 ${pressStart2P.className}`}>Letters</span>
        </div>
      </div>

      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onDoubleClick={() => nextScene("scene1")}
        onClick={() => nextScene("scene1")} // Add single click for mobile support
        className="flex flex-col items-center gap-4 cursor-pointer mt-20"
      >
        <div className="relative">
          <Heart className="w-20 h-20 text-[#930500] fill-[#930500]" />
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} className="absolute inset-0 flex items-center justify-center">
            <Heart className="w-10 h-10 text-white fill-white opacity-50" />
          </motion.div>
        </div>
        <span className={`text-[#2B2B2B] bg-white px-3 py-1 border-2 border-[#2B2B2B] shadow-[2px_2px_0_0_rgba(43,43,43,1)] text-xs sm:text-sm ${pressStart2P.className}`}>LOVE.exe</span>
      </motion.div>

      <div className="absolute bottom-8 right-8 text-center">
        <span className={`text-[#2B2B2B]/50 text-[8px] ${pressStart2P.className}`}>Click or Double-Tap to launch</span>
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
    const [showError, setShowError] = useState(false);

    const handleNoClick = () => {
      if (noClicks === 0) {
        setNoClicks(1);
      } else {
        setShowError(true);
      }
    };

    const handleNoHover = () => {
      if (noClicks > 0 && !showError) {
        setNoPos({
          x: Math.random() * 200 - 100,
          y: Math.random() * 200 - 100
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

          <div className="bg-white border-4 border-[#2B2B2B] p-4 w-full h-32 relative">
            {!showError ? (
              <TypewriterText text={noClicks === 0 ? "Hello...\nI made something just for my favorite person.\n\nContinue?" : "Really?\n\nAre you sure you want to click NO?"} />
            ) : (
              <motion.div animate={{ x: [-5, 5, -5, 5, 0] }} transition={{ duration: 0.4 }}>
                <span className={`text-[#930500] text-[10px] sm:text-xs leading-loose ${pressStart2P.className}`}>
                  SYSTEM ERROR:<br /><br />This option has been disabled for obvious reasons.
                </span>
              </motion.div>
            )}
          </div>

          <div className="flex gap-8 relative mt-4">
            <PixelButton onClick={() => nextScene("scene2")}>YES</PixelButton>

            <motion.div
              animate={showError ? { opacity: 0, scale: 0 } : { x: noPos.x, y: noPos.y }}
              onHoverStart={handleNoHover}
              onClick={handleNoClick}
              className="absolute left-[100px]"
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
            <Gift className="w-20 h-20 text-[#930500] fill-[#95BBEA]" />
            <span className={`text-[#930500] text-center text-sm sm:text-base leading-loose ${pressStart2P.className}`}>Daily Login Reward</span>
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className={`text-[#2B2B2B] text-lg sm:text-xl ${pressStart2P.className}`}>+100 Love Points</motion.span>
          </motion.div>

          <AnimatePresence>
            {lovePoints > 0 && (
              <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mt-4 bg-[#FFE9F2] border-4 border-[#2B2B2B] p-4 flex items-center gap-4 shadow-[4px_4px_0_0_rgba(43,43,43,1)] w-[90%]">
                <Trophy className="text-[#930500] fill-yellow-400 w-8 h-8" />
                <div className="flex flex-col gap-2">
                  <span className={`text-[8px] text-[#2B2B2B] ${pressStart2P.className}`}>Achievement Unlocked</span>
                  <span className={`text-[10px] sm:text-xs text-[#930500] ${pressStart2P.className}`}>♡ Best Girlfriend</span>
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
              <TypewriterText text="Do you know\nhow amazing\nyou are?" />
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
              <PixelButton onClick={() => nextScene("scene4")}>Next</PixelButton>
            </motion.div>
          )}
        </div>
      </PixelWindow>
    );
  };

  const Scene4 = () => {
    const [fill, setFill] = useState(0);
    useEffect(() => {
      const int = setInterval(() => {
        setFill(f => {
          if (f >= 100) {
            clearInterval(int);
            return 100;
          }
          return f + 2;
        });
      }, 50);
      return () => clearInterval(int);
    }, []);

    return (
      <PixelWindow title="Scanner.exe">
        <div className="flex flex-col items-center justify-center min-h-[300px] gap-12 w-full">
          <span className={`text-[#2B2B2B] text-sm sm:text-base ${pressStart2P.className}`}>Love Meter</span>

          <div className="w-full h-12 bg-white border-4 border-[#2B2B2B] p-1 relative overflow-hidden flex items-center justify-center">
            <div className="absolute top-0 left-0 bottom-0 bg-[#930500] transition-all duration-75" style={{ width: `${fill}%` }}></div>
            <span className={`relative z-10 text-[10px] sm:text-xs ${fill > 50 ? 'text-white' : 'text-[#2B2B2B]'} ${pressStart2P.className}`}>
              {fill >= 100 ? "999999%" : `${fill}%`}
            </span>
          </div>

          <motion.div animate={{ scale: fill >= 100 ? [1, 1.5, 1] : 1 }} transition={{ repeat: fill >= 100 ? Infinity : 0, duration: 0.5 }}>
            <Heart className={`w-24 h-24 ${fill >= 100 ? 'text-[#930500] fill-[#930500]' : 'text-[#2B2B2B] fill-transparent'} transition-colors`} />
          </motion.div>

          {fill >= 100 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
              <PixelButton onClick={() => nextScene("scene5")}>Continue</PixelButton>
            </motion.div>
          )}
        </div>
      </PixelWindow>
    );
  };

  const Scene5 = () => {
    const items = [
      { id: 0, icon: <Heart className="w-8 h-8 fill-current" />, name: "Hug", msg: "A warm virtual hug just for you! *squeezes tight*" },
      { id: 1, icon: <Flower2 className="w-8 h-8 fill-current" />, name: "Flower", msg: "A pixel flower that never dies, just like my love." },
      { id: 2, icon: <Star className="w-8 h-8 fill-current" />, name: "Star", msg: "Because you light up my darkest nights." },
      { id: 3, icon: <MessageSquareHeart className="w-8 h-8 fill-current" />, name: "Secret", msg: "You're the best thing that ever happened to me." },
    ];

    const [opened, setOpened] = useState<number[]>([]);
    const [inventoryOpen, setInventoryOpen] = useState<number | null>(null);

    const handleOpen = (id: number) => {
      setInventoryOpen(id);
      if (!opened.includes(id)) setOpened([...opened, id]);
    };

    return (
      <PixelWindow title="Inventory.exe">
        <div className="flex flex-col items-center gap-6 min-h-[300px]">
          <span className={`text-[#2B2B2B] text-xs sm:text-sm text-center ${pressStart2P.className} leading-loose`}>
            Inventory
            <br /><span className="text-[8px] text-[#930500]">Click items to inspect</span>
          </span>

          <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
            {items.map(item => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleOpen(item.id)}
                className={`flex flex-col items-center justify-center p-4 border-4 border-[#2B2B2B] cursor-pointer shadow-[2px_2px_0_0_rgba(43,43,43,1)] ${opened.includes(item.id) ? 'bg-[#FFF8E7]' : 'bg-white'}`}
              >
                <div className={`text-[#930500] ${opened.includes(item.id) ? 'opacity-50' : ''}`}>
                  {item.icon}
                </div>
                <span className={`text-[#2B2B2B] mt-2 text-[8px] ${pressStart2P.className}`}>{item.name}</span>
              </motion.div>
            ))}
          </div>

          <div className="bg-white border-4 border-[#2B2B2B] p-4 w-full h-24">
            {inventoryOpen !== null ? (
              <TypewriterText key={inventoryOpen} text={items.find(i => i.id === inventoryOpen)?.msg || ""} />
            ) : (
              <span className={`text-[#2B2B2B]/50 text-[10px] ${pressStart2P.className}`}>Select an item...</span>
            )}
          </div>

          {opened.length === items.length && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2">
              <PixelButton onClick={() => nextScene("scene7")}>Continue</PixelButton>
            </motion.div>
          )}
        </div>
      </PixelWindow>
    );
  };

  const Scene7 = () => {
    const achievements = [
      "My Favorite Person",
      "Professional Hugger",
      "Beautiful Smile",
      "Cutest Human",
      "Best Girlfriend"
    ];

    return (
      <PixelWindow title="Trophies.exe">
        <div className="flex flex-col gap-4 min-h-[350px]">
          <span className={`text-[#930500] text-sm text-center mb-4 ${pressStart2P.className}`}>Achievements</span>

          <div className="flex flex-col gap-3">
            {achievements.map((ach, i) => (
              <motion.div
                key={i}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.4, type: "spring" }}
                className="bg-white border-2 border-[#2B2B2B] p-3 flex items-center gap-4 shadow-[2px_2px_0_0_rgba(43,43,43,1)]"
              >
                <Trophy className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                <span className={`text-[#2B2B2B] text-[8px] sm:text-[10px] ${pressStart2P.className}`}>{ach}</span>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: achievements.length * 0.4 + 1 }} className="mt-auto flex justify-center">
            <PixelButton onClick={() => nextScene("scene8")}>Check Inbox</PixelButton>
          </motion.div>
        </div>
      </PixelWindow>
    );
  };

  const Scene8 = () => {
    const [envelopeOpen, setEnvelopeOpen] = useState(false);
    const [letterDone, setLetterDone] = useState(false);

    const letterText = "To the most amazing girlfriend,\n\nI just wanted to make this tiny game to remind you how much you mean to me.\n\nEvery day with you feels like unlocking a new beautiful achievement.\n\nThank you for being you.\n\nI love you endlessly.";

    return (
      <PixelWindow title="Inbox.exe">
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-8">

          {!envelopeOpen ? (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setEnvelopeOpen(true)}
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
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="w-full bg-[#FFF3E8] border-4 border-[#2B2B2B] p-6 shadow-[8px_8px_0_0_rgba(43,43,43,1)] relative">
              <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-2">
                <div className="w-4 h-4 rounded-full bg-[#930500]/20"></div>
                <div className="w-4 h-4 rounded-full bg-[#930500]/20"></div>
                <div className="w-4 h-4 rounded-full bg-[#930500]/20"></div>
              </div>

              <div className="mt-8">
                <TypewriterText text={letterText} onComplete={() => setLetterDone(true)} />
              </div>

              {letterDone && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 flex justify-end">
                  <Heart className="w-8 h-8 text-[#930500] fill-[#930500] animate-pulse" />
                </motion.div>
              )}
            </motion.div>
          )}

          {letterDone && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-4">
              <PixelButton onClick={() => nextScene("final")}>Finish</PixelButton>
            </motion.div>
          )}
        </div>
      </PixelWindow>
    );
  };

  const FinalScene = () => {
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center gap-12 z-10 relative w-full h-full">
        <Confetti width={windowSize.width} height={windowSize.height} colors={["#930500", "#95BBEA", "#FAD7DF", "#2B2B2B", "#FFFFFF"]} />

        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }}>
          <Heart className="w-32 h-32 text-[#930500] fill-[#930500]" />
        </motion.div>

        <div className="bg-white border-4 border-[#2B2B2B] p-6 shadow-[8px_8px_0_0_rgba(43,43,43,1)]">
          <h1 className={`text-[#930500] text-lg sm:text-xl md:text-2xl mb-6 leading-loose ${pressStart2P.className}`}>Congratulations!</h1>
          <p className={`text-[#2B2B2B] text-[10px] sm:text-xs mb-8 leading-loose ${pressStart2P.className}`}>
            You completed<br /><br />
            Happy Girlfriend Day.exe
          </p>
          <div className="bg-[#FFF8E7] border-2 border-[#2B2B2B] p-4 inline-block">
            <p className={`text-[#930500] text-sm ${pressStart2P.className}`}>Reward: ∞ Love Points</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 mt-8">
          <PixelButton variant="secondary" onClick={() => window.location.reload()}>Replay</PixelButton>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-[#FFF8E7] flex flex-col items-center justify-center overflow-hidden selection:bg-[#95BBEA]">
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
          className="w-full h-full flex items-center justify-center relative z-10"
        >
          {scene === "desktop" && <DesktopScene />}
          {scene === "loading" && <LoadingScene />}
          {scene === "scene1" && <Scene1 />}
          {scene === "scene2" && <Scene2 />}
          {scene === "scene3" && <Scene3 />}
          {scene === "scene4" && <Scene4 />}
          {scene === "scene5" && <Scene5 />}
          {scene === "scene7" && <Scene7 />}
          {scene === "scene8" && <Scene8 />}
          {scene === "final" && <FinalScene />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
