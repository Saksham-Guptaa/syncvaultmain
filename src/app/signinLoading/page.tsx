"use client";
import { useState, useEffect } from "react";

const SigninLoading = () => {
  const [loading, setLoading] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoading((prev) => {
        if (prev < 100) {
          return prev + 5; // Increment loading progress
        } else {
          clearInterval(interval); // Stop once complete
          return prev;
        }
      });
    }, 1000); // Adjust speed of the loading bar here

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <div className="text-white text-2xl md:text-4xl font-semibold mb-4">
        Signing in to your account
      </div>
      <div className="w-[80%] md:w-[50%] h-1 bg-gray-800 rounded overflow-hidden">
        <div
          className="h-full bg-[#E9004C] transition-all duration-300"
          style={{ width: `${loading}%` }}
        ></div>
      </div>
    </div>
  );
};

export default SigninLoading;
