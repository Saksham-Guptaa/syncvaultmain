"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
interface FeatureCardProps {
  title: string;
  description: string;
  buttonText: string;
  image: string;
  link: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  buttonText,
  link,
}) => {
  const [isFlashing, setIsFlashing] = useState(false);
  const router = useRouter();
  const handleButtonClick = () => {
    router.push(link.toString());
    setIsFlashing(true);
    setTimeout(() => {
      setIsFlashing(false);
    }, 300); // Flash duration
  };

  return (
    <div className="bg-[#000000] border border-[#1E1F20] rounded-lg p-6 text-white w-full">
      {/* Image */}
      <div className="w-full h-32 bg-cover mb-10 bg-center rounded-lg ">
        <img src="/thumbnail.png" className="w-full h-full" alt="" />
      </div>

      {/* Title */}
      <h3 className="text-lg space-grotesk font-bold mb-2">{title}</h3>

      {/* Description */}
      <p className="text-gray-400 text-sm mb-6">{description}</p>

      {/* Button */}
      <motion.button
        onClick={handleButtonClick}
        className={`w-full py-2 border-2 rounded-lg border-[#313335] font-semibold transition-colors duration-300 ${
          isFlashing
            ? "bg-[#3A0013] text-[#313335]"
            : "bg-transparent text-[#95999D] "
        }`}
      >
        {buttonText}
      </motion.button>
    </div>
  );
};

export default FeatureCard;
