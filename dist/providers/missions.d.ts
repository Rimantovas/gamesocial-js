import { ParticipantTaskStatus } from "@/models/enums/participants.enum";
import { IMission } from "@/models/interfaces/mission";
import { ITask } from "@/models/interfaces/task";
type MissionsState = {
    missions: IMission[];
    tasks: ITask[];
    getTasksForMission: (missionId: string) => ITask[];
    updateTaskStatus: (taskId: string, status: ParticipantTaskStatus) => void;
    maintenance: boolean;
};
export declare const useMissions: () => MissionsState;
export declare function MissionsProvider({ children, state, }: {
    children: any;
    state?: MissionsState;
}): import("react/jsx-runtime").JSX.Element;
export declare const useMissionsState: () => MissionsState;
export {};
