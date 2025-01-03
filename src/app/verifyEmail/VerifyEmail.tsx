"use client"
import React, { useEffect, useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";

type Props = {}



const VerifyEmail = (props: Props) => {

    const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);


  return (
    <div className='relative h-screen overflow-hidden  ' >
        {isMounted && (
        <video
          autoPlay
          
          muted
          className="absolute inset-0 object-cover w-full ml-[10%]  h-full"
        >
          <source src="/bgvid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* {isMounted && (
        <img src="/logo.png" className='bg-transparent ' alt="" />
      )} */}

        <div className="flex relative items-center  justify-center w-[50%] mx-auto min-h-screen bg-black mr-[100%] text-white">
      <div className="w-full max-w-lg p-6  rounded-lg">
        <h3 className="text-4xl font-semibold text-center">Verify your email</h3>
        <p className="mt-2 text-center text-sm text-gray-400">
          Verification code has been sent to 
          <a
            href="#"
            className=" hover:underline"
          >
            {' gg123@gmail.com'}
          </a>
        </p>
        <form className="mt-6 space-y-4">
          <div  >
           
            <input
              type="number"
              id="OTP"
              className="block h-12 w-full px-4 py-2 mt-1 text-white bg-black  border-[#313333]  rounded-md focus:ring-pink-500 focus:border-pink-500"
              placeholder="Enter verification code"
            />
          </div>
          <div className='flex space-x-5' >

          <button
            type="submit"
            className="w-16 h-12  flex items-center justify-center font-medium text-white border border-[#313333] rounded-md  "
          >
            <FaArrowLeftLong />
          </button>

          <button
            type="submit"
            className="w-full py-2 text-xs font-medium text-white bg-[#E9004C] rounded-md hover:bg-pink-600 focus:outline-none focus:ring focus:ring-pink-300"
          >
            Continue
          </button>

          </div>
   
                
          <p className="mt-2 text-center text-sm text-gray-400">
            Haven&apos;t received a code??
          <a
            href="#"
            className="text-[#E9004C] hover:underline"
          >
             {' Resend'}
          </a>
        </p>  
        </form>
      </div>
    </div>
    </div>
  )
}

export default VerifyEmail