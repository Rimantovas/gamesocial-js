import { ThirdPartyProvider } from "../enums/third_party.enum";
export interface IParticipant {
    identifier: string;
    identifier_type: string;
    authenticated: ThirdPartyProvider[];
    points: number;
    points_multiplier: number;
}
