import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useCallback, useContext, useState } from "react";
const context = createContext({
    apiUrl: "",
    apiKey: "",
    authToken: undefined,
    setAuthToken: () => { },
});
export const useGamesocial = () => useContext(context);
export function GamesocialProvider({ children, state, apiKey, apiUrl, }) {
    state !== null && state !== void 0 ? state : (state = useGamesocialState(apiKey, apiUrl));
    return _jsx(context.Provider, { value: state, children: children });
}
export const useGamesocialState = (apiKey, apiUrl) => {
    const [config, setConfig] = useState({
        apiUrl: apiUrl,
        apiKey: apiKey,
        userAuthToken: undefined,
    });
    const authToken = config.userAuthToken;
    const setAuthToken = useCallback((token) => {
        setConfig((prev) => (Object.assign(Object.assign({}, prev), { userAuthToken: token })));
    }, []);
    return {
        apiUrl,
        apiKey,
        authToken,
        setAuthToken,
    };
};
//# sourceMappingURL=gamesocial.js.map