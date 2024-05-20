import { ITask } from "./task";
export interface TaskCallbacks {
    onYoutubeView: (task: ITask, videoId: string) => Promise<number>;
    onFileUpload: (task: ITask) => Promise<string>;
    onSubmitString: (task: ITask) => Promise<string>;
}
