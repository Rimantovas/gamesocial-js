import { useApi } from "@/hooks/useApi";
import { ParticipantTaskStatus } from "@/models/enums/participants.enum";
import { IMission } from "@/models/interfaces/mission";
import { ITask } from "@/models/interfaces/task";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { TaskType } from "..";
import { useGamesocial } from "./gamesocial";

type MissionsState = {
  missions: IMission[];
  tasks: ITask[];
  getTasksForMission: (missionId: string) => ITask[];
  updateTaskStatus: (taskId: string, status: ParticipantTaskStatus) => void;
  maintenance: boolean;
};

const context = createContext<MissionsState>({
  missions: [],
  tasks: [],
  getTasksForMission: () => [],
  updateTaskStatus: () => {},
  maintenance: false,
});

export const useMissions = () => useContext(context);

export function MissionsProvider({
  children,
  state,
}: {
  children: any;
  state?: MissionsState;
}) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  state ??= useMissionsState();
  return <context.Provider value={state}>{children}</context.Provider>;
}

export const useMissionsState = (): MissionsState => {
  const [missions, setMissions] = useState<IMission[]>([]);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const { authToken } = useGamesocial();
  const api = useApi();

  const [maintenance, setMaintenance] = useState<boolean>(false);

  useEffect(() => {
    getMissions();
  }, [authToken]);

  useEffect(() => {
    if (missions.length > 0) {
      getTasks(missions.map((m) => m.id));
    }
  }, [missions]);

  useEffect(() => {
    if (authToken && authToken.length === 0) {
      setMaintenance(true);
    }
  }, [authToken]);

  const getMissions = () => {
    api
      .get("missions")
      .then(function (response) {
        setMissions(response.data);
      })
      .catch(function () {
        setMaintenance(true);
      })

      .finally(function () {
        // always executed
      });
  };

  const getTasks = (missionIds: string[]) => {
    const promises = missionIds.map((id) => api.get(`missions/${id}/tasks`));
    Promise.all(promises)
      .then(function (responses) {
        const validTypes = new Set(Object.values(TaskType));
        const tasks = responses
          .map((r) => r.data)
          .flat()
          .filter((t) => validTypes.has(t.type));
        setTasks(tasks);
      })
      .catch(function () {
        setMaintenance(true);
      });
  };

  const updateTaskStatus = (taskId: string, status: ParticipantTaskStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, participation: { status } } : task
      )
    );
  };

  const getTasksForMission = useCallback(
    (missionId: string) => {
      return tasks.filter((t) => t.mission_id === missionId);
    },
    [tasks]
  );

  return {
    missions,
    tasks,
    getTasksForMission,
    updateTaskStatus,
    maintenance,
  };
};
