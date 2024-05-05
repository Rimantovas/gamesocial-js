import { useApi } from "@/hooks/useApi";
import { ThirdPartyProvider } from "@/models/enums/third_party.enum";
import { getCurrentHrefWithoutQueryParams } from "@/utils/utils";
import { createContext, useContext, useEffect, useState } from "react";
import { useParticipant } from "./participant";

type ProviderStatus = {
  [key in ThirdPartyProvider]: boolean;
};

const defaultProviderStatus: ProviderStatus = Object.fromEntries(
  Object.values(ThirdPartyProvider).map((provider) => [provider, false])
) as ProviderStatus;

type ThirdPartyAuthState = {
  isLoading: boolean;
  authenticated: ProviderStatus;
  authenticate: (provider: ThirdPartyProvider) => void;
  isAuthenticated: (provider: ThirdPartyProvider) => boolean;
};

const context = createContext<ThirdPartyAuthState>({
  isLoading: false,
  authenticated: defaultProviderStatus,
  authenticate: () => ({}),
  isAuthenticated: () => false,
});

export const useThirdPartyAuth = () => useContext(context);

export function ThirdPartyAuthProvider({
  children,
  state,
  errorCallback,
}: {
  children: any;
  state?: ThirdPartyAuthState;
  errorCallback?: (error: any) => void;
}) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  state ??= useThirdPartyAuthState(errorCallback);
  return <context.Provider value={state}>{children}</context.Provider>;
}

export const useThirdPartyAuthState = (
  errorCallback?: (error: any) => void
): ThirdPartyAuthState => {
  const [authenticated, setAuthenticated] = useState<ProviderStatus>(
    defaultProviderStatus
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { participant } = useParticipant();
  const api = useApi();

  useEffect(() => {
    const newStatus: ProviderStatus = Object.fromEntries(
      Object.values(ThirdPartyProvider).map((provider) => [
        provider,
        !!participant?.authenticated.includes(provider),
      ])
    ) as ProviderStatus;

    setAuthenticated(newStatus);
  }, [participant]);

  const isAuthenticated = (provider: ThirdPartyProvider): boolean => {
    return authenticated[provider] || false;
  };

  const authenticate = (provider: ThirdPartyProvider): void => {
    setIsLoading(true);
    api
      .get(`auth/${provider}`, {
        params: {
          redirect_url: getCurrentHrefWithoutQueryParams(),
        },
      })
      .then(function (response) {
        if (response.data.url) {
          //check if there is an error in query params
          if (response.data.url.includes("?error=")) {
            throw new Error(
              "Failed to authenticate with ThirdPartyAuth: " +
                response.data.url.split("?error=")[1]
            );
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
