"use client";
import React, { Suspense, useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { IoShareSocialOutline } from "react-icons/io5";
import { FiArrowLeft, FiRefreshCw } from "react-icons/fi";
import { useAuth } from "@/app/context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter, useParams } from "next/navigation";
import {
  fetchQuestDetails,
  fetchTasksData,
  verifyTask,
  copyToClipboard,
  calculateProgressPercentage,
} from "@/utils";
import { SkeletonCard } from "@/Components/SkeletonCard";
export interface Leaderboard {
  user_id: number;
  first_name: string;
  last_name: string;
  user_xp: number;
  image_url: string;
}

interface QuestData {
  success: boolean;
  quest: {
    id: number;
    name: string;
    budget: number;
    remaining_budget: number;
    entries: number;
    start_date: string;
    end_date: string;
    first_name: string;
    last_name: string;
    image: string;
    status: number;
    xp: {
      totalXp: number;
      currentXp: number;
    };
    tasks: Array<{
      id: number;
      name: string;
      task_type: {
        id: number;
        name: string;
      };
      social_id: number;
      reward_xp: number;
      reward_fiat: number;
      target_id: string;
      target_username: string | null;
      status: number;
      target_url: string;
      social: {
        id: number;
        name: string;
      };
    }>;
    user_socials: Array<any>;
  };
}

const QuestDetails: React.FC = () => {
  const router = useRouter();

  // const [isExpanded, setIsExpanded] = useState(false);
  // const toggleDropdown = () => {
  //   setIsExpanded((prev) => !prev);

  const [expandedTaskIds, setExpandedTaskIds] = useState<number[]>([]);
  const [pendingTaskIds, setPendingTaskIds] = useState<number[]>([]);
  const { id } = useParams();
  const { authToken } = useAuth();
  const [activeTabDetail, setActiveTabDetail] = useState("Details");
  const [quest, setQuest] = useState<QuestData | null>(null);
  const [loading, setLoading] = useState(true);
  const [leaders, setLeaders] = useState<Leaderboard[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [tasksData, setTasksData] = useState<any | null>(null);
  const [copied, setCopied] = useState(false);
  // const [leaders] = useState([
  //   { id: 1, name: "Alice", xp: 1500 },
  //   { id: 2, name: "Bob", xp: 1200 },
  //   { id: 3, name: "Charlie", xp: 1000 },
  //   { id: 4, name: "Dave", xp: 800 },
  // ]);
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const responseLeader = await axios.get(
          `https://hoc-api.syncvault.com/v1/web3/quests/users/leaderboard/${id}`,
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
          setError("Failed to fetch leaderboard.");
        }
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
      }
    };

    if (quest) {
      fetchLeaderboard(); // Fetch leaderboard only if `quest` exists
    }
  }, [quest, authToken]);

  const startTaskApiCall = async (taskid: any) => {
    try {
      const response = await axios.post(
        `https://hoc-api.syncvault.com/v1/web3/quest-tasks/${taskid}/start`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          // body: JSON.stringify({ status: 1 }), // Example payload
        }
      );
      console.log(response);

      if (response) {
        alert("Task started successfully!");
        // Optionally, refresh data or update state here
      } else {
        console.error("Failed to start task");
      }
    } catch (error) {
      console.error("Error starting task:", error);
    }
  };

  const handleVerify = async (taskId: number) => {
    if (!authToken) {
      console.error("Auth token is missing.");
      return; // Exit if authToken is null
    }

    try {
      const response = await verifyTask(taskId, authToken);
      console.log("Verification successful:", response);
    } catch (error: any) {
      console.error("Verification failed:", error);
      if (error.response?.data?.url) {
        router.push(error.response.data.url);
      }
    }
  };
  const handleCopyURL = () => {
    navigator.clipboard.writeText(window.location.href).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      },
      (err) => {
        console.error("Failed to copy text: ", err);
      }
    );
  };

  useEffect(() => {
    if (!id || Array.isArray(id)) return; // Ensure id is a string

    const loadQuestDetails = async () => {
      try {
        setLoading(true);
        const questData = await fetchQuestDetails(id, authToken);
        const tasksData = await fetchTasksData(id, authToken);
        console.log(tasksData);

        setQuest(questData);
        setTasksData(tasksData);
      } catch (err: any) {
        setError(err.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    loadQuestDetails();
  }, [id, authToken]);

  if (loading) return <SkeletonCard />;
  if (error) return <p>Error: {error}</p>;

  if (!quest || !tasksData) return <p>No data available</p>;

  const {
    budget,
    remaining_budget,
    entries,
    start_date,
    end_date,
    first_name,
    status,
    last_name,
    xp,
    tasks,
  } = quest.quest;
  // const toggleDropdown = (taskId: number) => {
  //   setExpandedTaskId((prev) => (prev === taskId ? null : taskId));
  // };
  const progressPercentage = (budget / budget) * 100;

  const handleLoginAlert = () => {
    toast.info("Please login to start the task", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  const toggleDropdown = async (taskId: number, taskSubmission: any) => {
    if (authToken) {
      setExpandedTaskIds(
        (prev) =>
          prev.includes(taskId)
            ? prev.filter((id) => id !== taskId) // Remove taskId if it's already expanded
            : [...prev, taskId] // Add taskId if it's not expanded
      );
      setPendingTaskIds(
        (prev) => (prev.includes(taskId) ? prev : [...prev, taskId]) // Add taskId only if it doesn't already exist
      );

      if (!taskSubmission) {
        try {
          const response = await axios.post(
            `https://hoc-api.syncvault.com/v1/web3/quest-tasks/${taskId}/start`,
            { activity: 0 },
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
              // body: JSON.stringify({ status: 1 }), // Example payload
            }
          );
          console.log(response);

          if (response) {
            alert("Task started successfully!");
            // Optionally, refresh data or update state here
          } else {
            console.error("Failed to start task");
          }
        } catch (error) {
          console.error("Error starting task:", error);
        }
      }
    } else {
      // alert("Please login to start the task");
      handleLoginAlert();
    }
  };
  const visitAccount = async (task_url: any, taskId: number) => {
    const response = await axios.post(
      `https://hoc-api.syncvault.com/v1/web3/quest-tasks/${taskId}/start`,
      { activity: 1 },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        // body: JSON.stringify({ status: 1 }), // Example payload
      }
    );
    console.log(response);
    window.open(task_url, "_blank");
  };

  return (
    <div className="">
      <div className="bg-black text-white p-4 flex flex-col md:flex-row justify-center items-center">
        <div className="w-full rounded-lg py-6 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center ">
              <button
                onClick={() => router.push("/quest")}
                className="text-gray-400 border border-[#313335] rounded-lg p-1 mr-4"
              >
                <FiArrowLeft size={24} />
              </button>
              <img
                src={quest.quest.image}
                alt=""
                className="rounded-full w-10 "
              />
              <div className="text-lg ml-3 font-medium">
                {first_name} {last_name}
              </div>
              <span className="text-red-500 text-xl">✔</span>
            </div>
            <div className="flex flex-wrap justify-center md:justify-between items-center space-x-3">
              <button
                onClick={handleCopyURL}
                className=" border border-[#313335]  text-white px-4 py-2 rounded-lg"
              >
                {copied ? (
                  "Copied!"
                ) : (
                  <IoShareSocialOutline className="text-2xl" />
                )}
              </button>
            </div>
          </div>
          <ul>
            <div className="text-xl space-grotesk font-semibold">
              {quest.quest.name}
            </div>
          </ul>
          <div className="bg-[#131415] p-4 rounded-lg flex flex-col lg:flex-row justify-between items-center gap-4">
            {/* Avatar and Text Section */}
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3 w-full lg:w-auto">
              {/* Avatar Stack */}
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gray-600">
                  <img src="/user3.png" alt="" />
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-500">
                  <img src="/user2.png" alt="" />
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-400">
                  <img src="/user1.png" alt="" />
                </div>
              </div>

              {/* Entries and Date */}
              <div className="text-gray-500 text-sm text-center sm:text-left">
                {entries} | {start_date} - {end_date}
              </div>
            </div>

            {/* Button */}
            {/* <button className="bg-[#E9004C] w-full sm:w-1/2 md:w-1/3 lg:w-48 text-white font-medium px-6 py-3 rounded-lg">
              Participate Now
            </button> */}
          </div>

          <div className="flex justify-center mt-4"></div>
        </div>
      </div>
      <div className="flex flex-wrap space-x-6 border-b px-6 bg-black border-gray-700">
        {["Details", "Leaderboard"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTabDetail(tab)}
            className={`pb-2 ${
              activeTabDetail === tab
                ? "text-white border-b-2 border-red-500"
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
      {activeTabDetail === "Details" && (
        <div className="min-h-screen bg-black text-white p-8">
          <div className="mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Quest Budget</h2>
              <span className="text-sm">
                Total Budget:{" "}
                <span className="font-semibold text-lg">${budget} USD</span>
              </span>
            </div>
            <div className="relative h-1 z-0 bg-gray-700 rounded-md overflow-hidden">
              <motion.div
                className="absolute top-0 z-10 left-0 h-full bg-[#E9004C]"
                initial={{ width: "0%" }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.8, type: "spring" }}
              ></motion.div>
            </div>
            <h3 className="text-lg mt-10 font-bold mb-4">Available Tasks</h3>
            {tasksData.map((task: any, index: React.Key | null | undefined) => {
              const isExpanded = expandedTaskIds.includes(task.id);
              const isPending = pendingTaskIds.includes(task.id);
              return (
                <div
                  key={index}
                  className="bg-[#131415] rounded-md shadow-lg mb-4"
                >
                  <motion.div
                    className="flex items-center justify-between p-4 rounded-t-md cursor-pointer"
                    animate={{
                      backgroundColor: isExpanded ? "#1C1C1C" : "#1C1C1C",
                    }}
                  >
                    <div
                      // onClick={() => toggleDropdown(task.id)}
                      className="flex items-center gap-2"
                    >
                      <p className="text-lg  ">{task.task_type.name}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[#95999D] border border-[#313335] p-[3px] rounded-md text-sm">
                        +{task.reward_xp} XP
                      </span>
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          task.submission?.status !== 2 && !isPending
                            ? "bg-[#E9004C] text-white"
                            : task.submission?.status === 2
                            ? "text-[#0DA500] border border-[#0DA500]"
                            : isPending
                            ? "text-[#FF6B00] border border-[#FF6B00]"
                            : ""
                        }`}
                        onClick={() => {
                          if (task.submission?.status !== 2 && !isPending) {
                            toggleDropdown(task.id, task.taskSubmission);
                          }
                        }}
                      >
                        {task.submission?.status !== 2 && !isPending
                          ? "Start Task"
                          : isPending
                          ? "In Progress"
                          : task.submission?.status === 2
                          ? "Completed"
                          : ""}
                      </span>
                      <FiRefreshCw className="text-gray-400 hover:text-gray-300 cursor-pointer" />
                    </div>
                  </motion.div>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                      className="p-4 bg-[#1C1C1C] flex flex-col space-y-4"
                    >
                      <div className="space-y-3">
                        <p className="font-medium">
                          1. Like and Follow Official {task.social.name} account
                        </p>
                        <button
                          className="border text-white px-3 py-1 rounded-md "
                          onClick={() => visitAccount(task.target_url, task.id)}
                        >
                          Visit {task.social.name} account
                        </button>
                      </div>
                      <div className="space-y-3">
                        <p className="font-medium">2. Verify Task</p>
                        <button
                          onClick={() => handleVerify(task.id)}
                          disabled={task.submission?.status === 2}
                          className={`px-3 py-1 rounded text-sm ${
                            task.submission?.status !== 2
                              ? "text-[#0DA500] border border-[#0DA500]"
                              : "text-gray-500 border border-gray-400"
                          }`}
                        >
                          {task.submission?.status === 2
                            ? "Verified"
                            : "Verify"}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
      {activeTabDetail === "Leaderboard" && (
        <div className=" min-h-screen bg-black text-white p-6 ">
          {/* <div className="mb-8">
            <h2 className="text-xl text-white space-grotesk font-bold mb-4">
              Your Rank
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-between p-4 bg-[#0A0A0A] rounded-lg">
              <span className="flex items-center gap-2">
                <img className="w-6 h-6 rounded-full"></img>
                <span>Your Name</span>
              </span>
              <span className="text-sm text-red-500 border border-red-500 p-[2px] rounded-sm">
                Not Participated
              </span>
            </div>
          </div> */}
          <div>
            <h2 className="text-xl font-bold mb-4">All Participants</h2>
            <div className="space-y-2">
              {leaders.map((leader, index) => (
                <div
                  key={leader.user_id}
                  className="flex flex-col md:flex-row items-center justify-between p-4 bg-[#0A0A0A] rounded-lg"
                >
                  <span className="flex items-center gap-2">
                    {index + 1 === 1 && (
                      <span className="text-yellow-500">🏆</span>
                    )}
                    {index + 1 === 2 && (
                      <span className="text-gray-300">🥈</span>
                    )}
                    {index + 1 === 3 && (
                      <span className="text-orange-400">🥉</span>
                    )}
                    {index + 1 > 3 && <span>{index + 1}</span>}
                    <img
                      src={leader.image_url}
                      alt=""
                      className="w-6 h-6 rounded-full"
                    />
                    <span>{leader.first_name}</span>
                  </span>
                  <p className="p-[2px] text-[#95999D] border border-[#313335]">
                    {leader.user_xp} XP
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};
const Page: React.FC = () => {
  return (
    <Suspense fallback={<p>Loading Quest Details...</p>}>
      <QuestDetails />
    </Suspense>
  );
};

export default Page;
