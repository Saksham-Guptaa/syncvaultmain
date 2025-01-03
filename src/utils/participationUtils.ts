import axios from "axios";

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
  tasks: [];
}

/**
 * Fetch quests for user participation
 * @param authToken Authorization token
 * @returns List of quests
 */
export const fetchUserQuests = async (authToken: string): Promise<Quest[]> => {
  if(!authToken) return [];
  try {
    const response = await axios.get(
      "https://hoc-api.syncvault.com/v1/web3/quests/users/participation",
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    console.log(authToken);
    console.log(response)
    return response.data.quests.data as Quest[];
  } catch (error) {
    console.error("Error fetching user quests:", error);
    return [];
  }
};

/**
 * Filters quests based on active or past status
 * @param quests List of quests
 * @param subTab "active" | "past"
 * @returns Filtered quests
 */
export const filterQuests = (quests: Quest[], subTab: string): Quest[] => {
  return quests.filter((quest) => {
    if (subTab === "active") return quest.status === 1;
    if (subTab === "past") return quest.status === 0;
    return true;
  });
};

/**
 * Sorts quests based on selected criteria
 * @param quests List of quests
 * @param sortOption "entries" | "reward"
 * @returns Sorted quests
 */
export const sortQuests = (quests: Quest[], sortOption: string): Quest[] => {
  return [...quests].sort((a, b) => {
    if (sortOption === "entries") return b.entries - a.entries;
    if (sortOption === "reward") return b.budget - a.budget;
    return 0;
  });
};
