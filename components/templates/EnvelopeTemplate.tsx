import { useState } from "react";
import { motion } from "framer-motion";
type EnvelopeTemplate = {
    images: string[]
    flowerText: string[]
    
}
export default function EnvelopeTemplate() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-100">
      <div
        className="relative w-64 h-40 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {/* Letter */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={open ? { y: -80, opacity: 1 } : { y: 40, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute left-4 right-4 top-4 h-40 bg-white rounded-md shadow-lg z-10 flex items-center justify-center"
        >
          <p className="text-sm font-medium text-gray-700">
            💌 You’ve got a letter!
          </p>
        </motion.div>

        {/* Envelope Body */}
        <div className="absolute bottom-0 w-full h-full bg-[#f5f5f5] border border-gray-300 rounded-md overflow-hidden">
          {/* Bottom flap */}
          <div className="absolute bottom-0 w-full h-1/2 bg-gray-200" />

          {/* Left flap */}
          <div className="absolute left-0 top-0 w-1/2 h-full bg-gray-300 clip-left" />

          {/* Right flap */}
          <div className="absolute right-0 top-0 w-1/2 h-full bg-gray-300 clip-right" />

          {/* Top flap */}
          <motion.div
            initial={{ rotateX: 0 }}
            animate={{ rotateX: open ? 180 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
            className="absolute top-0 w-full h-1/2 bg-gray-400 clip-top z-20"
          />
        </div>
      </div>

      {/* Custom clip paths */}
      <style>{`
        .clip-top {
          clip-path: polygon(0 0, 50% 100%, 100% 0);
        }
        .clip-left {
          clip-path: polygon(0 0, 100% 50%, 0 100%);
        }
        .clip-right {
          clip-path: polygon(100% 0, 100% 100%, 0 50%);
        }
      `}</style>
    </div>
  );
}
