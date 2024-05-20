type GamesocialState = {
    apiUrl: string;
    apiKey: string;
    authToken: string | undefined;
    setAuthToken: (token: string | undefined) => void;
};
export declare const useGamesocial: () => GamesocialState;
export declare function GamesocialProvider({ children, state, apiKey, apiUrl, }: {
    children: any;
    state?: GamesocialState;
    apiKey: string;
    apiUrl: string;
}): import("react/jsx-runtime").JSX.Element;
export declare const useGamesocialState: (apiKey: string, apiUrl: string) => GamesocialState;
export {};
