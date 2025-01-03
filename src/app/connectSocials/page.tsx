"use client";
import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

type Props = {};

const ConnectSocials = (props: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
    {isMounted && (
    <div className="relative h-screen overflow-x-hidden">
      {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          className=" absolute inset-0 object-cover w-full ml-[10%] h-full"
        >
          <source src="/bgvid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      

      {/* Connect Socials Page */}
      <div className="flex relative items-center justify-center w-full md:w-[50%] mx-auto min-h-screen bg-black mr-[100%] text-white">
        <div className="w-full max-w-lg p-6 rounded-lg">
          <h3 className="text-2xl md:text-4xl font-semibold text-center">Connect your socials</h3>
          <p className="mt-2 text-center text-sm text-gray-400">
            Connect your social media to participate in Use & Earn
          </p>

          <div className="mt-6 space-y-4">
            {/* Social Media Options */}
            <div className="flex items-center justify-between border border-gray-700 rounded-md p-4">
              <div className="flex items-center space-x-2">
                <span className="text-red-500">
                  <img src="/youtube.png" className="w-5 h-5" alt="yt"></img>
                </span>
                <span className="text-white text-sm">YouTube</span>
              </div>
              <button
                type="button"
                className="text-xs px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
              >
                
                Connect
              </button>
            </div>

            <div className="flex items-center justify-between border border-gray-700 rounded-md p-4">
              <div className="flex items-center space-x-2">
                <span className="text-pink-500">
                  <img src="/instagram.png" className="w-5 h-5" alt="ig"></img>
                </span>
                <span className="text-white text-sm">Instagram</span>
              </div>
              <button
                type="button"
                className="text-xs px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
              >
                Connect
              </button>
            </div>

            <div className="flex items-center justify-between border border-gray-700 rounded-md p-4">
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">
                  <img src="/tiktok.png " className="w-5 h-5" alt="tt" ></img>
                </span>
                <span className="text-white text-sm">TikTok</span>
              </div>
              <button
                type="button"
                className="text-xs px-4 py-2 bg-gray-700 text-gray-500 rounded-md cursor-not-allowed"
                disabled
              >
                Unavailable
              </button>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className='flex mt-4 space-x-5' >

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
  Skip for now
</button>

</div>
        </div>
      </div>
    </div>
    )}
    </>
  );
};

export default ConnectSocials;
