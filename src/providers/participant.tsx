import { createContext, useContext, useEffect, useState } from "react";

import { useApi } from "@/hooks/useApi";
import { TaskRewardType } from "@/models/enums/task_reward_type.enum";
import { ITask } from "@/models/interfaces/task";
import { ThirdPartyProvider } from "../models/enums/third_party.enum";
import { IParticipant } from "../models/interfaces/participant";
import { useGamesocial } from "./gamesocial";

type ParticipantState = {
  participant?: IParticipant;
  isThirdPartyAuthenticated: (thirdParty: ThirdPartyProvider) => boolean;
  addPoints: (task: ITask) => void;
  getParticipant: () => void;
};

const context = createContext<ParticipantState>({
  participant: undefined,
  isThirdPartyAuthenticated: () => false,
  addPoints: () => {},
  getParticipant: () => {},
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
  const { authToken } = useGamesocial();

  const api = useApi();

  useEffect(() => {
    if (authToken) {
      getParticipant();
    } else {
      setParticipant(undefined);
    }
  }, [authToken]);

  const getParticipant = () => {
    api()
      .get(`participants/me`)
      .then(function (response: any) {
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

  const addPoints = (task: ITask) => {
    if (!task.points_reward) return;

    setParticipant((prev) => {
      if (!prev) return undefined;
      if (task.reward_type === TaskRewardType.points) {
        const points = Math.floor(
          task.points_reward! * (participant?.points_multiplier ?? 1)
        );
        setParticipant((prev) => {
          if (!prev) return undefined;
          return {
            ...prev,
            points: prev?.points + points,
          };
        });
      } else {
        setParticipant((prev) => {
          if (!prev) return undefined;
          return {
            ...prev,
            points_multiplier: prev?.points_multiplier + task.points_reward!,
          };
        });
      }
    });
  };

  return {
    participant,
    isThirdPartyAuthenticated,
    addPoints,
    getParticipant,
  };
};
