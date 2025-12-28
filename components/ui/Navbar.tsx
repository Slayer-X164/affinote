"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IoIosLink } from "react-icons/io";
import { LuLink } from "react-icons/lu";
import { getVisitorId } from "@/lib/visitor";
import ButtonLoder from "./ButtonLoder";

const Navbar = () => {
  const [openContact, setOpenContact] = useState<boolean>(false);
  const [openLinks, setOpenLinks] = useState<boolean>(false);
  const contactRef = useRef<HTMLDivElement | null>(null);
  const [links, setLinks] = useState<any[]>([]);
  const [loadingLinks, setLoadingLinks] = useState(false);
  const [visitID, setVisitID] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        contactRef.current &&
        !contactRef.current.contains(e.target as Node)
      ) {
        setOpenContact(false);
        setOpenLinks(false);
      }
    };
    // get visitor id
    const id = getVisitorId();
    setVisitID(id);

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

        <div className="flex items-center gap-3">
          <button
            onClick={async () => {
              setOpenContact(false);
              setOpenLinks((prev) => !prev);

              if (links.length === 0) {
                setLoadingLinks(true);
                const visitorId = getVisitorId();

                const res = await fetch(`/api/history?visitor_id=${visitorId}`);
                const data = await res.json();

                setLinks(data);
                setLoadingLinks(false);
              }
            }}
            className="cursor-pointer transition-all duration-300 active:scale-90 text-blue-500  py-1.5 px-4 border-blue-400 border-2 border-dashed   font-semibold rounded-full "
          >
            Links
          </button>
          <button
            onClick={() => {
              setOpenContact((prev) => !prev);
              setOpenLinks(false);
            }}
            className="cursor-pointer transition-all duration-300 active:scale-90 bg-blue-500 hover:bg-blue-600 py-1.5 px-4 text-neutral-50  border-neutral-900 font-semibold rounded-full"
          >
            Contact
          </button>
        </div>
        <AnimatePresence>
          {openLinks && (
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
              className="absolute px-4 py-3  right-0 top-16 bg-blue-100 border-blue-400 rounded-2xl flex flex-col  min-h-20  shadow-blue-800/30 z-1000 max-h-90   justify-center items-center shadow-2xl "
            >
              <h3 className="flex text-center flex-col items-center w-full font-semibold gap-1 text-sm text-neutral-500">
                visitor id: <br /> <span className="text-xs w-[80%]  font-mono">{visitID}</span>
              </h3>
              {loadingLinks && (
                <div className="w-60 h-20 flex items-center justify-center">
                  <ButtonLoder />
                </div>
              )}

              {!loadingLinks && links.length === 0 && (
                <p className="text-sm px-5  py-5 text-red-700 w-60 text-center">
                  No links found since you haven't purchased any
                  Template
                </p>
              )}

              {links.map((item) => (
                <div key={item.id} className="flex flex-col gap-1 pt-2.5">
                  <h3 className="text-sm pl-1 pb-0.5 capitalize font-semibold text-neutral-800">
                    {item.template_id.replaceAll("-", " ")}:
                  </h3>
                  <a
                    href={`/v/${item.id}`}
                    target="_blank"
                    className="text-purple-700 py-2 px-3 w-60 text-ellipsis whitespace-nowrap  overflow-hidden bg-white rounded-xl shadow-xl shadow-blue-800/10"
                  >
                    https://affinote.site/v/{item.id}
                  </a>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
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
                href="#contact"
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
