"use client"

import { useState } from "react";
import { motion, useMotionValue, useTransform } from "motion/react"

type FiveReasonsProps = {
  receiver_name?: string;

  reason_1_title?: string;
  reason_1_desc?: string;

  reason_2_title?: string;
  reason_2_desc?: string;

  reason_3_title?: string;
  reason_3_desc?: string;

  reason_4_title?: string;
  reason_4_desc?: string;

  reason_5_title?: string;
  reason_5_desc?: string;

  ending_message?: string;
  sender_name?: string;
};
export default function FiveReasons({
  receiver_name = "Ananya",

  reason_1_title = "Your Smile",
  reason_1_desc =
  "I love your smile because it has a way of making everything feel okay, even on the toughest days.",

  reason_2_title = "The Way You Care",
  reason_2_desc =
  "I love how deeply you care about the people around you. Your kindness never goes unnoticed.",

  reason_3_title = "Our Conversations",
  reason_3_desc =
  "Whether we're talking about something serious or laughing over something silly, I never get tired of talking to you.",

  reason_4_title = "Your Kindness",
  reason_4_desc =
  "The way you treat people with patience, empathy, and warmth inspires me every single day.",

  reason_5_title = "Being You",
  reason_5_desc =
  "Out of all the reasons I could write, my favorite is simply that you're you, and that's more than enough.",

  ending_message =
  "These are only 5 reasons, but the truth is that I could spend forever writing more. Every day you give me a hundred new reasons to appreciate, admire, and love you.",

  sender_name = "karan",
}: FiveReasonsProps) {
  const [phase, setPhase] = useState<
    "cover" | "cards" | "ending"
  >("cover");

  const reasons = [
    {
      number: "#1",
      color: "#ef476f",
      title: reason_1_title,
      desc: reason_1_desc,
      sticker: "/Reasons/bear1.png",
    },

    {
      number: "#2",
      color: "#f9c74f",
      title: reason_2_title,
      desc: reason_2_desc,
      sticker: "/Reasons/bear2.png",
    },

    {
      number: "#3",
      color: "#06d6a0",
      title: reason_3_title,
      desc: reason_3_desc,
      sticker: "/Reasons/cats.png",
    },

    {
      number: "#4",
      color: "#4d96ff",
      title: reason_4_title,
      desc: reason_4_desc,
      sticker: "/Reasons/bunny.png",
    },

    {
      number: "#5",
      color: "#9b5de5",
      title: reason_5_title,
      desc: reason_5_desc,
      sticker: "/Reasons/heart.png",
    },
  ];

  const [index, setIndex] = useState(0);

  return (
    <>
      <div className="w-full overflow-hidden min-h-screen bg-neutral-50 flex justify-center items-center  px-3">
        {phase === "cover" && (
          <motion.div className=" w-full py-18 h-screen flex flex-col items-center justify-between">
            <p>hey! {receiver_name}</p>

            <div className="flex items-center flex-col">
              <h1 className="font-bold text-rose-600 text-[280px] leading-[90%]">5</h1>

              <h2 className="text-4xl">Reasons</h2>

              <p className="pt-6">Why I ❤️ You</p>
            </div>

            <button
              onClick={() => setPhase("cards")}
              className=" text-neutral-50 p-1 cursor-pointer rounded-xl font-semibold border border-black"
            >
              <div className="bg-black px-8 py-2 rounded-lg">show me</div>
            </button>
          </motion.div>
        )}
        {phase == "cards" && (
          <div className="relative w-72 h-105">
            {reasons.slice(index).map((reason, i) => (
              <SwipeCard
                key={index + i}
                reason={reason}
                i={i}
                index={index}
                reasons={reasons}
                setIndex={setIndex}
                setPhase={setPhase}
              />
            ))}
          </div>
        )}
        {phase === "ending" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div
              className=" w-screen min-h-screen  bg-[#0077ff] text-white flex
            flex-col justify-center items-center text-center px-2"
            >
              <p className="max-w-109 text-2xl md:text-3xl font-semibold">{ending_message}</p>

              <h3 className="mt-8 text-2xl">
                — {sender_name}
              </h3>
            </div>
          </motion.div>
        )}
      </div>
    </>
  )
}

type Reason = {
  number: string;
  color: string;
  title: string;
  desc: string;
  sticker: string;
};

function SwipeCard({
  reason,
  i,
  index,
  reasons,
  setIndex,
  setPhase,
}: {
  reason: Reason;
  i: number;
  index: number;
  reasons: Reason[];
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  setPhase: React.Dispatch<React.SetStateAction<"cover" | "cards" | "ending">>;
}) {
  const isTop = i === 0;
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-20, 0, 20]);
  const yesOpacity = useTransform(x, [20, 120], [0, 1]);
  const nopeOpacity = useTransform(x, [-120, -20], [1, 0]);
  const stackRot = i === 0 ? 0 : (i % 2 === 0 ? 1 : -1) * i * 0.8;

  return (
    <motion.div
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.12}
      style={{
        x: isTop ? x : undefined,
        rotate: isTop ? rotate : stackRot,
        background: reason.color,
        zIndex: 100 - i,
      }}
      onDragEnd={(e, info) => {
        if (!isTop) return;
        const shouldSwipe =
          Math.abs(info.offset.x) > 100 || Math.abs(info.velocity.x) > 500;

        if (shouldSwipe && info.offset.x > 0) {
          if (index === reasons.length - 1) {
            setPhase("ending");
          } else {
            setIndex((prev) => prev + 1);
          }
        }
      }}
      animate={{
        y: i * 14,
        scale: 1 - i * 0.04,
      }}
      whileDrag={{ scale: 1.04 }}
      exit={{
        x: 600,
        y: 60,
        rotate: 30,
        opacity: 0,
        transition: { duration: 0.45, ease: [0.25, 1, 0.5, 1] },
      }}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 22,
        mass: 0.8,
      }}
      className="absolute inset-0 rounded-2xl shadow-xl flex flex-col items-center justify-between py-6 cursor-grab active:cursor-grabbing"
    >
      {/* YES label */}
      {isTop && (
        <motion.div
          style={{ opacity: yesOpacity }}
          className="absolute top-6 right-5 border-2 border-green-500 text-green-500 text-xs font-bold tracking-widest px-3 py-1 rounded-lg uppercase pointer-events-none"
        >
          YES
        </motion.div>
      )}

      {/* NOPE label */}
      {isTop && (
        <motion.div
          style={{ opacity: nopeOpacity }}
          className="absolute top-6 left-5 border-2 border-red-500 text-red-500 text-xs font-bold tracking-widest px-3 py-1 rounded-lg uppercase pointer-events-none"
        >
          NOPE
        </motion.div>
      )}

      <h3>{reason.number}</h3>
      <h2>{reason.title}</h2>
      <p>{reason.desc}</p>
      <img src={reason.sticker} className="w-28" />
    </motion.div>
  );
}