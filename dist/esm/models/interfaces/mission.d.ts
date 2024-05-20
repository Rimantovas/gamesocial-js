import { MissionRewardType, MissionType } from "../enums/missions.enum";
import { ParticipantMissionStatus } from "../enums/participants.enum";
import { ISocials } from "./socials";
export interface IMission {
    id: string;
    project_id: string;
    organisation_id: string;
    title: string;
    subtitle?: string | null;
    description?: string;
    reward_comment?: string | null;
    logo?: string;
    banner?: string;
    socials: ISocials;
    reward: IMissionReward | null;
    type: MissionType;
    starts_at: string;
    ends_at: string;
    created_at: string;
    updated_at: string;
    deleted_at?: string;
    reward_available_from: string;
    reward_available_to: string;
    participation?: IMissionParticipation;
}
export interface IMissionParticipation {
    status: ParticipantMissionStatus;
}
export interface IMissionReward {
    type: MissionRewardType;
    metadata: IPointsRewardMetadata | ICryptoRewardMetadata;
}
export interface ICryptoRewardMetadata {
    blockchain: string;
    currency: string;
    amount: number;
}
export interface IPointsRewardMetadata {
    amount: number;
}
