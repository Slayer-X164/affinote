import React from "react";

interface MostUsedTemplateCardProps {
  id: string;
  title: string;
  description: string;
  img: string;
  price: number;
  st_price: number;
  onClick?: () => void;
}

const MostUsedTemplateCard: React.FC<MostUsedTemplateCardProps> = ({
  id,
  title,
  description,
  img,
  price,
  st_price,
  onClick,
}) => {


  return (
    <div onClick={onClick} className = " w-full h-full flex flex-col bg-white rounded-2xl border-1 border-yellow-500     hover:-translate-y-1 cursor-pointer    transition-all duration-200 relative overflow-hidden " >
  {/* Preview Image */ }
{
  id === "couples-day" ? (
    <div className="bg-gradient-to-r from-rose-800 to-rose-600  text-white absolute top-0 left-0 z-50 px-4 text-sm rounded-r-2xl py-1">
      🔥 New Template
    </div>
  ) : <h3 className="bg-gradient-to-r from-amber-500 to-amber-400 text-white absolute top-0 left-0 z-50 px-4 text-sm rounded-r-2xl py-1">Most Used</h3>
}
<div className="h-48 w-full overflow-hidden rounded-t-2xl relative">

  <img
    src={img}
    alt={title}
    className="w-full h-full object-cover transition-transform duration-300 "
  />
</div>

{/* Content */ }
<div className="p-4 flex flex-1 flex-col">
  <h2 className="text-md md:text-lg font-semibold text-gray-900">{title}</h2>

  <p className="text-xs md:text-sm text-gray-600 font-normal line-clamp-2 pt-1">
    {description}
  </p>

  <div className="flex flex-row gap-4 items-center justify-between mt-auto pt-4">
    <span className="text-blue-600  font-semibold text-xl md:text-xl flex items-center gap-2 ">

      ₹{price}
      <span className="line-through text-red-400 font-light text-sm font-semibold">₹{st_price}</span>
    </span>

    <button
      onClick={onClick}
      className="px-4 py-2 cursor-pointer bg-linear-to-b from-blue-400/80 to-blue-600 border-top-2 border-white active:scale-90 text-white rounded-xl w-auto hover:scale-105 transition font-semibold text-xs "
    >
      Use Template
    </button>
  </div>
</div>
    </div >
  );
};

export default MostUsedTemplateCard;
