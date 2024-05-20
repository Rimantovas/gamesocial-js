"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestsProvider = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var gamesocial_1 = require("./providers/gamesocial");
var missions_1 = require("./providers/missions");
var participant_1 = require("./providers/participant");
var QuestsProvider = function (_a) {
    var children = _a.children, apiKey = _a.apiKey, apiUrl = _a.apiUrl, errorCallback = _a.errorCallback;
    return ((0, jsx_runtime_1.jsx)(gamesocial_1.GamesocialProvider, { apiKey: apiKey, apiUrl: apiUrl, children: (0, jsx_runtime_1.jsx)(participant_1.ParticipantProvider, { errorCallback: errorCallback, children: (0, jsx_runtime_1.jsx)(missions_1.MissionsProvider, { children: children }) }) }));
};
exports.QuestsProvider = QuestsProvider;
//# sourceMappingURL=wrappers.js.map