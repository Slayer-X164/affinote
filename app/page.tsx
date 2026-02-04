import AnnouncementBar from "@/components/ui/AnnouncmentBar";
import ContactBox from "@/components/ui/ContactBox";
import Footer from "@/components/ui/Footer";
import Hero from "@/components/ui/Hero";
import Navbar from "@/components/ui/Navbar";
import TemplateSection from "@/components/ui/TemplateSection";
import Image from "next/image";

export default function Home() {
  return (
   <div className="min-h-screen ">
    <div className="w-screen h-screen z-100  text-center gap-4 flex flex-col items-center justify-center bg-white position absolute left-0 top-0">
      <Image src={"https://media.tenor.com/pPoUmi0Z1fUAAAAi/cat-pet.gif"} width={200} height={200} alt="maintance cat" ></Image>
      <h1 className="text-3xl font-bold   text-blue-500">Affinote is Under Maintenance!!</h1>
      <h3 className="animate-pulse">will be back soon...</h3>
    </div>
    {/* <AnnouncementBar/>
    <Navbar/>
    <Hero/>
    <TemplateSection/>
    <ContactBox/>
    <Footer/> */}
   </div>
  );
}
