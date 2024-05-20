import { TaskButtonType } from "../models/enums/task_button_type.enum";
import { ITask } from "../models/interfaces/task";
import { TaskCallbacks } from "../models/interfaces/task_callbacks";
import React from "react";
type Props = {
    task: ITask;
    participationDisabled: boolean;
    maintenance: boolean;
    children: (props: {
        onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
        type: TaskButtonType;
        isLoading?: boolean;
        disabled?: boolean;
        comment: string | null | undefined;
    }) => React.ReactElement;
    callbacks: TaskCallbacks;
    errorCallback?: (error: any) => void;
    onSuccess?: () => void;
};
declare const TaskWrapper: React.FC<Props>;
export default TaskWrapper;
