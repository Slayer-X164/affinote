"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const Navbar = () => {
  const [openContact, setOpenContact] = useState<boolean>(false);
  const contactRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        contactRef.current &&
        !contactRef.current.contains(e.target as Node)
      ) {
        setOpenContact(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full h-20  flex justify-center items-center px-3 mb-3 mt-2">
      <div
        ref={contactRef}
        className="max-w-6xl relative py-2 items-center w-full bg-blue-100/70  border-blue-300  rounded-full px-2 flex justify-between"
      >
        <Link href={"/"}>
          <h3 className="text-xl lg:text-2xl font-semibold">
            <span className="text-blue-400  pl-3 font-bold">Affinote</span>.site
          </h3>
        </Link>

        <button
          onClick={() => setOpenContact((prev) => !prev)}
          className="cursor-pointer transition-all duration-300 active:scale-90 bg-blue-500 hover:bg-blue-600 py-1.5 px-4 text-neutral-50  border-neutral-900 font-semibold rounded-full"
        >
          Contact
        </button>
        <AnimatePresence>
          {openContact && (
            <motion.div
              initial={{
                scale: 0,
                y: -70,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                y: 0,
                opacity: 1,
              }}
              exit={{
                scale: 0,
                y: -70,
                opacity: 0,
              }}
              transition={{
                duration: 0.3,
                ease: "backInOut",
              }}
              className="absolute px-3 py-3  right-0 -bottom-32 bg-blue-100 border-blue-400 rounded-2xl flex flex-col gap-3  shadow-blue-900/40 z-1000"
            >
              <a
                href="https://www.instagram.com/getaffinote?igsh=N2JvZ3Ewdjdlenph"
                target="_blank"
                className="flex hover:bg-neutral-100  text-neutral-600 font-semibold  items-center gap-3 bg-neutral-50 shadow-2xl shadow-blue-800 rounded-xl px-4 py-2"
              >
                <img src="/insta.png" alt="instagram" className="w-6 " />
                Chat with Us
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=connectaffinote@gmail.com"
                target="_blank"
                className="flex hover:bg-neutral-100 shadow-2xl shadow-blue-800  text-neutral-600 font-semibold  items-center gap-3 bg-neutral-50 rounded-xl px-4 py-2"
              >
                <img src="/gmail.png" alt="instagram" className="w-6 " />
                Mail Us
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
