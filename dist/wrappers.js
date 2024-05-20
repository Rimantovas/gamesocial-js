import { jsx as _jsx } from "react/jsx-runtime";
import { GamesocialProvider } from "./providers/gamesocial";
import { MissionsProvider } from "./providers/missions";
import { ParticipantProvider } from "./providers/participant";
export const QuestsProvider = ({ children, apiKey, apiUrl, errorCallback, }) => {
    return (_jsx(GamesocialProvider, { apiKey: apiKey, apiUrl: apiUrl, children: _jsx(ParticipantProvider, { errorCallback: errorCallback, children: _jsx(MissionsProvider, { children: children }) }) }));
};
//# sourceMappingURL=wrappers.js.map