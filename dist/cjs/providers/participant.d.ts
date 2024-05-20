import { ITask } from "../models/interfaces/task";
import { ThirdPartyProvider } from "../models/enums/third_party.enum";
import { IParticipant } from "../models/interfaces/participant";
type ParticipantState = {
    participant?: IParticipant;
    isThirdPartyAuthenticated: (thirdParty: ThirdPartyProvider) => boolean;
    addPoints: (task: ITask) => void;
    getParticipant: () => void;
};
export declare const useParticipant: () => ParticipantState;
export declare function ParticipantProvider({ children, state, errorCallback, }: {
    children: any;
    state?: ParticipantState;
    errorCallback?: (error: any) => void;
}): import("react/jsx-runtime").JSX.Element;
export declare const useParticipantState: (errorCallback?: (error: any) => void) => ParticipantState;
export {};
