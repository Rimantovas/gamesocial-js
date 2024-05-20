"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useThirdPartyAuthState = exports.ThirdPartyAuthProvider = exports.useThirdPartyAuth = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var useApi_1 = require("../hooks/useApi");
var third_party_enum_1 = require("../models/enums/third_party.enum");
var utils_1 = require("../utils/utils");
var react_1 = require("react");
var participant_1 = require("./participant");
var defaultProviderStatus = Object.fromEntries(Object.values(third_party_enum_1.ThirdPartyProvider).map(function (provider) { return [provider, false]; }));
var context = (0, react_1.createContext)({
    isLoading: false,
    authenticated: defaultProviderStatus,
    authenticate: function () { return ({}); },
    isAuthenticated: function () { return false; },
});
var useThirdPartyAuth = function () { return (0, react_1.useContext)(context); };
exports.useThirdPartyAuth = useThirdPartyAuth;
function ThirdPartyAuthProvider(_a) {
    var children = _a.children, state = _a.state, errorCallback = _a.errorCallback;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    state !== null && state !== void 0 ? state : (state = (0, exports.useThirdPartyAuthState)(errorCallback));
    return (0, jsx_runtime_1.jsx)(context.Provider, { value: state, children: children });
}
exports.ThirdPartyAuthProvider = ThirdPartyAuthProvider;
var useThirdPartyAuthState = function (errorCallback) {
    var _a = (0, react_1.useState)(defaultProviderStatus), authenticated = _a[0], setAuthenticated = _a[1];
    var _b = (0, react_1.useState)(false), isLoading = _b[0], setIsLoading = _b[1];
    var participant = (0, participant_1.useParticipant)().participant;
    var api = (0, useApi_1.useApi)();
    (0, react_1.useEffect)(function () {
        var newStatus = Object.fromEntries(Object.values(third_party_enum_1.ThirdPartyProvider).map(function (provider) { return [
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
                redirect_url: (0, utils_1.getCurrentHrefWithoutQueryParams)(),
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
exports.useThirdPartyAuthState = useThirdPartyAuthState;
//# sourceMappingURL=third_party_auth.js.map