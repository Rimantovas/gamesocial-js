import { jsx as _jsx } from "react/jsx-runtime";
import { useApi } from "@/hooks/useApi";
import { ThirdPartyProvider } from "@/models/enums/third_party.enum";
import { getCurrentHrefWithoutQueryParams } from "@/utils/utils";
import { createContext, useContext, useEffect, useState } from "react";
import { useParticipant } from "./participant";
const defaultProviderStatus = Object.fromEntries(Object.values(ThirdPartyProvider).map((provider) => [provider, false]));
const context = createContext({
    isLoading: false,
    authenticated: defaultProviderStatus,
    authenticate: () => ({}),
    isAuthenticated: () => false,
});
export const useThirdPartyAuth = () => useContext(context);
export function ThirdPartyAuthProvider({ children, state, errorCallback, }) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    state !== null && state !== void 0 ? state : (state = useThirdPartyAuthState(errorCallback));
    return _jsx(context.Provider, { value: state, children: children });
}
export const useThirdPartyAuthState = (errorCallback) => {
    const [authenticated, setAuthenticated] = useState(defaultProviderStatus);
    const [isLoading, setIsLoading] = useState(false);
    const { participant } = useParticipant();
    const api = useApi();
    useEffect(() => {
        const newStatus = Object.fromEntries(Object.values(ThirdPartyProvider).map((provider) => [
            provider,
            !!(participant === null || participant === void 0 ? void 0 : participant.authenticated.includes(provider)),
        ]));
        setAuthenticated(newStatus);
    }, [participant]);
    const isAuthenticated = (provider) => {
        return authenticated[provider] || false;
    };
    const authenticate = (provider) => {
        setIsLoading(true);
        api()
            .get(`auth/${provider}`, {
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
            .finally(() => {
            setIsLoading(false);
        });
    };
    return {
        isLoading,
        authenticated,
        authenticate,
        isAuthenticated,
    };
};
//# sourceMappingURL=third_party_auth.js.map