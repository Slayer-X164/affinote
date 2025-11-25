import React from "react";

interface TemplateCardProps {
  title: string;
  description: string;
  img: string;
  price: number;
  onClick?: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  title,
  description,
  img,
  price,
  onClick,
}) => {
  return (
    <div className="w-72 bg-white rounded-2xl shadow-2xl shadow-rose-950/10    hover:-translate-y-1 cursor-pointer border border-pink-100 hover:shadow-rose-600/30 hover:shadow-2xl transition-all duration-200 ">
      {/* Preview Image */}

      <div className="h-48 w-full overflow-hidden rounded-t-2xl relative">
        <h3 className="absolute bg-blue-600 text-xs py-0.5 px-4 text-neutral-50 font-semibold top-0 rounded-r-2xl left-0">Most Used</h3>
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 "
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>

        <p className="text-sm text-gray-600 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-rose-600 font-semibold text-lg">
            ₹{price}
          </span>

          <button
            onClick={onClick}
            className="px-4 py-2 cursor-pointer bg-rose-500 text-white text-sm rounded-full hover:bg-rose-700 transition font-semibold"
          >
            Use Template
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
