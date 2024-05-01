import { ParticipantTaskStatus } from '../enums/participants.enum';

export interface IParticipantTask {
  status: ParticipantTaskStatus;
  comment?: string;
}
