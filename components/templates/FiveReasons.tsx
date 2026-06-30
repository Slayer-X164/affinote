"use client"

import { useState } from "react";
import { easeIn, motion, useMotionValue, useTransform } from "motion/react"
import { patrickHand } from "@/app/font";

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

  sender_name = "kartik",
}: FiveReasonsProps) {
  const [phase, setPhase] = useState<
    "cover" | "cards" | "ending"
  >("cover");

  const reasons = [
    {
      number: "#1",
      color: "#bd413b",
      title: reason_1_title,
      desc: reason_1_desc,
      textColor: "#ffffff",
      sticker: "https://media.tenor.com/K0Op-0SpsvkAAAAj/dudu-cute.gif",
    },

    {
      number: "#2",
      color: "#60a755",
      title: reason_2_title,
      desc: reason_2_desc,
      textColor: "#ffffff",
      sticker: "https://media.tenor.com/-XYuUbo15zcAAAAi/minoi-indah.gif",
    },

    {
      number: "#3",
      color: "#bf4d74",
      title: reason_3_title,
      desc: reason_3_desc,
      textColor: "#ffffff",
      sticker: "https://media.tenor.com/xxtopNzO7jsAAAAi/bubu-dudu.gif",
    },

    {
      number: "#4",
      color: "#3a67c4",
      title: reason_4_title,
      desc: reason_4_desc,
      textColor: "#ffffff",
      sticker: "https://media.tenor.com/D6HDHJLAqb4AAAAi/dudu-bubu-dudu.gif",
    },

    {
      number: "#5",
      color: "#000000",
      title: reason_5_title,
      desc: reason_5_desc,
      textColor: "#ffffff",
      sticker: "https://media.tenor.com/DXs3gd7Ce0kAAAAi/bubu-dudu-sseeyall.gif",
    },
  ];

  const [index, setIndex] = useState(0);

  return (
    <>
      <div className="w-full overflow-hidden min-h-screen bg-white flex justify-center items-center  px-3 relative">

        {phase === "cover" && (
          <motion.div className=" w-full py-18 h-screen flex flex-col items-center justify-between text-center">
            <p className="text-2xl">hey! <span className={`font-extrabold ${patrickHand.className} text-3xl`}>{receiver_name}</span></p>

            <div className="flex items-center flex-col relative">
              {/* desktop gifs */}
              <img src="https://media.tenor.com/82a9iCEHEvQAAAAi/love-heart.gif" alt="heart gif" className="scale-50  hidden xl:block absolute left-90 -top-10" />
              <img src="https://media.tenor.com/82a9iCEHEvQAAAAi/love-heart.gif" alt="heart gif" className="scale-50 hidden xl:block  absolute left-60 top-80 rotate-20" />
              <img src="https://media.tenor.com/82a9iCEHEvQAAAAi/love-heart.gif" alt="heart gif" className="scale-50 hidden xl:block  absolute left-40 top-20 rotate-30" />
              <img src="https://media.tenor.com/82a9iCEHEvQAAAAi/love-heart.gif" alt="heart gif" className="scale-50 hidden xl:block  absolute -right-90 top-40 -rotate-30" />

      <img src="https://media.tenor.com/82a9iCEHEvQAAAAi/love-heart.gif" alt="heart gif" className="scale-50  hidden xl:block absolute right-90 -top-10" />
              <img src="https://media.tenor.com/82a9iCEHEvQAAAAi/love-heart.gif" alt="heart gif" className="scale-50 hidden xl:block  absolute right-60 top-90 -rotate-20" />
              <img src="https://media.tenor.com/82a9iCEHEvQAAAAi/love-heart.gif" alt="heart gif" className="scale-50 hidden xl:block  absolute right-40 top-50 -rotate-30" />
<img src="https://media.tenor.com/82a9iCEHEvQAAAAi/love-heart.gif" alt="heart gif" className="scale-50 hidden xl:block  absolute right-110 top-30 -rotate-30" />
              {/* mobile gifs */}
              <img src="https://media.tenor.com/82a9iCEHEvQAAAAi/love-heart.gif" alt="heart gif"
                className="scale-40 xl:hidden  absolute right-20 top-30 -rotate-30" />
              <img src="https://media.tenor.com/82a9iCEHEvQAAAAi/love-heart.gif" alt="heart gif"
                className="scale-40 xl:hidden  absolute left-26 -top-30 rotate-20" />

              <h1 className={`font-bold text-rose-600 text-[280px] leading-[90%] ${patrickHand.className}`}>5</h1>

              <h2 className="text-4xl font-semibold">Reasons</h2>

              <p className="pt-6 font-bold">Why I ❤️ You</p>
            </div>

            <button
              onClick={() => setPhase("cards")}
              className=" text-neutral-50 p-1 cursor-pointer rounded-xl font-semibold border border-black relative"
            >
              <img src="https://media.tenor.com/5MLsXqKX6jgAAAAj/cat-kitty.gif" alt="cat gif" className="absolute -top-25 scale-50" />
              <div className="bg-black px-10 py-3  rounded-lg">Show Me</div>
            </button>
          </motion.div>
        )}
        {phase == "cards" && (
          <div className="relative w-72 h-105 ">
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
            <h3 className="absolute -bottom-20 -translate-x-1/2 left-1/2 text-neutral-300 font-semibold">Swipe Right</h3>
          </div>
        )}
        {phase === "ending" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              ease:easeIn,
              duration:0.5
            }}
          >
            <div
              className={`${patrickHand.className} w-screen min-h-screen  bg-[#eed7ae] text-yellow-900 flex
            flex-col justify-center items-center text-center px-4`}
            >
              {/* <img src="https://media.tenor.com/u2FhRqMVu3MAAAAj/heart-white.gif" alt="hear gif" className="w-36 " /> */}
              <img src="https://media.tenor.com/Cdsz67OHTE0AAAAi/kitty-cat.gif" alt="hear gif" className="w-36 " />
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
  textColor:string;
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

  // useTransform is fine, but clamp ranges tightly to reduce unnecessary work
  const swipeRange = typeof window !== "undefined" ? window.innerWidth * 0.22 : 100;

  const rotate = useTransform(x, [-swipeRange, 0, swipeRange], [-50, 0, 50]);


  const stackRot = i === 0 ? 0 : (i % 2 === 0 ? 1 : -1) * i * 0.8;

  return (
    <motion.div
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.08}            // lower = less physics recalc on touch
      dragMomentum={false}          // kills post-drag momentum calculation entirely
      style={{
        x: isTop ? x : undefined,
        rotate: isTop ? rotate : stackRot,
        background: reason.color,
        color: reason.textColor ,
        zIndex: 100 - i,
        willChange: isTop ? "transform" : "auto",   // GPU layer hint
        touchAction: "none",        // prevents browser scroll fighting the drag
      }}
      onDragEnd={(_, info) => {
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
      whileDrag={{ scale: 1.03 }}
      exit={{
        x: 600,
        y: 60,
        rotate: 30,
        opacity: 0,
        transition: { duration: 0.38, ease: [0.25, 1, 0.5, 1] },
      }}
      transition={{
        type: "spring",
        stiffness: 220,   // lower stiffness = fewer solver iterations per frame
        damping: 26,      // higher damping = settles faster, less oscillation work
        mass: 0.6,        // lighter mass = snappier without heavy recalc
      }}
      className={` absolute inset-0 rounded-2xl shadow-xl flex flex-col items-center
       justify-between py-6 cursor-grab active:cursor-grabbing ${patrickHand.className}`}
    >


      <h3 className="text-2xl font-mono opacity-50 font-semibold">{reason.number}</h3>
      <div className={` flex items-center gap-4 flex-col text-center px-4`}>
        <h2 className="text-3xl font-bold">{reason.title}</h2>
      <p className="font-semibold">{reason.desc}</p>
      </div>
      <img src={reason.sticker} className="w-34 " />
    </motion.div>
  );
}