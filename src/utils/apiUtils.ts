import axios, { AxiosInstance } from "axios";

// Function to fetch quest details
export const fetchQuestDetails = async (id: string, authToken: string | null) => {
  const response = await axios.get(
    `https://hoc-api.syncvault.com/v1/web3/quests/users/show/${id}`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
  return response.data;
};

// Function to fetch tasks data
export const fetchTasksData = async (id: string, authToken: string | null) => {
  const response = await axios.get(
    `https://hoc-api.syncvault.com/v1/web3/quest-tasks/users/all/${id}`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
  return response.data.tasks.data;
};

// Function to verify tasks
export const verifyTask = async (id: number, authToken: string) => {
  const response = await axios.post(
    `https://hoc-api.syncvault.com/v1/web3/quest-tasks/${id}/verify`,
    {},
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
  return response.data;
};



// Function to register user after successful wallet authentication
export const registerUser = async (
  walletAddress: string,
  signature: string,
  firstName: string,
  lastName: string,
  email: string
) => {
  try {
    const response = await axios.post(
      "https://hoc-api.syncvault.com/v1/web3/auth/register",
      {
        wallet: walletAddress,
        signature,
        first_name: firstName,
        last_name: lastName,
        email,
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error("Error registering user:", error);
    throw new Error("User registration failed");
  }
};


const apiClient: AxiosInstance = axios.create({
  baseURL: "https://hoc-api.syncvault.com/v1/web3", // API base URL
  timeout: 10000, // Timeout limit
});


export const fetchQuests = async (authToken: string | null) => {
  try {
    const response = await apiClient.get("/quests/users/all", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data.quests.data; // Return quest data
  } catch (error) {
    console.error("Error fetching quests:", error);
    throw error;
  }
};
