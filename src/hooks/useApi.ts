import { useGamesocial } from "@/providers/gamesocial";
import axios, { AxiosInstance } from "axios";
import { useEffect, useState } from "react";

export const useApi = (): AxiosInstance => {
  const { authToken, apiUrl, apiKey } = useGamesocial();

  const createApi = (): AxiosInstance => {
    const api = axios.create({
      baseURL: apiUrl,
      timeout: 10000,
      headers: {
        "Api-Key": apiKey,
        "Api-Version": "1.0",
      },
    });

    api.interceptors.request.use(
      (config) => {
        const token = authToken;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    api.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
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

  const [api, setApi] = useState<AxiosInstance>(createApi());

  useEffect(() => {
    setApi(createApi());
  }, [apiUrl, apiKey, authToken]);

  return api;
};
