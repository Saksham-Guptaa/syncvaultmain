"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import AuthGuard from "@/hoc/AuthGuard";
export interface Leaderboard {
  user_id: number;
  first_name: string;
  last_name: string;
  user_xp: number;
  image_url: string;
}
const QuestLeaderBoard = () => {
  const { authToken } = useAuth();
  const [leaders, setLeaders] = useState<Leaderboard[]>([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      if (!authToken) return [];
      try {
        const responseLeader = await axios.get(
          `https://hoc-api.syncvault.com/v1/web3/quests/users/leaderboard`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        console.log(responseLeader.data);
        if (responseLeader.data.success) {
          setLeaders(responseLeader.data.users.data);
        } else {
        }
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
      }
    };

    fetchLeaderboard(); // Fetch leaderboard only if `quest` exists
  }, []);
  return (
    <div className=" min-h-screen bg-black text-white p-6 ">
      {/* <div className="mb-8">
        <h2 className="text-xl text-white space-grotesk font-bold mb-4">
          Your Rank
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-between p-4 bg-[#0A0A0A] rounded-lg">
          <span className="flex items-center gap-2">
            <span className="w-6 h-6 bg-pink-500 rounded-full"></span>
            <span>Your Name</span>
          </span>
          <span className="text-sm text-red-500 border border-red-500 p-[2px] rounded-sm">
            Not Participated
          </span>
        </div>
      </div> */}
      <div>
        <h2 className="text-xl font-bold space-grotesk mb-4">All Leaders</h2>
        <div className="space-y-2">
          {leaders.map((leader, index) => (
            <div
              key={leader.user_id}
              className="flex flex-row items-center justify-between p-4 bg-[#0A0A0A] rounded-lg"
            >
              <span className="flex items-center gap-2">
                {index + 1 === 1 && <span className="text-yellow-500">🏆</span>}
                {index + 1 === 2 && <span className="text-gray-300">🥈</span>}
                {index + 1 === 3 && <span className="text-orange-400">🥉</span>}
                {index + 1 > 3 && <span>{index + 1}</span>}
                <img
                  src={leader.image_url}
                  alt=""
                  className="w-6 h-6 rounded-full"
                />
                <span>{leader.first_name}</span>
              </span>

              <p className="p-[2px] rounded-lg text-[#95999D] border border-[#313335]">
                {leader.user_xp} XP
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default AuthGuard(QuestLeaderBoard);
