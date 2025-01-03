"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { IoIosPeople } from "react-icons/io";
import { usePathname } from "next/navigation";

interface RewardCardProps {
  id: number; // Quest ID
  quest_id: number; // Task-related quest ID
  name: string;
  entries: number; // Changed from string to number
  first_name: string;
  last_name: string;
  budget: number;
  remaining_budget: number;
  image: string;
}
const QuestCard: React.FC<RewardCardProps> = ({
  id,
  image,
  name,
  entries,
  budget,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const isParticipationActive = pathname === "/participation";

  const progressPercentage = (budget / budget) * 100;

  const handleCardClick = () => {
    router.push(`/quest/${id}`);
  };
  return (
    <motion.div
      className="bg-[#0A0A0A] border-[1px] border-[#1E1F20] rounded-md p-4 w-full relative overflow-hidden cursor-pointer"
      transition={{ type: "spring", stiffness: 300 }}
      onClick={handleCardClick} // Added click handler
    >
      {/* Top Section */}
      <div className="flex justify-between items-start mb-4">
        {/* Icon/Color Box */}
        <img src={image} className="w-12 h-12 rounded-md" />

        {/* Social Media Icons */}
        <div className="flex space-x-2"></div>
      </div>
      {/* Title */}
      <h3 className="text-white space-grotesk font-bold text-lg  mb-4">
        {name}
      </h3>
      {isParticipationActive && (
        <div>
          <div>Tasks Completed</div>
          <div></div>
        </div>
      )}
      {/* Bottom Section */}
      <div className="flex justify-between  space-x-5 items-center">
        <div className="flex items-center bg-[#131415] rounded-lg px-4 py-2 gap-2">
          <IoIosPeople />

          <p className="text-gray-400 text-sm whitespace-nowrap overflow-hidden truncate">
            {entries} Entries
          </p>
        </div>

        <motion.div
          className=" w-full "
          transition={{ type: "spring", stiffness: 200 }}
        >
          <div className="flex justify-between items-center">
            <div className="text-gray-400 text-sm mb-2">Earn Upto:</div>
            <span className="text-white font-bold text-base">
              ${budget} USD
            </span>
          </div>
          <div className=" w-full">
            <div className="relative  h-1 bg-gray-700 rounded-md overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-[#E9004C]"
                initial={{ width: "0%" }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.8, type: "spring" }}
              ></motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default QuestCard;
