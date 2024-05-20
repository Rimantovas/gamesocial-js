import * as React from "react";

type GamesocialProps = {
  children: any;
  apiKey: string;
  apiUrl: string;
};

type GamesocialState = {
  apiUrl: string;
  apiKey: string;
  authToken: string | undefined;
  setAuthToken: (token: string | undefined) => void;
};

const context = React.createContext<GamesocialState>({
  apiUrl: "",
  apiKey: "",
  authToken: undefined,
  setAuthToken: () => {},
});

export const GamesocialProvider: React.FC<GamesocialProps> = ({
  children,
  apiKey,
  apiUrl,
}) => {
  const [authToken, setAuthToken] = React.useState<string | undefined>(
    undefined
  );

  const state = {
    apiUrl,
    apiKey,
    authToken,
    setAuthToken,
  };

  return <context.Provider value={state}>{children}</context.Provider>;
};

export const useGamesocial = () => React.useContext(context);
