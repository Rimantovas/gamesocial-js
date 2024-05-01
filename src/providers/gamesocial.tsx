import { createContext, useCallback, useContext, useState } from "react";

interface IConfig {
  devMode: boolean;
  apiKey: string;
  userAuthToken: string;
}

type GamesocialState = {
  apiUrl: string;
  apiKey: string;
  authToken: string;
  setAuthToken: (token: string) => void;
};

const context = createContext<GamesocialState>({
  apiUrl: "",
  apiKey: "",
  authToken: "",
  setAuthToken: () => {},
});

export const useGamesocial = () => useContext(context);

export function GamesocialProvider({
  children,
  state,
  apiKey,
  devMode,
}: {
  children: any;
  state?: GamesocialState;
  apiKey: string;
  devMode?: boolean;
}) {
  state ??= useGamesocialState(apiKey, devMode || false);
  return <context.Provider value={state}>{children}</context.Provider>;
}

export const useGamesocialState = (
  apiKey: string,
  devMode: boolean
): GamesocialState => {
  const [config, setConfig] = useState<IConfig>({
    devMode: devMode,
    apiKey: apiKey,
    userAuthToken: "",
  });

  const apiUrl = config.devMode
    ? "https://qtwebapi.cosmicops.com/"
    : "https://quest-api.gamestarter.com/";

  const authToken = config.userAuthToken;

  const setAuthToken = useCallback((token: string) => {
    setConfig((prev) => ({
      ...prev,
      userAuthToken: token,
    }));
  }, []);

  return {
    apiUrl,
    apiKey,
    authToken,
    setAuthToken,
  };
};
