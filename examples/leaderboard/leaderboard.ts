import axios from "axios";

const API_URL = "API_URL";
const PUBLIC_API_KEY = "PUBLIC API KEY";

type LeaderboardEntry = {
  id: string;
  identifier: string;
  points: number;
  position: string;
};

async function getLeaderboard() {
  const questsAccessToken = "quests_access_token"; // The access token of the participant calling the API

  const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
      "Api-Key": PUBLIC_API_KEY,
      "Api-Version": "1.0",
    },
  });

  api.interceptors.request.use(
    (config) => {
      if (questsAccessToken) {
        config.headers.Authorization = `Bearer ${questsAccessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      // Handle successful responses here
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  let data: LeaderboardEntry[];

  const response = await api.get("/participants/top");

  if (response.data) {
    data = response.data;
  } else {
    throw new Error("No data found");
  }

  return data;
}
