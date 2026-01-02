import { lobster } from '@/app/font'
import React from 'react'
import { BsTwitterX } from 'react-icons/bs'
import { FaInstagram } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='w-full flex items-center flex-col justify-center pt-10 '>
       <div className='rounded-3xl  text-neutral-950 px-3 w-full max-w-6xl flex flex-col gap-6  md:gap-14 items-center '>
         <div className='w-full flex items-start flex-col gap-3 md:flex-row justify-between'>
           <div className='flex flex-col items-start gap-4'>
            <div className='flex items-center gap-2'>
                <img src="/logo1.svg" alt="logo" className='w-10' />
                <h3 className={`text-2xl font-bold ${lobster.className}`}>Affinote</h3>
            </div>
             <h3 className='text-sm md:text-lg font-normal md:w-[60%] w-full'>Create beautiful animated love Templates, apology letters, and appreciation pages. Pay once and share forever</h3>
           </div>
            <div className='hidden md:flex  items-center gap-3 text-lg font-medium capitalize'>
                <a href="#explore">explore</a>
                <a href="#contact">contact</a>
            </div>
        </div>
        <div className='w-full  flex  items-start md:flex-row md:items-end flex-col justify-between gap-3'>
            <h3 className='text-sm font-semibold '>@ 2026 affinote. All Rights Reserved</h3>
            <div className='flex items-center gap-3'>
               <a href="https://www.instagram.com/getaffinote?igsh=N2JvZ3Ewdjdlenph" target='_blank'>
                 <FaInstagram className='text-lg md:text-2xl cursor-pointer' />
               </a>
               <a href="#">
                 <BsTwitterX  className='text-lg md:text-1xl cursor-pointer'/>
               </a>
            </div>
        </div>
       </div>
       <img src="/footerv2.png" alt="footer img" className='w-full h-full' />
    </div>
  )
}

export default Footer