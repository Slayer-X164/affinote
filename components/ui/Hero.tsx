"use client";

import ScrollButton from "./ScrollButton";


const Hero = () => {
  return (
    <div className="w-full h-auto flex items-center gap-6 justify-center flex-col px-3">
      <h1 className="text-3xl lg:text-6xl  text-center font-semibold pt-10 relative">
        <span
          className={`text-blue-500 italic font-playfairDisplay font-semibold`}
        >
          Create Memories
        </span>{" "}
        that live <br /> on Web Forever{" "}
      </h1>
      <p className="text-neutral-500 text-center text-sm lg:text-lg max-w-xs lg:max-w-lg  ">
        No coding needed. Customize live and get your personal shareable link.
      </p>
      <ScrollButton />
      <h4 className="text-center text-sm italic capitalize text-neutral-400">No login required • Pay once • Link stays forever</h4>
    </div>
  );
};

export default Hero;
