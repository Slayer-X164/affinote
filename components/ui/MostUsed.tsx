"use client"

import { MostUsedTemplates } from "@/data/mostUsed"
import { useRouter } from "next/navigation"
import MostUsedTemplateCard from "./MostUsedTemplateCard"

const MostUsed = () => {
  const router = useRouter()
  return (
    <div className="max-w-6xl w-full justify-center flex-wrap sm:flex-nowrap  rounded-2xl text-xl text-center  font-semibold flex items-center gap-4">
      {MostUsedTemplates.map((temp) => (
                  <MostUsedTemplateCard
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
  )
}

export default MostUsed