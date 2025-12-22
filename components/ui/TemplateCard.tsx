import React from "react";

interface TemplateCardProps {
  id:string;
  title: string;
  description: string;
  img: string;
  price: number;
  onClick?: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  id,
  title,
  description,
  img,
  price,
  onClick,
}) => {


  return (
    <div   onClick={onClick} className="w-full h-full flex flex-col bg-white rounded-2xl shadow-2xl shadow-blue-400/30    hover:-translate-y-1 cursor-pointer border border-blue-100 hover:shadow-blue-600/30 hover:shadow-2xl transition-all duration-200 ">
      {/* Preview Image */}

      <div className="h-48 w-full overflow-hidden rounded-t-2xl relative">

        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 "
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-1 flex-col">
        <h2 className="text-md md:text-lg font-semibold text-gray-900">{title}</h2>

        <p className="text-xs md:text-sm text-gray-600 line-clamp-2 pt-1">
          {description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4">
          <span className="text-blue-600 font-semibold text-md md:text-lg">
            ₹{price}
          </span>

          <button
            onClick={onClick}
            className="px-4 py-2 cursor-pointer bg-blue-500 active:scale-90 text-white rounded-full hover:bg-blue-600 transition font-semibold text-xs md:text-sm"
          >
            Use Template
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
