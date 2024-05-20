"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGamesocial = exports.GamesocialProvider = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var React = __importStar(require("react"));
var context = React.createContext({
    apiUrl: "",
    apiKey: "",
    authToken: undefined,
    setAuthToken: function () { },
});
var GamesocialProvider = function (_a) {
    var children = _a.children, apiKey = _a.apiKey, apiUrl = _a.apiUrl;
    var _b = React.useState(undefined), authToken = _b[0], setAuthToken = _b[1];
    var state = {
        apiUrl: apiUrl,
        apiKey: apiKey,
        authToken: authToken,
        setAuthToken: setAuthToken,
    };
    return (0, jsx_runtime_1.jsx)(context.Provider, { value: state, children: children });
};
exports.GamesocialProvider = GamesocialProvider;
var useGamesocial = function () { return React.useContext(context); };
exports.useGamesocial = useGamesocial;
//# sourceMappingURL=gamesocial.js.map