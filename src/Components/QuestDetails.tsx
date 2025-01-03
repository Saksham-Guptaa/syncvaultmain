"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useSearchParams } from "next/navigation";

interface QuestData {
  success: boolean;
  quest: {
    id: number;
    name: string;
    budget: number;
    remaining_budget: number;
    start_date: string;
    end_date: string;
    first_name: string;
    last_name: string;
    status: number;
    xp: {
      totalXp: number;
      currentXp: number;
    };
    tasks: Array<{
      quest_id: number;
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
  const searchParams = useSearchParams();
  const quest_id = searchParams.get("id");

  const [quest, setQuest] = useState<QuestData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openGroups, setOpenGroups] = useState<{ [key: string]: boolean }>({});

  const toggleGroup = (groupName: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupName]: !prev[groupName],
    }));
  };

  useEffect(() => {
    if (!quest_id) return;

    const fetchQuestDetails = async () => {
      try {
        setLoading(true);
        const token = "YOUR_JWT_TOKEN_HERE";
        const response = await axios.get(
          `https://hoc-api.syncvault.com/v1/web3/quests/users/show/${quest_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setQuest(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestDetails();
  }, [quest_id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!quest) return <p>No data available</p>;

  const {
    name,
    budget,
    remaining_budget,
    start_date,
    end_date,
    first_name,
    last_name,
    xp,
    tasks,
  } = quest.quest;

  const progressPercentage = (remaining_budget / budget) * 100;

  // Group tasks by social platform
  const groupedTasks = tasks.reduce((acc, task) => {
    const groupName = task.social.name;
    if (!acc[groupName]) {
      acc[groupName] = [];
    }
    acc[groupName].push(task);
    return acc;
  }, {} as { [key: string]: typeof tasks });

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">{name} Budget</h2>
          <span className="text-lg font-semibold">
            Remaining Budget: {remaining_budget} / {budget}
          </span>
        </div>
        <div className="relative h-2 z-0 bg-gray-700 rounded-md overflow-hidden">
          <motion.div
            className="absolute top-0 z-10 left-0 h-full bg-red-500"
            initial={{ width: "0%" }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.8, type: "spring" }}
          ></motion.div>
        </div>

        <h3 className="text-lg font-bold mb-4">Available Tasks</h3>
        {Object.entries(groupedTasks).map(([groupName, groupTasks], index) => (
          <div key={index} className="mb-4">
            {/* Clickable bar to toggle task group */}
            <motion.div
              onClick={() => toggleGroup(groupName)}
              className="bg-gray-800 text-white p-3 cursor-pointer rounded-md"
              animate={{
                backgroundColor: openGroups[groupName] ? "#444" : "#333",
              }}
            >
              <strong>{groupName}</strong> ({groupTasks.length} tasks)
            </motion.div>

            {/* Expandable section */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: openGroups[groupName] ? "auto" : 0,
                opacity: openGroups[groupName] ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              style={{ overflow: "hidden", paddingLeft: "20px" }}
            >
              {groupTasks.map((task) => (
                <div
                  key={task.quest_id}
                  className="bg-gray-900 p-3 mt-2 rounded-md"
                >
                  <p>
                    <strong>Task:</strong> {task.name}
                  </p>
                  <p>
                    <strong>Reward XP:</strong> {task.reward_xp}
                  </p>
                  <p>
                    <strong>Target:</strong> {task.target_username || "N/A"}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    {task.status === 1 ? "Completed" : "Pending"}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestDetails;
