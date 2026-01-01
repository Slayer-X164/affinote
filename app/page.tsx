import ContactBox from "@/components/ui/ContactBox";
import Footer from "@/components/ui/Footer";
import Hero from "@/components/ui/Hero";
import Navbar from "@/components/ui/Navbar";
import TemplateSection from "@/components/ui/TemplateSection";

export default function Home() {
  return (
   <div className="min-h-screen ">
    <div className="text-sm w-full h-auto py-1.5 flex justify-center items-center  bg-yellow-300 text-black font-semibold gap-1"> 🎉 New Year Discount till  <span className="font-semibold"> 10 Jan</span>!</div>
    <Navbar/>
    <Hero/>
    <TemplateSection/>
    <ContactBox/>
    <Footer/>
   </div>
  );
}
