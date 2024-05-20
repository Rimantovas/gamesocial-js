import { jsx as _jsx } from "react/jsx-runtime";
import { GamesocialProvider } from "./providers/gamesocial";
import { MissionsProvider } from "./providers/missions";
import { ParticipantProvider } from "./providers/participant";
export var QuestsProvider = function (_a) {
    var children = _a.children, apiKey = _a.apiKey, apiUrl = _a.apiUrl, errorCallback = _a.errorCallback;
    return (_jsx(GamesocialProvider, { apiKey: apiKey, apiUrl: apiUrl, children: _jsx(ParticipantProvider, { errorCallback: errorCallback, children: _jsx(MissionsProvider, { children: children }) }) }));
};
//# sourceMappingURL=wrappers.js.map