export type ErrorMessages = {
  [key: string]: string;
};

export const errorMessages: ErrorMessages = {
  discord_not_connected: "Discord account is not connected",
  discord_guild_user_not_found: "Discord user not found in channel ",
  discord_guild_required_role_not_exists:
    "Discord channel verification must be passed",
  discord_guild_user_is_pending:
    "Please validate that your accepted Terms of Discord channel",
  telegram_not_connected: "Telegram account is not connected",
  telegram_member_not_found: "Telegram account not found in group",
  twitter_not_connected: "Twitter account is not connected",
  twitter_follower_not_found:
    "Your twitter account do not follow required account",
  youtube_invalid_video_watch_length: "Please watch whole video",
  invalid_email: "Invalid email address",
};
