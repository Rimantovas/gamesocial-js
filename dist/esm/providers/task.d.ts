import { ITask } from "../models/interfaces/task";
type TaskState = {
    isParticipationLoading: boolean;
    participate: (task: ITask, body?: any, callback?: any) => Promise<boolean>;
};
export declare const useTask: () => TaskState;
export declare function TaskProvider({ children, state, errorCallback, }: {
    children: any;
    state?: TaskState;
    errorCallback?: (error: any) => void;
}): import("react/jsx-runtime").JSX.Element;
export declare const useTaskState: (errorCallback?: (error: any) => void) => TaskState;
export {};
