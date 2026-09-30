"use client";
import { motion } from "motion/react";

const announcements = [
  "🚨 BF Day sale live until 2 oct, 5pm",
  "💖 Create Beautiful Memories On The Web",
  "🚨 BF Day sale live until 2 oct, 5pm",
  "💖 Create Beautiful Memories On The Web",
  "🚨 BF Day sale live until 2 oct, 5pm",
  "💖 Create Beautiful Memories On The Web",

];

export default function AnnouncementBar() {
  return (
    <div className="w-full overflow-hidden bg-linear-to-b from-blue-900  to-blue-600 pb-1.5 pt-1">
      <motion.div
        className="flex w-max gap-10 text-sm font-normal  tracking-wider text-white"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          ease: "linear",
          duration: 30,
          repeat: Infinity,
        }}
      >
        {/* ORIGINAL */}
        {announcements.map((text, idx) => (
          <span key={idx} className="whitespace-nowrap">
            {text}
          </span>
        ))}

        {/* DUPLICATE */}
        {announcements.map((text, idx) => (
          <span key={`dup-${idx}`} className="whitespace-nowrap">
            {text}
          </span>
        ))}
        {/* DUPLICATE */}
        {announcements.map((text, idx) => (
          <span key={`dup-${idx}`} className="whitespace-nowrap">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
