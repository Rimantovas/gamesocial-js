import { useApi } from "@/hooks/useApi";
import { ThirdPartyProvider } from "@/models/enums/third_party.enum";
import { getCurrentHrefWithoutQueryParams } from "@/utils/utils";
import { createContext, useContext, useEffect, useState } from "react";
import { useParticipant } from "../participant";

type TelegramState = {
  isLoading: boolean;
  isAuthenticated: boolean;
  authenticate: () => void;
};

const context = createContext<TelegramState>({
  isLoading: false,
  isAuthenticated: false,
  authenticate: () => ({}),
});

export const useTelegram = () => useContext(context);

export function TelegramProvider({
  children,
  state,
  errorCallback,
}: {
  children: any;
  state?: TelegramState;
  errorCallback?: (error: any) => void;
}) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  state ??= useTelegramState(errorCallback);
  return <context.Provider value={state}>{children}</context.Provider>;
}

export const useTelegramState = (
  errorCallback?: (error: any) => void
): TelegramState => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { participant } = useParticipant();
  const api = useApi();

  useEffect(() => {
    setIsAuthenticated(
      !!participant?.authenticated.includes(ThirdPartyProvider.telegram)
    );
  }, [participant]);

  const authenticate = (): void => {
    setIsLoading(true);
    api
      .get(`auth/telegram`, {
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
