"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import QuestCard from "../../Components/QuestCard";
import FeatureCard from "../../Components/FeaturesCard";
import { fetchQuests } from "@/utils/apiUtils";
import { fetchFeatures, fetchRewards } from "@/utils/fetchHelpers";
import { ITEMS_PER_PAGE, INITIAL_VISIBLE_REWARDS } from "@/utils/constants";
import { useAuth } from "../context/AuthContext";
type Props = {};
interface Quest {
  quest_id: number;
  id: number;
  first_name: string;
  last_name: string;
  creator: string;
  title: string;
  name: string;
  remaining_budget: number;
  start_date: string;
  end_date: string;
  entries: number;
  budget: number;
  status: string;
  following: boolean;
  image: string;
}
interface FeatureData {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  image: string;
  link: string;
}

const HomePage = (props: Props) => {
  const { authToken } = useAuth();

  const [features, setFeatures] = useState<FeatureData[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3; // Display only 3 items at a time

  useEffect(() => {
    const loadFeatures = async () => {
      const data = await fetchFeatures();
      setFeatures(data);
    };
    loadFeatures();
  }, []);

  const paginatedFeatures = features.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );
  const [quests, setQuests] = useState<Quest[]>([]);

  useEffect(() => {
    const loadQuests = async () => {
      // if (!authToken) return;
      try {
        const questsData = await fetchQuests(authToken);
        setQuests(questsData);
      } catch (error) {
        console.error("Error loading quests:", error);
      }
    };
    loadQuests();
  }, [authToken]);

  useEffect(() => {
    const loadRewards = async () => {
      const data = await fetchRewards();
      setRewards(data);
      setVisibleRewards(data.slice(0, INITIAL_VISIBLE_REWARDS));
    };
    loadRewards();
  }, []);

  const [rewards, setRewards] = useState<Quest[]>([]);
  const [visibleRewards, setVisibleRewards] = useState<Quest[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  console.log(authToken);

  return (
    <>
      {isMounted && (
        <>
          <div className="min-h-screen  bg-black text-white">
            {/* Sidebar */}
            {/* Main Content */}
            <main className="p-6">
              {/* Header */}
              {/* Hero Section */}
              <section className="">
                <div className="relative w-full border-[1px] border-[#1E1F20] h-[100vw] md:h-[30vw]  lg:h-[20vw] bg-[#131415] rounded-lg p-8 overflow-hidden">
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
                    <h2 className="text-5xl max-w-xl  space-grotesk font-bold text-white">
                      $SVTS The Future of Gaming & Entertainment
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

              <section className="mt-8 p-2  bg-[#0A0A0A] text-black flex justify-between items-center rounded-md">
                <span className="font-medium text-white space-grotesk">
                  🎮 NEW QUEST AVAILABLE - JOIN NOW
                </span>
                <button className="px-6 py-2  text-white border-2     font-medium rounded-md hover:bg-gray-200">
                  Learn More
                </button>
              </section>

              {/* Stats Section */}
              <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 py-6 bg-[#0A0A0A] rounded-lg flex items-center space-x-3">
                  {/* Arrow Down Image */}
                  <img
                    src="/arrowdown.png"
                    alt="Arrow Down"
                    className="w-10 h-10"
                  />
                  {/* Text Content */}
                  <div>
                    <p className="text-lg space-grotesk font-extrabold text-white">
                      Scroll Down
                    </p>
                    <p className="text-sm text-white">
                      To Explore SV Web3 Features
                    </p>
                  </div>
                </div>
                <div className="p-4 py-6 bg-[#0A0A0A] rounded-lg -space-x-4 md:-space-10 lg:-space-x-16 grid grid-cols-2 items-center">
                  {/* User Images */}
                  <div className="flex mx-auto -space-x-4">
                    <img
                      src="/user1.png"
                      alt="User 1"
                      className="h-10 w-10 rounded-full border-2 border-[#0A0A0A]"
                    />
                    <img
                      src="/user2.png"
                      alt="User 2"
                      className="h-10 w-10 rounded-full border-2 border-[#0A0A0A]"
                    />
                    <img
                      src="/user3.png"
                      alt="User 3"
                      className="h-10 w-10 rounded-full border-2 border-[#0A0A0A]"
                    />
                    <img
                      src="/user4.png"
                      alt="User 4"
                      className="h-10 w-10 rounded-full border-2 border-[#0A0A0A]"
                    />
                  </div>

                  {/* Text Section */}
                  <div className="">
                    {/* <p className="text-white font-bold text-2xl leading-none">30,000+</p> */}
                    <p className="text-gray-400 text-sm">Active Users</p>
                  </div>
                </div>
              </section>
              <section>
                <div className=" mt-12 bg-black text-white">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between bg-black mb-6  rounded-lg w-full">
                    {/* Text Content */}
                    <div className="mb-4 lg:mb-0">
                      <h2 className="text-xl space-grotesk lg:text-2xl font-bold text-white">
                        Featured Quest Boards
                      </h2>
                      <p className="text-gray-400 hidden lg:block text-sm lg:text-base">
                        Complete Tasks to earn rewards from your favourite
                        creators{" "}
                      </p>
                    </div>

                    {/* View All Button */}
                    <div>
                      <Link
                        href="/quest"
                        className="bg-[#1E1F20] text-white text-sm lg:text-base rounded-lg px-4 lg:px-5 py-2 lg:py-3 shadow-md hover:bg-gray-700 transition"
                      >
                        View All
                      </Link>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                    {quests.map((quest) => (
                      <QuestCard
                        key={quest.id}
                        image={quest.image}
                        name={quest.name}
                        entries={quest.entries}
                        budget={quest.budget}
                        remaining_budget={quest.remaining_budget}
                        id={quest.id}
                        quest_id={quest.quest_id}
                        first_name={quest.first_name}
                        last_name={quest.last_name}
                      />
                    ))}
                  </div>
                </div>
              </section>

              <section>
                <div className=" mt-12 bg-black text-white">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between bg-black mb-6  rounded-lg w-full">
                    {/* Text Content */}
                    <div className="mb-4 lg:mb-0">
                      <h2 className="text-xl space-grotesk lg:text-2xl font-bold text-white">
                        More Features
                      </h2>
                    </div>

                    {/* View All Button */}
                    <div>
                      <Link
                        href="/quest"
                        className="bg-[#1E1F20] text-white text-sm lg:text-base rounded-lg px-4 lg:px-5 py-2 lg:py-3 shadow-md hover:bg-gray-700 transition"
                      >
                        View All
                      </Link>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {paginatedFeatures.map((feature) => (
                      <FeatureCard
                        key={feature.id}
                        title={feature.title}
                        description={feature.description}
                        buttonText={feature.buttonText}
                        image={feature.image}
                        link={feature.link}
                      />
                    ))}
                  </div>
                </div>
              </section>

              <section className="mt-8">
                <div className="relative w-full border-[1px] border-[#1E1F20] h-[100vw] md:h-[30vw]  lg:h-[20vw] bg-[#131415] rounded-lg p-8 overflow-hidden">
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
                    <h2 className="text-5xl space-grotesk max-w-sm font-bold text-white">
                      Buy SyncVault&apos;s $SVTS Tokens
                    </h2>
                    <div className="mt-6 flex space-x-4">
                      <button className="px-6 py-2 bg-white text-black font-medium rounded-md hover:bg-gray-200">
                        Buy Now
                      </button>
                      <button className="px-6 py-2 bg-gray-700 text-white font-medium rounded-md hover:bg-gray-600">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </section>
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
      )}
    </>
  );
};

export default HomePage;
