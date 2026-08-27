"use client";
import { useState, useMemo } from "react";
import TemplateCard from "./TemplateCard";
import { Templates } from "@/data/template";
import { useRouter } from "next/navigation";
import MostUsed from "./MostUsed";

const categories = ["all", ...Array.from(new Set(Templates.flatMap((t) => t.category)))];

const TemplateSection = () => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredTemplates = useMemo(
    () =>
      activeCategory === "all"
        ? Templates
        : Templates.filter((t) => t.category.includes(activeCategory)),
    [activeCategory]
  );

  return (
    <div className=" w-full flex justify-center flex-col items-center px-3 pt-20">
      <MostUsed />
      <div className="max-w-6xl w-full py-20 flex-col   gap-6 flex items-start justify-between md:justify-center">
        <div className="w-full flex items-start flex-col gap-2">
          <h3 id="explore" className="font-semibold">
          Explore All Templates:
        </h3>
        <div className="flex items-center gap-3 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-sm font-medium border transition-all cursor-pointer capitalize ${
                activeCategory === cat
                  ? "bg-blue-600 text-white border-blue-600"
                  : "text-neutral-500 bg-neutral-200 border-white hover:border-blue-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        </div>
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-10">
          {filteredTemplates.map((temp) => (
            <TemplateCard
              key={temp.id}
              id={temp.id}
              title={temp.title}
              description={temp.description}
              img={temp.previewImg}
              price={temp.price}
              st_price={temp.st_price}
              onClick={() => router.push(`/edit/${temp.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateSection;
