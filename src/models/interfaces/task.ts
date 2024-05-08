import { ParticipantTaskStatus } from "../enums/participants.enum";
import { TaskRewardType } from "../enums/task_reward_type.enum";
import { TaskValidation } from "../enums/task_validation.enum";
import { TaskType } from "../enums/tasks.enum";

export interface ITask {
  pid?: number;
  id: string;
  mission_id: string;
  title: string;
  info?: string;
  description?: string;
  points_reward?: number;
  repetitive: boolean;
  coming_soon: boolean;
  reward_type: TaskRewardType;
  daily: boolean;
  content?: string;

  metadata:
    | BaseMetadata
    | IDiscordJoinMetadata
    | ISubmitStringMetadata
    | ITwitterReplyMetadata
    | ITwitterLikeMetadata
    | ITwitterRepostMetadata
    | ITwitterFollowMetadata
    | IYoutubeViewMetadata
    | IImageUploadMetadata
    | ITelegramJoinMetadata
    | IManualMetadata
    | IOpenUrlMetadata
    | IYoutubeSubscribeMetadata
    | ITwitchFollowMetadata
    | ITwitterActivityMetadata;
  type: TaskType;
  participation?: IParticipation;
}

export interface BaseMetadata {
  primary?: boolean;
  image?: string;
  identifier?: string;
}

export interface IParticipation {
  status: ParticipantTaskStatus;
  comment?: string | null;
  points_rewarded?: number;
  metadata?: {
    [key: string]: any;
  };
}

export interface ITwitterFollowMetadata extends BaseMetadata {
  username: string;
  id: string;
}

export interface ITwitterRepostMetadata extends BaseMetadata {
  post_url: string;
  post_id: string;
}

export interface ITwitterReplyMetadata extends BaseMetadata {
  post_url: string;
  post_id: string;
}

export interface ITwitterLikeMetadata extends BaseMetadata {
  post_url: string;
  post_id: string;
}

export interface IYoutubeViewMetadata extends BaseMetadata {
  video_url: string;
  video_id: string;
}

export interface IImageUploadMetadata extends BaseMetadata {}

export interface ISubmitStringMetadata extends BaseMetadata {}

export interface ITelegramJoinMetadata extends BaseMetadata {
  username: string;
}

export interface IDiscordJoinMetadata extends BaseMetadata {
  invite_url: string;
}

export interface ITwitterActivityMetadata extends BaseMetadata {
  rule: string;
  retweet_count_points: number;
  reply_count_points: number;
  like_count_points: number;
  quote_count_points: number;
  impression_count_points: number;
}

export interface IManualMetadata extends BaseMetadata {
  validation?: TaskValidation;
}
export interface IOpenUrlMetadata extends BaseMetadata {
  url: string;
}

export interface IYoutubeSubscribeMetadata extends BaseMetadata {
  channel_url: string;
}

export interface ITwitchFollowMetadata extends BaseMetadata {
  twitch_url: string;
}
