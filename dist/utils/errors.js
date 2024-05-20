export const errorMessages = {
    discord_not_connected: "Discord account is not connected",
    discord_guild_user_not_found: "Discord user not found in channel ",
    discord_guild_required_role_not_exists: "Discord channel verification must be passed",
    discord_guild_user_is_pending: "Please validate that your accepted Terms of Discord channel",
    discord_unauthenticated: "Please re-authenticate your discord account",
    telegram_not_connected: "Telegram account is not connected",
    telegram_member_not_found: "Telegram account not found in group",
    telegram_unauthenticated: "Please re-authenticate your telegram account",
    twitter_not_connected: "X account is not connected",
    twitter_follower_not_found: "Your X account do not follow required account",
    twitter_unauthenticated: "Please re-authenticate your X account",
    youtube_invalid_video_watch_length: "Please watch whole video",
    file_not_provided: "File not provided",
    file_size_exceeds: "File size exceeds limit",
    invalid_file_type: "Invalid file type",
    mission_not_found: "Mission not found",
    mission_not_started: "Mission not started",
    mission_ended: "Mission ended",
    task_not_found: "Task not found",
    task_inactive: "Task inactive",
    participant_not_found: "Participant not found",
    third_party_unauthenticated: "Please re-authenticate your account",
    invalid_email: "Invalid email address",
    invalid_value: "Invalid value",
    invalid_captcha: "Invalid captcha",
};
export const shouldRefetchParticipant = (error) => {
    return (error === errorMessages.discord_unauthenticated ||
        error === errorMessages.telegram_unauthenticated ||
        error === errorMessages.twitter_unauthenticated);
};
//# sourceMappingURL=errors.js.map