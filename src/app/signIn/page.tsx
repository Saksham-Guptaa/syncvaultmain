"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";

type Props = {};

const SignInContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const handleSignIn = () => {
    // Simulate sign-in logic
    Cookies.set("authToken", "your-auth-token");
    router.push(redirect); // Redirect to the previous page
  };
  return (
    <div className="relative h-screen overflow-x-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 object-cover w-full ml-[10%] h-full"
      >
        <source src="/bgvid.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="flex relative items-center justify-center w-full md:w-[50%] mx-auto min-h-screen bg-black mr-[100%] text-white">
        <div className="w-full max-w-lg p-6 rounded-lg">
          <h3 className="text-2xl md:text-4xl font-semibold text-center">
            Sign in to SyncVault
          </h3>
          <p className="mt-2 text-center text-sm text-gray-400">
            Don&apos;t have an account?{" "}
            <a href="/SignUp" className="text-[#E9004C] hover:underline">
              Sign up
            </a>
          </p>
          <form onClick={handleSignIn} className="mt-6 space-y-4">
            <div>
              <input
                type="email"
                id="email"
                className="block w-full h-12 px-4 py-2 mt-1 text-white bg-black border border-[#313333] rounded-md focus:ring-pink-500 focus:border-pink-500"
                placeholder="Username or Email"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 h-12 text-xs font-medium text-white bg-[#E9004C] rounded-md hover:bg-pink-600 focus:outline-none focus:ring focus:ring-pink-300"
            >
              Sign In
            </button>
            <div className="text-center text-xs text-gray-400">OR</div>
            <button
              type="button"
              className="flex h-12 items-center justify-center w-full py-2 text-xs font-medium text-white bg-[#131415] rounded-md"
            >
              <img src="/google.png" alt="Google" className="w-4 h-4 mr-2" />
              Continue with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const SignIn = (props: Props) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInContent />
    </Suspense>
  );
};

export default SignIn;
