"use client";
import React, { useEffect, useState } from "react";
import { fetchUserQuests } from "@/utils/participationUtils";
import { useAuth } from "../context/AuthContext";
import AuthGuard from "@/hoc/AuthGuard";
import ParticipationCard from "@/Components/ParticipationCard";
interface Quest {
  quest_id: number;
  id: number;
  creator: string;
  title: string;
  name: string;
  remaining_budget: number;
  start_date: string;
  tasks: [];
  end_date: string;
  first_name: string;
  last_name: string;
  entries: number;
  budget: number;
  status: number;
  following: boolean;
  image: string;
  xp: any;
}

const MyParticipations: React.FC = () => {
  const { authToken } = useAuth();
  const [quests, setQuests] = useState<any>([]);
  const [taskLength, setTaskLength] = useState<number>(0);
  const [activeTab, setActiveTab] = useState("quests"); // quests, staking-polls, voting-polls
  const [activeSubTab, setActiveSubTab] = useState("active"); // active or past
  const [sortOption, setSortOption] = useState("entries"); // entries or rewards

  useEffect(() => {
    const loadQuests = async () => {
      const data = await fetchUserQuests(authToken as string);
      setQuests(data);
    };
    loadQuests();
  }, [authToken]);

  // const filteredQuests = sortQuests(filterQuests(quests, activeSubTab), sortOption);
  return (
    <>
      <div className="min-h-screen bg-black text-white">
        {/* Sidebar */}

        {/* Main Content */}
        <main className=" p-6">
          {/* Header */}

          {/* My Participations Section */}
          <div className="flex justify-between mt-10 items-center mb-6">
            <h1 className="text-2xl font-bold">My Participations</h1>
            <button className="px-6 py-2 border border-gray-600 text-[#95999D] font-medium rounded-md ">
              Watch Tutorial
            </button>
          </div>
          {/* Tabs */}
          <div className="flex space-x-6 border-b border-gray-700">
            {["quests"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 ${
                  activeTab === tab
                    ? " border-b-2 border-[#E9004C]"
                    : "text-gray-400"
                }`}
              >
                {tab
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </button>
            ))}
          </div>
          {/* Content Based on Tabs */}
          {activeTab === "quests" && (
            <>
              {/* Sub-Tabs */}
              <div className="flex justify-between items-center mt-4">
                <div className="flex space-x-4">
                  <button
                    onClick={() => setActiveSubTab("active")}
                    className={`px-4 py-2 rounded-md ${
                      activeSubTab === "active"
                        ? "bg-[#3A0013] border border-[#AF0039] text-white"
                        : "border border-[#313335] text-gray-300"
                    }`}
                  >
                    Active
                  </button>
                  <button
                    onClick={() => setActiveSubTab("past")}
                    className={`px-4 py-2 rounded-md ${
                      activeSubTab === "past"
                        ? "bg-[#3A0013] border border-[#AF0039] text-white"
                        : "border border-[#313335] text-gray-300"
                    }`}
                  >
                    Past
                  </button>
                </div>
                {/* Sort Dropdown */}
                <div className="mt-4 hidden lg:block">
                  <select
                    className="border border-[#313335] text-white bg-transparent rounded-md px-4 py-2"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option className="bg-black" value="entries">
                      Entries
                    </option>
                    <option className="bg-black" value="reward">
                      Most Recent
                    </option>
                  </select>
                </div>
              </div>
              {/* Quest Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-4">
                {quests.length > 0 ? (
                  quests.map((quest: any) => (
                    <ParticipationCard
                      image={quest.image}
                      id={quest.id}
                      tasksLength={quest.tasks.length}
                      status_not_started={quest.xp.status_not_started}
                      status_started={quest.xp.status_started}
                      status_finished={quest.xp.status_finished}
                      status_in_progress={quest.xp.status_in_progress}
                      quest_id={quest.id}
                      name={quest.name}
                      entries={quest.entries}
                      budget={quest.budget}
                      remaining_budget={quest.remaining_budget}
                      key={quest.id}
                      first_name={quest.first_name}
                      last_name={quest.last_name}
                    />
                  ))
                ) : (
                  <div className="text-gray-400">No quests available.</div>
                )}
              </div>
            </>
          )}
        </main>
      </div>
      <div className=" text-center w-full">
        <div
          className="py-3"
          style={{
            background: "linear-gradient(90deg, #5D001E, #8B001E)",
          }}
        >
          <button className="text-white w-full text-center text-lg font-semibold space-grotesk  ">
            Powered By House of Cults
          </button>
        </div>
      </div>
    </>
  );
};
export default AuthGuard(MyParticipations);
