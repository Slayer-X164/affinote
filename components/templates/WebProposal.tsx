"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence, Variants } from "framer-motion";
import {
  FaHeart,
  FaSmile,
  FaStar,
  FaMagic,
  FaMusic,
  FaSun,
} from "react-icons/fa";
import { anton } from "@/app/font";
import Image from "next/image";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
export interface ProposalData {
  heroMessage: string;
  memories: { image: string; text: string }[];
  reasons: string[];
  loveMessage: string;
  proposalQuestion: string;
}

/* ─────────────────────────────────────────────
   Default data (swap with your own props)
───────────────────────────────────────────── */
const defaultData: ProposalData = {
  heroMessage: "HEY CUTIe",
  memories: [
    {
      image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=80",
      text: "The day we met — and everything changed.",
    },
    {
      image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=600&q=80",
      text: "When you made me laugh until my stomach hurt.",
    },
    {
      image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&q=80",
      text: "My favorite thing about you? Everything.",
    },
    {
      image: "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=600&q=80",
      text: "Every ordinary moment felt extraordinary with you.",
    },
  ],
  reasons: [
    "The way your eyes light up when you're excited",
    "Your laugh is genuinely my favorite sound",
    "You make every place feel like home",
    "You are endlessly, effortlessly kind",
    "You bring out the best version of me",
    "Life with you is my favorite adventure",
  ],
  loveMessage:
    "You walked into my life quietly,\nbut somehow you became my favorite person.\nI didn't know I was missing something\nuntil I found you.",
  proposalQuestion: "Will you be mine? ❤️",
};

/* ─────────────────────────────────────────────
   Floating Hearts Background
───────────────────────────────────────────── */
function FloatingHearts({ count = 12 }: { count?: number }) {
  const hearts = Array.from({ length: count }, (_, i) => i);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((i) => (
        <motion.div
          key={i}
          className="absolute text-white select-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 20 + 10}px`,
            opacity: 0,
          }}
          animate={{
            y: [0, -120, -240],
            opacity: [0, 0.7, 0],
            scale: [0.5, 1, 0.8],
            rotate: [0, Math.random() * 30 - 15],
          }}
          transition={{
            duration: Math.random() * 4 + 4,
            repeat: Infinity,
            delay: Math.random() * 6,
            ease: "easeOut",
          }}
        >
          ♥
        </motion.div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Celebration Hearts (Yes clicked)
───────────────────────────────────────────── */
function CelebrationBurst() {
  const emojis = ["💖", "🌸", "✨", "💝", "🌷", "💫", "🥰", "🎀"];
  const particles = Array.from({ length: 30 }, (_, i) => i);
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-50">
      {particles.map((i) => (
        <motion.div
          key={i}
          className="absolute text-xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            y: [0, -(Math.random() * 300 + 100)],
            x: [0, Math.random() * 200 - 100],
            scale: [0, 1.4, 0.8],
            opacity: [0, 1, 0],
            rotate: [0, Math.random() * 360],
          }}
          transition={{
            duration: Math.random() * 2.5 + 1.5,
            delay: Math.random() * 0.8,
            ease: "easeOut",
          }}
        >
          {emojis[i % emojis.length]}
        </motion.div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Section Wrapper with scroll-in animation
───────────────────────────────────────────── */
function FadeSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ─────────────────────────────────────────────
   Memory Card
───────────────────────────────────────────── */
function MemoryCard({
  memory,
  index,
}: {
  memory: { image: string; text: string };
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isEven = index % 2 === 0;

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: isEven ? -60 : 60 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col sm:flex-row items-center gap-6  bg-white/70 backdrop-blur-sm rounded-3xl p-5  "
      >
        <div className="w-full sm:w-44 h-44 flex-shrink-0 rounded-2xl overflow-hidden">
          <img
            src={memory.image}
            alt={memory.text}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <span className="text-white text-2xl">✦</span>
          <p className="mt-2 text-white font-medium text-lg leading-snug" style={{ fontFamily: "'Lora', Georgia, serif" }}>
            {memory.text}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────
   Reason Card
───────────────────────────────────────────── */
const reasonIcons = [FaHeart, FaSmile, FaStar, FaMagic, FaMusic, FaSun];
const cardColors = [
  "bg-rose-50 border-rose-200",
  "bg-sky-50 border-sky-200",
  "bg-fuchsia-50 border-fuchsia-200",
  "bg-amber-50 border-amber-200",
  "bg-emerald-50 border-emerald-200",
  "bg-violet-50 border-violet-200",
];
const iconColors = [
  "text-white",
  "text-sky-400",
  "text-fuchsia-400",
  "text-amber-400",
  "text-emerald-400",
  "text-violet-400",
];

function ReasonCard({ reason, index }: { reason: string; index: number }) {
  const Icon = reasonIcons[index % reasonIcons.length];
  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{
        duration: 3 + index * 0.4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.3,
      }}
      className={`rounded-2xl border p-5 flex flex-col items-center text-center gap-3 shadow-sm ${cardColors[index % cardColors.length]}`}
    >
      <div className={`text-2xl ${iconColors[index % iconColors.length]}`}>
        <Icon />
      </div>
      <p className="text-white text-sm font-medium leading-snug" style={{ fontFamily: "'Lora', Georgia, serif" }}>
        {reason}
      </p>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Love Message — line-by-line reveal
───────────────────────────────────────────── */
function LoveNote({ message }: { message: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const lines = message.split("\n").filter(Boolean);

  return (
    <div
      ref={ref}
      className="bg-white/80 backdrop-blur-sm rounded-3xl px-8 py-10 border border-pink-100 shadow-md max-w-xl mx-auto text-center"
    >
      <div className="text-white text-4xl mb-4">💌</div>
      {lines.map((line, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.35 + 0.3, duration: 0.7, ease: "easeOut" }}
          className="text-white text-lg leading-relaxed mb-1"
          style={{ fontFamily: "'Lora', Georgia, serif" }}
        >
          {line}
        </motion.p>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Proposal Section
───────────────────────────────────────────── */
function ProposalCard({ question }: { question: string }) {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [said, setSaid] = useState(false);

  const escapeNo = () => {
    const x = (Math.random() - 0.5) * 400;
    const y = (Math.random() - 0.5) * 300;
    setNoPos({ x, y });
  };

  return (
    <div className="relative flex flex-col items-center">
      {said && <CelebrationBurst />}

      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative bg-white/90 backdrop-blur-md rounded-[2rem] px-8 py-12 border border-rose-200 shadow-xl max-w-md w-full text-center"
        style={{
          boxShadow:
            "0 0 0 1px #fbcfe8, 0 0 40px 8px #fce7f388, 0 8px 40px rgba(244,114,182,0.15)",
        }}
      >
        <div className="text-white text-5xl mb-4">💍</div>
        <p className="text-white text-base mb-5 font-medium tracking-wide uppercase" style={{ letterSpacing: "0.08em" }}>
          So I have something important to ask…
        </p>
        <h2
          className="text-white text-3xl sm:text-4xl font-bold mb-10 leading-tight"
          style={{ fontFamily: "'Lora', Georgia, serif" }}
        >
          {question}
        </h2>

        <AnimatePresence mode="wait">
          {said ? (
            <motion.div
              key="yes-response"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="text-center"
            >
              <p className="text-white text-2xl font-bold" style={{ fontFamily: "'Lora', Georgia, serif" }}>
                🥰 You just made me the happiest person alive.
              </p>
            </motion.div>
          ) : (
            <motion.div key="buttons" className="flex items-center justify-center gap-4 flex-wrap">
              {/* YES */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSaid(true)}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 text-white font-semibold text-lg shadow-md shadow-rose-200"
              >
                Yes 💖
              </motion.button>

              {/* NO — runs away */}
              <motion.button
                animate={{ x: noPos.x, y: noPos.y }}
                transition={{ type: "spring", stiffness: 180, damping: 14 }}
                onHoverStart={escapeNo}
                onTouchStart={escapeNo}
                onClick={escapeNo}
                className="px-8 py-3 rounded-full bg-white border border-rose-200 text-white font-semibold text-lg shadow-sm select-none cursor-not-allowed"
              >
                No 🙈
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export default function WebProposal({
  data = defaultData,
}: {
  data?: ProposalData;
}) {
  const [opened, setOpened] = useState(false);
  const [showCurtain, setShowCurtain] = useState<boolean>(false);
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
  const handleOpen = () => {

    setShowCurtain(true)
    setTimeout(() => {
      setOpened(true)
    }, 1000);
    setTimeout(() => {
      setShowCurtain(false);

    }, 1200);
  }
  // Load Google Fonts
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@400;500&display=swap";
    document.head.appendChild(link);
  }, []);

  return (
    <div
      className="min-h-screen w-full bg-indigo-600"
      style={{
        fontFamily: "'DM Sans', sans-serif",
        // background: "linear-gradient(160deg, #fff1f2 0%, #fce7f3 30%, #e0f2fe 70%, #fdf4ff 100%)",
      }}
    >
      <motion.div
        className="fixed inset-0 bg-[#1e1a4d] origin-top z-500"
        variants={curtainVariants}
        initial="open"
        animate={showCurtain ? "closed" : "open"}
      />
      {/* ── 1. HERO ── */}
      {!opened && (
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center  px-6 overflow-hidden">
          {/* <FloatingHearts count={18} /> */}

          {/* Soft orbs */}


          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 max-w-xl"
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1], rotate: [0, -5, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="text-6xl mb-6"
            >

            </motion.div>

            <div className="relative">
              <Image className="absolute -top-22.5 z-2 left-1/2 -translate-x-1/2" src={"https://media.tenor.com/lR0naZISMKAAAAAi/%EB%AA%A8%EC%B0%8C%EB%83%A5-%EC%97%AC%EC%9C%A0.gif"} width={150} height={150} alt="cute hero cat" />
              <h1
                className={`text-9xl relative  font-bold text-white leading-tight  ${anton.className} uppercase`}

              >
                {data.heroMessage}
              </h1>
            </div>

            <p className="text-white text-base sm:text-lg mb-5 leading-relaxed font-semibold upper">
              wanted to tell you something…
            </p>

            <AnimatePresence>
              {!opened && (
                <motion.button
                  exit={{ opacity: 0, scale: 0.8 }}

                  whileTap={{ y: 4 }}
                  onClick={handleOpen}
                  className="px-10 py-3 text-lg font-semibold rounded-full shadow-[0_8px_0_#1e1a4d] active:shadow-[0_0px_0_#1e1a4d] transition-shadow duration-200 cursor-pointer bg-white text-indigo-950 border border-gray-400"

                >
                  Check
                </motion.button>
              )}
            </AnimatePresence>


          </motion.div>
        </section>
      )}

      {/* Content revealed after Open */}
      <AnimatePresence>
        {opened && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* ── 2. MEMORIES ── */}
            <FadeSection className="px-4 sm:px-8 py-20 max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-white uppercase text-xs tracking-[0.2em] font-semibold">Our Story</span>
                <h2
                  className="text-white text-3xl sm:text-4xl font-bold mt-2"
                  style={{ fontFamily: "'Lora', Georgia, serif" }}
                >
                  Moments I Treasure
                </h2>
              </div>
              <div className="flex flex-col gap-6">
                {data.memories.map((mem, i) => (
                  <MemoryCard key={i} memory={mem} index={i} />
                ))}
              </div>
            </FadeSection>

            {/* ── 3. REASONS ── */}
            <FadeSection className="px-4 sm:px-8 py-20 max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-white uppercase text-xs tracking-[0.2em] font-semibold">The List</span>
                <h2
                  className="text-white text-3xl sm:text-4xl font-bold mt-2"
                  style={{ fontFamily: "'Lora', Georgia, serif" }}
                >
                  Why I Love You
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {data.reasons.slice(0, 6).map((reason, i) => (
                  <ReasonCard key={i} reason={reason} index={i} />
                ))}
              </div>
            </FadeSection>

            {/* ── 4. LOVE NOTE ── */}
            <FadeSection className="px-4 sm:px-8 py-20 max-w-2xl mx-auto">
              <div className="text-center mb-10">
                <span className="text-white uppercase text-xs tracking-[0.2em] font-semibold">A Note</span>
                <h2
                  className="text-white text-3xl sm:text-4xl font-bold mt-2"
                  style={{ fontFamily: "'Lora', Georgia, serif" }}
                >
                  From My Heart
                </h2>
              </div>
              <LoveNote message={data.loveMessage} />
            </FadeSection>

            {/* ── 5. PROPOSAL ── */}
            <FadeSection className="px-4 sm:px-8 py-24 max-w-lg mx-auto">
              <div className="text-center mb-12">
                <span className="text-white uppercase text-xs tracking-[0.2em] font-semibold">The Big Moment</span>
              </div>
              <ProposalCard question={data.proposalQuestion} />
            </FadeSection>


          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}