import { createContext, useCallback, useContext, useState } from "react";

interface IConfig {
  apiUrl: string;
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
  apiUrl,
}: {
  children: any;
  state?: GamesocialState;
  apiKey: string;
  apiUrl: string;
}) {
  state ??= useGamesocialState(apiKey, apiUrl);
  return <context.Provider value={state}>{children}</context.Provider>;
}

export const useGamesocialState = (
  apiKey: string,
  apiUrl: string
): GamesocialState => {
  const [config, setConfig] = useState<IConfig>({
    apiUrl: apiUrl,
    apiKey: apiKey,
    userAuthToken: undefined,
  });

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
