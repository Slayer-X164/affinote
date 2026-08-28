"use client";
import { useEffect, useState } from "react";

export default function ScrollButton() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
        onClick={() => {
          document
            .getElementById("explore")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
        className="bg-blue-600 shadow-xl shadow-blue-800/20 mt-4 py-3  px-6 active:scale-95 text-neutral-50 rounded-xl font-semibold cursor-pointer relative"
      >
        <img className="w-13 rounded-xl absolute -top-12 left-1/2 -translate-x-1/2 " src="https://media.tenor.com/OU7qmzXIFBcAAAAi/bubu-dudu.gifif" alt="cute rabbit" />
        Explore Templates

      </button>
  );
}