import { GamesocialProvider } from "./providers/gamesocial";
import { MissionsProvider } from "./providers/missions";
import { ParticipantProvider } from "./providers/participant";

export const QuestsProvider = ({
  children,
  apiKey,
  apiUrl,
  errorCallback,
}: {
  children: any;
  apiKey: string;
  apiUrl: string;
  errorCallback?: (error: any) => void;
}) => {
  return (
    <GamesocialProvider apiKey={apiKey} apiUrl={apiUrl}>
      <ParticipantProvider errorCallback={errorCallback}>
        <MissionsProvider>{children}</MissionsProvider>
      </ParticipantProvider>
    </GamesocialProvider>
  );
};
