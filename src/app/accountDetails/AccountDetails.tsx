"use client";
import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

type Props = {};

const AccountDetails = (props: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState(2); // State to track the current step
  const [isPrivate, setIsPrivate] = useState(false); // State for toggle switch

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Video */}
      {isMounted && (
        <video
          autoPlay
          muted
          className="absolute inset-0 object-cover w-full ml-[10%] h-full"
        >
          <source src="/bgvid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Step 1: Account Details [1/2] */}
      {currentStep === 1 && (
        <div className="flex relative items-center justify-center w-[50%] mx-auto min-h-screen bg-black mr-[100%] text-white">
          <div className="w-full max-w-lg p-6 rounded-lg">
            <h3 className="text-4xl font-semibold text-center">
              Account Details [1/2]
            </h3>
            <p className="mt-2 text-center text-sm text-gray-400">
              Enter basic details for your account.
            </p>
            <form
              className="mt-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault(); // Prevent form submission
                setCurrentStep(2); // Move to the next step
              }}
            >
              <div>
                <input
                  type="text"
                  id="firstname"
                  className="block w-full text-xs h-12 px-4 py-2 mt-1 text-white bg-black border border-[#313335] rounded-md focus:ring-pink-500 focus:border-pink-500"
                  placeholder="First Name"
                />
              </div>

              <div>
                <input
                  type="text"
                  id="lastname"
                  className="block w-full text-xs h-12 px-4 py-2 mt-1 text-white bg-black border border-[#313335] rounded-md focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Last Name"
                />
              </div>

              <div>
                <input
                  type="text"
                  id="name"
                  className="block w-full text-xs h-12 px-4 py-2 mt-1 text-white bg-black border rounded-md focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Set Username (no special characters)"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 text-xs font-medium text-white bg-[#E9004C] rounded-md hover:bg-pink-600 focus:outline-none focus:ring focus:ring-pink-300"
              >
                Continue
              </button>
              <div className="text-center text-xs text-gray-400">OR</div>
              <button
                type="button"
                className="flex items-center justify-center w-full py-2 text-xs font-medium text-white bg-[#131415] rounded-md"
              >
                <img
                  src="/google-logo.svg" // Add Google logo
                  alt="Google"
                  className="w-4 h-4 mr-2"
                />
                Continue with Google
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Step 2: Account Details [2/2] */}
      {currentStep === 2 && (
        <div className="flex relative items-center justify-center w-[50%] mx-auto min-h-screen bg-black mr-[100%] text-white">
          <div className="w-full max-w-lg p-6 rounded-lg">
            <h3 className="text-4xl font-semibold text-center">
              Account Details [2/2]
            </h3>
            <p className="mt-2 text-center text-sm text-gray-400">
              Enter Following details for your SyncVault account.
            </p>
            <form
              className="mt-6 space-y-6"
              onSubmit={(e) => {
                e.preventDefault(); // Prevent form submission
                alert("Account creation completed!"); // Add completion logic here
              }}
            >
              {/* Picture Upload Section */}
              <div className="flex items-center justify-between border border-[#313333] rounded-md p-4">
                <div className="flex items-center space-x-4">
                  {/* Placeholder for picture */}
                  <div className="w-12 h-12 bg-gray-500 text-black flex items-center justify-center rounded-md">
                    JD
                  </div>
                  <button
                    type="button"
                    className="text-xs px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
                  >
                    Add Picture
                  </button>
                </div>
                <button
                  type="button"
                  className="text-xs px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
                >
                  Remove
                </button>
              </div>

              {/* Toggle for Private Account */}
              <div className="flex items-center border h-12 px-2 rounded-md  border-[#313333] justify-between">
                <div className="flex items-center space-x-2">
                  <div className="text-sm text-gray-400">
                    <i className="fas fa-info-circle"></i> Private Account?
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPrivate}
                    onChange={() => setIsPrivate(!isPrivate)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-500 rounded-full peer peer-checked:bg-pink-500"></div>
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></div>
                </label>
              </div>

              {/* Buttons */}
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
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountDetails;
