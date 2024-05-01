import { useApi } from "@/hooks/useApi";
import { createContext, useContext, useEffect, useState } from "react";
import { ThirdPartyProvider } from "../../models/enums/third_party.enum";
import { getCurrentHrefWithoutQueryParams } from "../../utils/utils";
import { useParticipant } from "../participant";

type DiscordState = {
  isLoading: boolean;
  isAuthenticated: boolean;
  authenticate: () => void;
};

const context = createContext<DiscordState>({
  isLoading: false,
  isAuthenticated: false,
  authenticate: () => ({}),
});

export const useDiscord = () => useContext(context);

export function DiscordProvider({
  children,
  state,
  errorCallback,
}: {
  children: any;
  state?: DiscordState;
  errorCallback?: (error: any) => void;
}) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  state ??= useDiscordState(errorCallback);
  return <context.Provider value={state}>{children}</context.Provider>;
}

export const useDiscordState = (
  errorCallback?: (error: any) => void
): DiscordState => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { participant } = useParticipant();
  const api = useApi();

  useEffect(() => {
    setIsAuthenticated(
      !!participant?.authenticated.includes(ThirdPartyProvider.discord)
    );
  }, [participant]);

  const authenticate = (): void => {
    setIsLoading(true);
    api
      .get(`auth/discord`, {
        params: {
          redirect_url: getCurrentHrefWithoutQueryParams(),
        },
      })
      .then(function (response) {
        if (response.data.url) {
          //check if there is an error in query params
          if (response.data.url.includes("?error=")) {
            throw new Error(
              "Failed to authenticate with Discord: " +
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
    isAuthenticated,
    authenticate,
  };
};
