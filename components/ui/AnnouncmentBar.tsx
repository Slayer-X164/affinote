"use client";
import { motion } from "motion/react";

const announcements = [
  "🔥 Save up to 45% on each Template",
  "🔥 Save up to 45% on each Template",
  "🔥 Save up to 45% on each Template",
  "🔥 Save up to 45% on each Template",
  "🔥 Save up to 45% on each Template",
];

export default function AnnouncementBar() {
  return (
    <div className="w-full overflow-hidden bg-blue-700 pb-1.5 pt-1">
      <motion.div
        className="flex w-max gap-10 text-sm font-normal text-white"
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
