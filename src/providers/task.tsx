import { createContext, useContext, useState } from "react";

import { useApi } from "@/hooks/useApi";
import { ParticipantTaskStatus } from "@/models/enums/participants.enum";
import { ITask } from "@/models/interfaces/task";
import { errorMessages } from "@/utils/errors";
import { useMissions } from "./missions";
import { useParticipant } from "./participant";

type TaskState = {
  isParticipationLoading: boolean;
  participate: (task: ITask, body?: any, callback?: any) => Promise<boolean>;
};

const context = createContext<TaskState>({
  isParticipationLoading: false,
  participate: () => Promise.resolve(false),
});

export const useTask = () => useContext(context);

export function TaskProvider({
  children,
  state,
  errorCallback,
}: {
  children: any;
  state?: TaskState;
  errorCallback?: (error: any) => void;
}) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  state ??= useTaskState(errorCallback);
  return <context.Provider value={state}>{children}</context.Provider>;
}

export const useTaskState = (
  errorCallback?: (error: any) => void
): TaskState => {
  const [isParticipationLoading, setIsParticipationLoading] =
    useState<boolean>(false);
  const { updateTaskStatus } = useMissions();
  const { addPoints } = useParticipant();
  const api = useApi();

  const handleError = (e: any) => {
    let message: string = "";
    if (e?.response?.data?.message) {
      if (typeof e?.response?.data?.message === "string") {
        message = e?.response?.data?.message.toString();
      } else {
        // todo
      }
    } else if (e?.response?.message) {
      message = e?.response?.message.toString();
    }

    if (!message) {
      errorCallback && errorCallback("Server error, please try again later");
    } else {
      if (message in errorMessages) {
        errorCallback && errorCallback(errorMessages[message]);
      } else {
        errorCallback && errorCallback(message);
      }
    }
  };

  const participate = async (
    task: ITask,
    body?: any,
    callback?: any
  ): Promise<boolean> => {
    setIsParticipationLoading(true);
    let data = { ...body };
    if (body?.file) {
      const base64 = await fetch(body.file)
        .then((response) => response.blob())
        .then((blob) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          return new Promise((res) => {
            reader.onloadend = () => {
              res(reader.result);
            };
          });
        });
      data = {
        ...body,
        file: {
          imageSrc: base64,
        },
      };
    }
    await api
      .post(`tasks/${task.id}`, body ? data : undefined)
      .then(function (response) {
        updateTaskStatus(task.id, response.data.status);
        if (
          response.data.status === ParticipantTaskStatus.completed &&
          task.points_reward
        ) {
          addPoints(task.points_reward);
        }
        if (callback) {
          callback();
        }
        return true;
      })
      .catch(function (error) {
        handleError(error);
      })
      .finally(function () {
        setIsParticipationLoading(false);
      });

    return false;
  };

  return {
    isParticipationLoading,
    participate,
  };
};
