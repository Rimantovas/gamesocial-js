import { GamesocialProvider } from "./providers/gamesocial";
import { MissionsProvider } from "./providers/missions";
import { ParticipantProvider } from "./providers/participant";

export const QuestsProvider = ({
  children,
  apiKey,
  devMode,
  errorCallback,
}: {
  children: any;
  apiKey: string;
  devMode?: boolean;
  errorCallback?: (error: any) => void;
}) => {
  return (
    <GamesocialProvider apiKey={apiKey} devMode={devMode}>
      <ParticipantProvider errorCallback={errorCallback}>
        <MissionsProvider>{children}</MissionsProvider>
      </ParticipantProvider>
    </GamesocialProvider>
  );
};
