import React from "react";
import { motion } from "framer-motion";
import { FiShare2 } from "react-icons/fi";

interface VoteCardProps {
  name: string;
  title: string;
  votes: number;
  reward: number;
  currency: string;
}

const VoteCard: React.FC<VoteCardProps> = ({
  name,
  title,
  votes,
  reward,
  currency,
}) => {
  // Dynamic progress bar based on votes or reward
  const maxReward = 1500; // Adjustable max reward
  const progressPercentage = (reward / maxReward) * 100;

  return (
    <motion.div
      className="bg-[#171717] border border-gray-700 rounded-md p-6 w-full relative overflow-hidden"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Header: Person's Name and Share Button */}
      <div className="flex justify-between items-center mb-4">
        {/* Name */}
        <div className="text-gray-400 text-sm font-semibold">{name}</div>

        {/* Share Button */}
        <button className="flex items-center text-gray-400 text-sm hover:text-pink-500">
          <FiShare2 className="mr-1" />
          Share
        </button>
      </div>

      {/* Title */}
      <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>

      {/* Reward Section */}
      <div className="text-pink-500 text-xl font-bold mb-4">
        Earn Up to: {reward} {currency}
      </div>

      {/* Progress Bar */}
      <div className="relative w-full h-2 bg-gray-700 rounded-md overflow-hidden mb-4">
        <motion.div
          className="absolute top-0 left-0 h-full bg-red-500"
          initial={{ width: "0%" }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.8, type: "spring" }}
        ></motion.div>
      </div>

      {/* Votes and Vote Button */}
      <div className="flex justify-between items-center text-gray-400 text-sm">
        <div>{votes} Votes</div>
        <button className="bg-pink-500 text-white px-4 py-1 rounded-md font-semibold hover:bg-pink-600">
          Vote
        </button>
      </div>
    </motion.div>
  );
};

export default VoteCard;
