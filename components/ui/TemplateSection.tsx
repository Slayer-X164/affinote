"use client";
import TemplateCard from "./TemplateCard";
import { Templates } from "@/data/template";
import { useRouter } from "next/navigation";
import MostUsed from "./MostUsed";
const TemplateSection = () => {
  const router = useRouter();
  return (
    <div className=" w-full flex justify-center flex-col items-center px-3 pt-20">
      <MostUsed />
      <div className="max-w-6xl w-full py-20 flex-col   gap-6 flex items-start justify-between md:justify-center">
        <h3 id="explore" className="font-semibold">
          Explore All Templates:
        </h3>
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-10">
          {Templates.map((temp) => (
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
