import { useGamesocial } from "@/providers/gamesocial";
import axios, { AxiosInstance } from "axios";

export const useApi = () => {
  const { authToken, apiUrl, apiKey } = useGamesocial();

  const api = (): AxiosInstance => {
    const api = axios.create({
      baseURL: apiUrl,
      timeout: 10000,
      headers: {
        "Api-Key": apiKey,
        "Api-Version": "1.0",
      },
    });

    api.interceptors.request.use(
      (config: any) => {
        const token = authToken;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: any) => {
        return Promise.reject(error);
      }
    );

    api.interceptors.response.use(
      (response: any) => {
        return response;
      },
      (error: any) => {
        if (error.response && error.response.status === 401) {
          // Ensure this runs only in the browser
          if (typeof window !== "undefined") {
            localStorage.removeItem("token");
          }
        }
        return Promise.reject(error);
      }
    );
    return api;
  };

  return api;
};
