import { createContext, useContext, useState } from "react";

import { useApi } from "@/hooks/useApi";
import { ThirdPartyProvider } from "../models/enums/third_party.enum";
import { IParticipant } from "../models/interfaces/participant";

type ParticipantState = {
  participant?: IParticipant;
  isThirdPartyAuthenticated: (thirdParty: ThirdPartyProvider) => boolean;
  addPoints: (points: number) => void;
  getParticipant: () => void;
  setParticipant: (participant: IParticipant | undefined) => void;
};

const context = createContext<ParticipantState>({
  participant: undefined,
  isThirdPartyAuthenticated: () => false,
  addPoints: () => {},
  getParticipant: () => {},
  setParticipant: () => {},
});

export const useParticipant = () => useContext(context);

export function ParticipantProvider({
  children,
  state,
  errorCallback,
}: {
  children: any;
  state?: ParticipantState;
  errorCallback?: (error: any) => void;
}) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  state ??= useParticipantState(errorCallback);
  return <context.Provider value={state}>{children}</context.Provider>;
}

export const useParticipantState = (
  errorCallback?: (error: any) => void
): ParticipantState => {
  const [participant, setParticipant] = useState<IParticipant>();

  const api = useApi();

  // useEffect(() => {
  //   if (user.userData?.questsAccessToken) {
  //     getParticipant();
  //   } else {
  //     setParticipant(undefined);
  //   }
  // }, [user.userData?.questsAccessToken]);

  const getParticipant = () => {
    api
      .get(`participants/me`)
      .then(function (response) {
        setParticipant(response.data);
      })
      .catch(function (error: any) {
        console.error(error);
        errorCallback && errorCallback(error);
      });
  };

  const isThirdPartyAuthenticated = (
    thirdParty: ThirdPartyProvider
  ): boolean => {
    return !!participant?.authenticated.includes(thirdParty);
  };

  const addPoints = (p: number) => {
    setParticipant((prev) => {
      if (!prev) return undefined;
      return { ...prev, points: prev?.points + p };
    });
  };

  return {
    participant,
    isThirdPartyAuthenticated,
    addPoints,
    getParticipant,
    setParticipant,
  };
};
