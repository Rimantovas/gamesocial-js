import { jsx as _jsx } from "react/jsx-runtime";
import { useApi } from "../hooks/useApi";
import { ThirdPartyProvider } from "../models/enums/third_party.enum";
import { getCurrentHrefWithoutQueryParams } from "../utils/utils";
import { createContext, useContext, useEffect, useState } from "react";
import { useParticipant } from "./participant";
var defaultProviderStatus = Object.fromEntries(Object.values(ThirdPartyProvider).map(function (provider) { return [provider, false]; }));
var context = createContext({
    isLoading: false,
    authenticated: defaultProviderStatus,
    authenticate: function () { return ({}); },
    isAuthenticated: function () { return false; },
});
export var useThirdPartyAuth = function () { return useContext(context); };
export function ThirdPartyAuthProvider(_a) {
    var children = _a.children, state = _a.state, errorCallback = _a.errorCallback;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    state !== null && state !== void 0 ? state : (state = useThirdPartyAuthState(errorCallback));
    return _jsx(context.Provider, { value: state, children: children });
}
export var useThirdPartyAuthState = function (errorCallback) {
    var _a = useState(defaultProviderStatus), authenticated = _a[0], setAuthenticated = _a[1];
    var _b = useState(false), isLoading = _b[0], setIsLoading = _b[1];
    var participant = useParticipant().participant;
    var api = useApi();
    useEffect(function () {
        var newStatus = Object.fromEntries(Object.values(ThirdPartyProvider).map(function (provider) { return [
            provider,
            !!(participant === null || participant === void 0 ? void 0 : participant.authenticated.includes(provider)),
        ]; }));
        setAuthenticated(newStatus);
    }, [participant]);
    var isAuthenticated = function (provider) {
        return authenticated[provider] || false;
    };
    var authenticate = function (provider) {
        setIsLoading(true);
        api()
            .get("auth/".concat(provider), {
            params: {
                redirect_url: getCurrentHrefWithoutQueryParams(),
            },
        })
            .then(function (response) {
            if (response.data.url) {
                //check if there is an error in query params
                if (response.data.url.includes("?error=")) {
                    throw new Error("Failed to authenticate with ThirdPartyAuth: " +
                        response.data.url.split("?error=")[1]);
                }
                window.location.href = response.data.url;
            }
        })
            .catch(function (error) {
            console.error(error);
            errorCallback && errorCallback(error);
        })
            .finally(function () {
            setIsLoading(false);
        });
    };
    return {
        isLoading: isLoading,
        authenticated: authenticated,
        authenticate: authenticate,
        isAuthenticated: isAuthenticated,
    };
};
//# sourceMappingURL=third_party_auth.js.map