import apiClient from "./apiClient";

// Fetch all quests
export const fetchAllQuests = async (authToken: string | null) => {
  try {
    const response = await apiClient.get("/web3/quests/users/all", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data.quests.data; // Adjust based on API response
  } catch (error) {
    console.error("Error fetching quests:", error);
    throw error;
  }
};

// Fetch quests from local JSON file (for development)
export const fetchLocalQuests = async () => {
  const response = await fetch("/data/quest.json");
  const data = await response.json();
  return data;
};
