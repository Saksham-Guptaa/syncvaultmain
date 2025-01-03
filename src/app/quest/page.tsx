"use client";
import React, { useEffect, useState } from "react";
import QuestCard from "../../Components/QuestCard";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { fetchAllQuests, fetchLocalQuests } from "../../utils/questUtils";
interface Leader {
  id: number;
  name: string;
  xp: number;
}

interface Quest {
  quest_id: number;
  id: number;
  creator: string;
  title: string;
  name: string;
  remaining_budget: number;
  start_date: string;
  end_date: string;
  first_name: string;
  last_name: string;
  entries: number;
  budget: number;
  status: number;
  following: boolean;
  image: string;
}
const QuestPage: React.FC = ({}) => {
  const { authToken } = useAuth();
  // const [activeTabDetail, setActiveTabDetail] = useState("Details"); // quests, staking-polls, voting-polls

  useEffect(() => {
    // Fetch quests using the authToken
    const loadQuests = async () => {
      try {
        const data = await fetchAllQuests(authToken);
        setQuests(data);
      } catch (error) {
        console.error("Error loading quests:", error);
      }
    };

    loadQuests();
  }, [authToken]);
  const [quests, setQuests] = useState<Quest[]>([]);
  const [activeTab, setActiveTab] = useState("all"); // all or following
  const [activeSubTab, setActiveSubTab] = useState("live"); // live or finished
  const [sortOption, setSortOption] = useState("entries"); // entries or rewards

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const filteredQuests = quests
    .filter((quest: { following: any; status: number }) => {
      // if (activeTab === "following" && !quest.following) return false;
      if (activeSubTab === "live" && quest.status !== 1) return false;
      if (activeSubTab === "finished" && quest.status !== 0) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortOption === "entries") return b.entries - a.entries;
      if (sortOption === "reward") return b.budget - a.budget;
      if (sortOption === "recent") return b.budget - a.budget;
      return 0;
    });

  return (
    <>
      {isMounted && (
        <>
          <motion.div className="min-h-screen bg-black text-white">
            <main className="">
              {/* Header */}
              {/* Hero Section */}
              <section className="p-6">
                <div className="relative w-full  border-[1px] border-[#1E1F20] h-[100vw] md:h-[30vw]  lg:h-[20vw] bg-[#131415] rounded-lg p-8 overflow-hidden">
                  {/* Background Video */}
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 object-cover w-full h-full z-0"
                  >
                    <source
                      src="https://res.cloudinary.com/dski9pira/video/upload/v1734196445/bgvid_wmnvog.mp4"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>

                  {/* Content */}
                  <div className="relative mt-10 z-10">
                    <h2 className="text-5xl space-grotesk  font-bold text-white">
                      Quest Boards
                    </h2>

                    <div className="mt-6 flex space-x-4">
                      <button className="px-6 py-2 bg-white text-black font-medium rounded-md hover:bg-gray-200">
                        Learn More
                      </button>
                      <button className="px-6 py-2 border border-gray-600 text-[#95999D] font-medium rounded-md ">
                        Watch Tutorial
                      </button>
                    </div>
                  </div>
                </div>
              </section>
              {/* Stats Section */}
              <div className="bg-black text-white min-h-screen p-6">
                {/* Tabs */}
                <div className=" hidden space-x-6 border-b border-gray-700">
                  <button
                    onClick={() => setActiveTab("all")}
                    className={`pb-2 w-[50%] lg:w-24 ${
                      activeTab === "all"
                        ? "text-red-500 border-b-2 border-red-500"
                        : "text-gray-400"
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setActiveTab("following")}
                    className={`pb-2 w-[50%] lg:w-24 ${
                      activeTab === "following"
                        ? "text-red-500 border-b-2 border-red-500"
                        : "text-gray-400"
                    }`}
                  >
                    Following
                  </button>
                </div>

                {/* Sub-Tabs */}

                <div className="flex justify-between items-center">
                  <div className="flex w-full items-center space-x-4 mt-4">
                    <button
                      onClick={() => setActiveSubTab("live")}
                      className={`px-4 w-[50%] lg:w-20 py-2 rounded-md ${
                        activeSubTab === "live"
                          ? "bg-[#3A0013] border border-[#AF0039] text-white"
                          : "border border-[#313335] text-gray-300"
                      }`}
                    >
                      Live
                    </button>
                    <button
                      onClick={() => setActiveSubTab("finished")}
                      className={`px-4 w-[50%] lg:w-36 py-2 rounded-md ${
                        activeSubTab === "finished"
                          ? "bg-[#3A0013] border border-[#AF0039] text-white"
                          : "border border-[#313335] text-gray-300"
                      }`}
                    >
                      Finished
                    </button>
                  </div>

                  {/* Sort Dropdown */}
                  <div className="mt-4 hidden lg:block">
                    <select
                      className="border border-[#313335] text-white bg-transparent rounded-md px-4 py-2"
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                    >
                      <option className="bg-black" value="reward">
                        Budget
                      </option>
                      <option className="bg-black" value="entries">
                        Entries
                      </option>
                      <option className="bg-black" value="recent">
                        Most Recent
                      </option>
                    </select>
                  </div>
                </div>

                {/* Quest Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-4 mb-8">
                  {filteredQuests.slice(0, 4).map((quest) => (
                    <div key={quest.id}>
                      <QuestCard
                        image={quest.image}
                        id={quest.id}
                        quest_id={quest.id}
                        name={quest.name}
                        entries={quest.entries}
                        budget={quest.budget}
                        remaining_budget={quest.remaining_budget}
                        key={quest.id}
                        first_name={quest.first_name}
                        last_name={quest.last_name}
                      />
                    </div>
                  ))}
                </div>
                {/* onClick={() => setSelectedQuest(quest)} key={quest.id} */}

                {/* Suggested for You Section */}

                {/* Remaining Cards */}
                {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredQuests.slice(4).map((quest) => (
          <div>
          <QuestCard key={quest.id} {...quest} />
          </div>
        ))}
      </div> */}
              </div>
              {/* onClick={() => setSelectedQuest(quest)} key={quest.id} */}
            </main>
          </motion.div>
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
      )}
    </>
  );
};

export default QuestPage;
