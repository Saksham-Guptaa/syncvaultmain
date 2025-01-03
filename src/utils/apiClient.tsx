import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://hoc-api.syncvault.com/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
