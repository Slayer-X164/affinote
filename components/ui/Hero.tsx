"use client"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"


const Hero = () => {
  return (
    <div className='w-full h-auto flex items-center gap-6 justify-center flex-col px-3' >

        <h1 className='text-3xl lg:text-6xl  text-center font-semibold pt-10 relative'><span className={`text-blue-500 italic font-playfairDisplay font-semibold`}>Create Memories</span> that live <br /> on Web Forever </h1>
        <p className='text-neutral-500 text-center text-sm lg:text-lg '>Beautiful templates for your special someone customizable, <br /> shareable, and made with love. </p>
        <button className='bg-blue-200 mt-4 py-3  px-6 border font-semibold cursor-pointer relative'>Explore Templates <span className='w-full -z-1 h-full bg-neutral-900 absolute left-1.5 top-1.5'></span>  <DotLottieReact
        className="absolute w-50 -top-16 -left-20"
      src="https://lottie.host/bb483b81-4605-4206-b7ca-340d2eb02403/vpJGGNScCm.lottie"
      loop
      autoplay
    /></button>

    </div>
  )
}

export default Hero