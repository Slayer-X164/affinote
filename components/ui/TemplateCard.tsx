"use client";

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
      className="group w-full h-full flex flex-col bg-white rounded-2xl border border-blue-100 shadow-lg hover:shadow-2xl hover:shadow-blue-600/30 hover:-translate-y-1 transition-all duration-200 cursor-pointer"
    >
      {/* Optimized Image */}
      <div className="relative h-48 w-full overflow-hidden rounded-t-2xl">
        <Image
          src={img}
          alt={title}
          fill
          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          priority={false}
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-1 flex-col">
        <h2 className="text-md md:text-lg font-semibold text-gray-900">
          {title}
        </h2>

        <p className="text-xs md:text-sm text-neutral-400   pt-1">
          {description}
        </p>

        {/*  Price + CTA */}
        <div className="flex flex-col lg:flex-row gap-3 items-center justify-between mt-auto pt-4">
          <span className="text-blue-600 font-semibold text-md md:text-lg flex items-center gap-2">
            ₹{price}
            <span className="line-through text-red-400 font-light">
              ₹{st_price}
            </span>
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation(); // prevents double click bug
              handleClick();
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-full w-full lg:w-auto hover:bg-blue-600 active:scale-95 transition font-semibold text-xs md:text-sm"
          >
            Use Template
          </button>
        </div>
      </div>
    </article>
  );
}

export default memo(TemplateCard);
