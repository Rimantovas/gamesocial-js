import { ParticipantTaskStatus } from "../enums/participants.enum";
export interface IParticipantTask {
    status: ParticipantTaskStatus;
    comment?: string;
    metadata?: any;
    points_rewarded?: number;
}
