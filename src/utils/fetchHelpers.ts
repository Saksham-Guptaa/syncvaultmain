// src/utils/fetchHelpers.ts

// Fetch features from local JSON file
export const fetchFeatures = async () => {
    const response = await fetch("/data/features.json");
    const data = await response.json();
    return data;
  };
  
  // Fetch rewards from local JSON file
  export const fetchRewards = async () => {
    const response = await fetch("/data/quest.json");
    const data = await response.json();
    return data;
  };
  