"use client";

import { lobster } from "@/app/font";
import Image from "next/image";
import { memo } from "react";

interface TemplateCardProps {
  id: string;
  title: string;
  description: string;
  img: string;
  price: number;
  st_price: number;
  onClick?: () => void;
}

function TemplateCard({
  title,
  description,
  img,
  price,
  st_price,
  onClick,
}: TemplateCardProps) {

  const handleClick = () => onClick?.();

  return (
    <article
      onClick={handleClick}
      className="group w-full  hover:skew-x-2 hover:scale-104 h-full flex flex-col bg-white rounded-2xl border border-neutral-200  hover:shadow-xl hover:shadow-neutral-600/10 hover:-translate-y-1 transition-all duration-200 cursor-pointer"
    >
      {/* Optimized Image */}
      <div className="relative h-48 w-full overflow-hidden rounded-t-2xl">
        <Image
        unoptimized={true}
          src={img}
          alt={title}
          fill
          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
          className="object-cover  transition-transform duration-300"
          priority={false}
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-1 flex-col">
        <h2 className="text-md md:text-lg font-semibold text-gray-900">
          {title}
        </h2>

        <p className="text-xs md:text-sm text-neutral-500/80   pt-1">
          {description}
        </p>

        {/*  Price + CTA */}
        <div className="flex flex-col lg:flex-row gap-3 items-center justify-between mt-auto pt-4">
          <span className={`text-blue-600 font-semibold text-xl md:text-xl flex items-center gap-2 `}>
            ₹{price}
            <span className="line-through text-red-400 font-light text-sm font-semibold">
              ₹{st_price}
            </span>
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation(); // prevents double click bug
              handleClick();
            }}
            className="px-4 py-2 hover:scale-105 bg-linear-to-b from-blue-400/80 to-blue-600 border-top-2 border-white text-white rounded-xl cursor-pointer w-full lg:w-auto  active:scale-95 transition font-semibold text-xs "
          >
            Use Template
          </button>
        </div>
      </div>
    </article>
  );
}

export default memo(TemplateCard);
