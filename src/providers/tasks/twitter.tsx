import { useApi } from "@/hooks/useApi";
import { ThirdPartyProvider } from "@/models/enums/third_party.enum";
import { getCurrentHrefWithoutQueryParams } from "@/utils/utils";
import { createContext, useContext, useEffect, useState } from "react";
import { useParticipant } from "../participant";

type TwitterState = {
  isLoading: boolean;
  isAuthenticated: boolean;
  authenticate: () => void;
};

const context = createContext<TwitterState>({
  isLoading: false,
  isAuthenticated: false,
  authenticate: () => ({}),
});

export const useTwitter = () => useContext(context);

export function TwitterProvider({
  children,
  state,
  errorCallback,
}: {
  children: any;
  state?: TwitterState;
  errorCallback?: (error: any) => void;
}) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  state ??= useTwitterState(errorCallback);
  return <context.Provider value={state}>{children}</context.Provider>;
}

export const useTwitterState = (
  errorCallback?: (error: any) => void
): TwitterState => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { participant } = useParticipant();
  const api = useApi();

  useEffect(() => {
    setIsAuthenticated(
      !!participant?.authenticated.includes(ThirdPartyProvider.twitter)
    );
  }, [participant]);

  const authenticate = (): void => {
    setIsLoading(true);
    api
      .get(`auth/twitter`, {
        params: {
          redirect_url: getCurrentHrefWithoutQueryParams(),
        },
      })
      .then(function (response) {
        if (response.data.url) {
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
    isAuthenticated,
    authenticate,
  };
};
