import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
var context = React.createContext({
    apiUrl: "",
    apiKey: "",
    authToken: undefined,
    setAuthToken: function () { },
});
export var GamesocialProvider = function (_a) {
    var children = _a.children, apiKey = _a.apiKey, apiUrl = _a.apiUrl;
    var _b = React.useState(undefined), authToken = _b[0], setAuthToken = _b[1];
    var state = {
        apiUrl: apiUrl,
        apiKey: apiKey,
        authToken: authToken,
        setAuthToken: setAuthToken,
    };
    return _jsx(context.Provider, { value: state, children: children });
};
export var useGamesocial = function () { return React.useContext(context); };
//# sourceMappingURL=gamesocial.js.map