"use client";
import TemplateCard from "./TemplateCard";
import { Templates } from "@/data/template";
import { useRouter } from "next/navigation";
const TemplateSection = () => {
  const router = useRouter()
  return (
    <div className=" w-full flex justify-center items-center px-3">
      <div className="max-w-6xl w-full py-20 flex-col md:flex-row  gap-10 flex items-center justify-between md:justify-center">
        {Templates.map((temp) => (
          <TemplateCard
            key={temp.id}
            id={temp.id}
            title={temp.title}
            description={temp.description}
            img={temp.previewImg}
            price={temp.price}
            onClick={() => router.push(`/edit/${temp.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default TemplateSection;
