"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
type Props = {};

const Voting = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const router = useRouter();
  const handleClose = () => {
    setIsModalOpen(false);
    router.push("/"); // Redirect to the home page
  };

  return (
    <div
      style={{
        backgroundImage: `url(/image.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isModalOpen && (
        <div className="bg-black text-white p-6 rounded-lg shadow-lg w-[90%] max-w-md relative">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-gray-300 hover:text-white"
            onClick={handleClose}
          >
            ✖
          </button>

          {/* Modal Content */}
          <h2 className="text-2xl font-bold mb-4">Voting Polls Coming Soon</h2>
          <p className="mb-6 text-gray-300">
            To get early access to Voting Polls click on “Notify Me”.
          </p>
          <button className="w-full py-2 rounded bg-[#E9004C] text-white font-bold ">
            Notify Me
          </button>
        </div>
      )}
    </div>
  );
};

export default Voting;
