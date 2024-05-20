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
export declare const GamesocialProvider: React.FC<GamesocialProps>;
export declare const useGamesocial: () => GamesocialState;
export {};
