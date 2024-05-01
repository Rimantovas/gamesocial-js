import { createContext, useCallback, useContext, useState } from "react";

interface IConfig {
  devMode: boolean;
  apiKey: string;
  userAuthToken: string | undefined;
}

type GamesocialState = {
  apiUrl: string;
  apiKey: string;
  authToken: string | undefined;
  setAuthToken: (token: string | undefined) => void;
};

const context = createContext<GamesocialState>({
  apiUrl: "",
  apiKey: "",
  authToken: undefined,
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
    userAuthToken: undefined,
  });

  const apiUrl = config.devMode
    ? "https://qtwebapi.cosmicops.com/"
    : "https://quest-api.gamestarter.com/";

  const authToken = config.userAuthToken;

  const setAuthToken = useCallback((token: string | undefined) => {
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
