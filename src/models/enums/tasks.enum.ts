import { ITask } from "../interfaces/task";

export enum TaskType {
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
  twitch_follow = "twitch_follow",
}

export const showTooltipForTask = (task: ITask): boolean => {
  switch (task.type) {
    case TaskType.telegram_join:
    case TaskType.telegram_connect:
    case TaskType.youtube_view:
    case TaskType.image_upload:
    case TaskType.twitter_repost:
    case TaskType.twitter_follow:
    case TaskType.twitter_reply:
    case TaskType.twitter_like:
    case TaskType.twitter_connect:
    case TaskType.discord_join:
    case TaskType.discord_connect:
    case TaskType.submit_string:
    case TaskType.daily_login:
    case TaskType.open_url:
    case TaskType.youtube_subscribe:
    case TaskType.twitch_follow:
      return false;
    case TaskType.manual:
      return task.metadata.identifier === "referral";
    case TaskType.twitter_activity:
      return true;
    default:
      return false;
  }
};
