"use client"
import { Templates } from "@/data/template";
import { useParams } from "next/navigation";
export default function page() {
    const {templateID} = useParams()
    const currTemplate = Templates.find((t)=>t.id === templateID)
  return <div>
    <h1>Editing Template : {currTemplate?.title}</h1>
  </div>;
}
