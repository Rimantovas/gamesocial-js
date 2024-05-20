import * as react_jsx_runtime from 'react/jsx-runtime';

declare enum TaskButtonType {
    NO_PARTICIPANT = "NO_PARTICIPANT",// If not participant is found. Usually that means the user is not authenticated.
    START = "START",// If the task is not completed and the user is authenticated.
    CLAIM = "CLAIM",// If the task has been started and the user is authenticated.
    PENDING = "PENDING",// If the task is pending
    COMPLETED = "COMPLETED",// If the task is completed
    FAILED = "FAILED",// If the task has failed
    AUTH_REQUIRED = "AUTH_REQUIRED"
}

declare enum ParticipantTaskStatus {
    created = "created",
    pending = "pending",
    completed = "completed",
    failed = "failed"
}
declare enum ParticipantMissionStatus {
    created = "created",
    started = "started",
    completed = "completed",
    failed = "failed"
}

declare enum TaskRewardType {
    points = "points",
    multiplier = "multiplier"
}

declare enum TaskValidation {
    email = "email",
    is_equal = "is_equal"
}

declare enum TaskType {
    telegram_join = "telegram_join",
    telegram_connect = "telegram_connect",
    youtube_view = "youtube_view",
    image_upload = "image_upload",
    twitter_repost = "twitter_repost",
    twitter_follow = "twitter_follow",
    twitter_reply = "twitter_reply",
    twitter_like = "twitter_like",
    twitter_activity = "twitter_activity",
    twitter_connect = "twitter_connect",
    discord_join = "discord_join",
    discord_connect = "discord_connect",
    submit_string = "submit_string",
    manual = "manual",
    daily_login = "daily_login",
    open_url = "open_url",
    youtube_subscribe = "youtube_subscribe",
    twitch_follow = "twitch_follow"
}

interface ITask {
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
    metadata: BaseMetadata | IDiscordJoinMetadata | ISubmitStringMetadata | ITwitterReplyMetadata | ITwitterLikeMetadata | ITwitterRepostMetadata | ITwitterFollowMetadata | IYoutubeViewMetadata | IImageUploadMetadata | ITelegramJoinMetadata | IManualMetadata | IOpenUrlMetadata | IYoutubeSubscribeMetadata | ITwitchFollowMetadata | ITwitterActivityMetadata;
    type: TaskType;
    participation?: IParticipation;
}
interface BaseMetadata {
    primary?: boolean;
    image?: string;
    identifier?: string;
}
interface IParticipation {
    status: ParticipantTaskStatus;
    comment?: string | null;
    points_rewarded?: number;
    metadata?: {
        [key: string]: any;
    };
}
interface ITwitterFollowMetadata extends BaseMetadata {
    username: string;
    id: string;
}
interface ITwitterRepostMetadata extends BaseMetadata {
    post_url: string;
    post_id: string;
}
interface ITwitterReplyMetadata extends BaseMetadata {
    post_url: string;
    post_id: string;
}
interface ITwitterLikeMetadata extends BaseMetadata {
    post_url: string;
    post_id: string;
}
interface IYoutubeViewMetadata extends BaseMetadata {
    video_url: string;
    video_id: string;
}
interface IImageUploadMetadata extends BaseMetadata {
}
interface ISubmitStringMetadata extends BaseMetadata {
}
interface ITelegramJoinMetadata extends BaseMetadata {
    username: string;
}
interface IDiscordJoinMetadata extends BaseMetadata {
    invite_url: string;
}
interface ITwitterActivityMetadata extends BaseMetadata {
    rule: string;
    retweet_count_points: number;
    reply_count_points: number;
    like_count_points: number;
    quote_count_points: number;
    impression_count_points: number;
}
interface IManualMetadata extends BaseMetadata {
    validation?: TaskValidation;
}
interface IOpenUrlMetadata extends BaseMetadata {
    url: string;
}
interface IYoutubeSubscribeMetadata extends BaseMetadata {
    channel_url: string;
}
interface ITwitchFollowMetadata extends BaseMetadata {
    twitch_url: string;
}

interface TaskCallbacks {
    onYoutubeView: (task: ITask, videoId: string) => Promise<number>;
    onFileUpload: (task: ITask) => Promise<string>;
    onSubmitString: (task: ITask) => Promise<string>;
}
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
declare const TaskWrapper: (props: Props) => react_jsx_runtime.JSX.Element;

declare enum MissionType {
    guaranteed = "guaranteed",
    scoreboard = "scoreboard",
    lottery = "lottery"
}
declare enum MissionRewardType {
    crypto = "crypto",
    points = "points",
    points_per_task = "points_per_task"
}

declare enum QuestWebhookType {
    participant_reward_added = "participant_reward_added",
    participant_reward_removed = "participant_reward_removed",
    third_party_authenticated = "third_party_authenticated",
    task_completed = "task_completed"
}

declare enum ThirdPartyProvider {
    twitter = "twitter",
    telegram = "telegram",
    discord = "discord"
}

interface ISocials {
    twitter: string;
    telegram: string;
    youtube: string;
    instagram: string;
    facebook: string;
    discord: string;
    tiktok: string;
    medium: string;
    website: string;
}

interface IMission {
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
interface IMissionParticipation {
    status: ParticipantMissionStatus;
}
interface IMissionReward {
    type: MissionRewardType;
    metadata: IPointsRewardMetadata | ICryptoRewardMetadata;
}
interface ICryptoRewardMetadata {
    blockchain: string;
    currency: string;
    amount: number;
}
interface IPointsRewardMetadata {
    amount: number;
}

interface IParticipant {
    identifier: string;
    identifier_type: string;
    authenticated: ThirdPartyProvider[];
    points: number;
    points_multiplier: number;
}

interface IParticipantTask {
    status: ParticipantTaskStatus;
    comment?: string;
    metadata?: any;
    points_rewarded?: number;
}

type GamesocialState = {
    apiUrl: string;
    apiKey: string;
    authToken: string | undefined;
    setAuthToken: (token: string | undefined) => void;
};
declare const useGamesocial: () => GamesocialState;
declare function GamesocialProvider({ children, state, apiKey, apiUrl, }: {
    children: any;
    state?: GamesocialState;
    apiKey: string;
    apiUrl: string;
}): react_jsx_runtime.JSX.Element;
declare const useGamesocialState: (apiKey: string, apiUrl: string) => GamesocialState;

type MissionsState = {
    missions: IMission[];
    tasks: ITask[];
    getTasksForMission: (missionId: string) => ITask[];
    updateTaskStatus: (taskId: string, status: ParticipantTaskStatus) => void;
    maintenance: boolean;
};
declare const useMissions: () => MissionsState;
declare function MissionsProvider({ children, state, }: {
    children: any;
    state?: MissionsState;
}): react_jsx_runtime.JSX.Element;
declare const useMissionsState: () => MissionsState;

type ParticipantState = {
    participant?: IParticipant;
    isThirdPartyAuthenticated: (thirdParty: ThirdPartyProvider) => boolean;
    addPoints: (task: ITask) => void;
    getParticipant: () => void;
};
declare const useParticipant: () => ParticipantState;
declare function ParticipantProvider({ children, state, errorCallback, }: {
    children: any;
    state?: ParticipantState;
    errorCallback?: (error: any) => void;
}): react_jsx_runtime.JSX.Element;
declare const useParticipantState: (errorCallback?: (error: any) => void) => ParticipantState;

type TaskState = {
    isParticipationLoading: boolean;
    participate: (task: ITask, body?: any, callback?: any) => Promise<boolean>;
};
declare const useTask: () => TaskState;
declare function TaskProvider({ children, state, errorCallback, }: {
    children: any;
    state?: TaskState;
    errorCallback?: (error: any) => void;
}): react_jsx_runtime.JSX.Element;
declare const useTaskState: (errorCallback?: (error: any) => void) => TaskState;

type ErrorMessages = {
    [key: string]: string;
};
declare const errorMessages: ErrorMessages;
declare const shouldRefetchParticipant: (error: string) => boolean;

declare const getCurrentHrefWithoutQueryParams: () => string;

declare const QuestsProvider: ({ children, apiKey, apiUrl, errorCallback, }: {
    children: any;
    apiKey: string;
    apiUrl: string;
    errorCallback?: (error: any) => void;
}) => react_jsx_runtime.JSX.Element;

export { type BaseMetadata, type ErrorMessages, GamesocialProvider, type ICryptoRewardMetadata, type IDiscordJoinMetadata, type IImageUploadMetadata, type IManualMetadata, type IMission, type IMissionParticipation, type IMissionReward, type IOpenUrlMetadata, type IParticipant, type IParticipantTask, type IParticipation, type IPointsRewardMetadata, type ISubmitStringMetadata, type ITask, type ITelegramJoinMetadata, type ITwitchFollowMetadata, type ITwitterActivityMetadata, type ITwitterFollowMetadata, type ITwitterLikeMetadata, type ITwitterReplyMetadata, type ITwitterRepostMetadata, type IYoutubeSubscribeMetadata, type IYoutubeViewMetadata, MissionRewardType, MissionType, MissionsProvider, ParticipantMissionStatus, ParticipantProvider, ParticipantTaskStatus, QuestWebhookType, QuestsProvider, TaskButtonType, TaskProvider, TaskRewardType, TaskType, TaskValidation, TaskWrapper, ThirdPartyProvider, errorMessages, getCurrentHrefWithoutQueryParams, shouldRefetchParticipant, useGamesocial, useGamesocialState, useMissions, useMissionsState, useParticipant, useParticipantState, useTask, useTaskState };
