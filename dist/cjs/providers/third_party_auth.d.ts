import { ThirdPartyProvider } from "../models/enums/third_party.enum";
type ProviderStatus = {
    [key in ThirdPartyProvider]: boolean;
};
type ThirdPartyAuthState = {
    isLoading: boolean;
    authenticated: ProviderStatus;
    authenticate: (provider: ThirdPartyProvider) => void;
    isAuthenticated: (provider: ThirdPartyProvider) => boolean;
};
export declare const useThirdPartyAuth: () => ThirdPartyAuthState;
export declare function ThirdPartyAuthProvider({ children, state, errorCallback, }: {
    children: any;
    state?: ThirdPartyAuthState;
    errorCallback?: (error: any) => void;
}): import("react/jsx-runtime").JSX.Element;
export declare const useThirdPartyAuthState: (errorCallback?: (error: any) => void) => ThirdPartyAuthState;
export {};
