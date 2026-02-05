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
        className="bg-blue-200 mt-4 py-3  px-6 border font-semibold cursor-pointer relative"
      >
        Explore Templates{" "}
        <span className="w-full -z-1 h-full bg-neutral-900 absolute left-1.5 top-1.5"></span>{" "}
        
      </button>
  );
}