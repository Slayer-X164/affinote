import Hero from "@/components/ui/Hero";
import Navbar from "@/components/ui/Navbar";
import TemplateSection from "@/components/ui/TemplateSection";

export default function Home() {
  return (
   <div className="min-h-screen">
    <Navbar/>
    <Hero/>
    <TemplateSection/>
    {/* <TemplatePage/> */}
    
   </div>
  );
}
