import { ParticipantTaskStatus } from "@/models/enums/participants.enum";
import { TaskButtonType } from "@/models/enums/task_button_type";
import { TaskType } from "@/models/enums/tasks.enum";
import {
  IDiscordJoinMetadata,
  IOpenUrlMetadata,
  ITask,
  ITelegramJoinMetadata,
  ITwitchFollowMetadata,
  ITwitterFollowMetadata,
  ITwitterLikeMetadata,
  ITwitterReplyMetadata,
  ITwitterRepostMetadata,
  IYoutubeSubscribeMetadata,
  IYoutubeViewMetadata,
} from "@/models/interfaces/task";
import { TaskProvider, useTask } from "@/providers/task";
import { DiscordProvider, useDiscord } from "@/providers/tasks/discord";
import { TelegramProvider, useTelegram } from "@/providers/tasks/telegram";
import { TwitterProvider, useTwitter } from "@/providers/tasks/twitter";

import { useState } from "react";

interface TaskCallbacks {
  onYoutubeView: (task: ITask, videoId: string) => Promise<number>;
  onFileUpload: (task: ITask) => Promise<string>;
  onSubmitString: (task: ITask) => Promise<string>;
}

type Props = {
  task: ITask;
  participationDisabled: boolean;
  maintenance: boolean;
  completed: boolean;
  children: (props: {
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    type: TaskButtonType;
    isLoading?: boolean;
    disabled?: boolean;
    comment: string | null | undefined;
  }) => React.ReactElement;
  callbacks: TaskCallbacks;
};

const TaskWrapperBase = (props: Props) => {
  const {
    task,
    participationDisabled,
    maintenance,
    completed,
    children,
    callbacks,
  } = props;
  const [linkClicked, setLinkClicked] = useState<boolean>(false);

  //   const { openFileUploadModal, openYoutubeModal, openSubmitStringModal } =
  //     useModal();

  const { participate, isParticipationLoading } = useTask();

  const discord = useDiscord();
  const twitter = useTwitter();
  const telegram = useTelegram();

  const onLinkClick = async () => {
    switch (task.type) {
      case TaskType.discord_join:
        window.open(
          (task.metadata as IDiscordJoinMetadata).invite_url,
          "_blank"
        );
        break;
      case TaskType.twitter_follow:
        window.open(
          `https://twitter.com/intent/follow?screen_name=${
            (task.metadata as ITwitterFollowMetadata).username
          }`,
          "_blank"
        );
        break;
      case TaskType.twitter_like:
        window.open((task.metadata as ITwitterLikeMetadata).post_url, "_blank");
        break;
      case TaskType.twitter_reply:
        window.open(
          (task.metadata as ITwitterReplyMetadata).post_url,
          "_blank"
        );
        break;
      case TaskType.twitter_repost:
        window.open(
          `https://twitter.com/intent/retweet?tweet_id=${
            (task.metadata as ITwitterRepostMetadata).post_id
          }`,
          "_blank"
        );
        break;
      case TaskType.telegram_join:
        window.open(
          `https://t.me/${(task.metadata as ITelegramJoinMetadata).username}`,
          "_blank"
        );
        break;
      case TaskType.image_upload:
        const file = await callbacks.onFileUpload(task);
        onParticipate({
          file,
        });
        return;
      case TaskType.submit_string:
        const value = await callbacks.onSubmitString(task);
        onParticipate({
          value,
        });
        return;
      case TaskType.open_url:
        window.open((task.metadata as IOpenUrlMetadata).url, "_blank");
        break;
      case TaskType.youtube_view:
        const secondsWatched = await callbacks.onYoutubeView(
          task,
          (task.metadata as IYoutubeViewMetadata).video_id
        );
        onParticipate({
          seconds: secondsWatched,
        });
        return;
      case TaskType.daily_login:
        onParticipate();
        return;
      case TaskType.twitch_follow:
        window.open(
          (task.metadata as ITwitchFollowMetadata).twitch_url,
          "_blank"
        );
        break;
      case TaskType.youtube_subscribe:
        window.open(
          (task.metadata as IYoutubeSubscribeMetadata).channel_url,
          "_blank"
        );
        break;
    }

    setLinkClicked(true);
  };

  const isAuthenticated = () => {
    switch (task.type) {
      case TaskType.discord_connect:
      case TaskType.discord_join:
        return discord.isAuthenticated;
      case TaskType.twitter_connect:
      case TaskType.twitter_follow:
      case TaskType.twitter_like:
      case TaskType.twitter_reply:
      case TaskType.twitter_repost:
        return twitter.isAuthenticated;
      case TaskType.telegram_connect:
      case TaskType.telegram_join:
        return telegram.isAuthenticated;
      case TaskType.manual:
      case TaskType.image_upload:
      case TaskType.youtube_view:
      case TaskType.submit_string:
      case TaskType.daily_login:
      case TaskType.twitter_activity:
      case TaskType.open_url:
      case TaskType.youtube_subscribe:
      case TaskType.twitch_follow:
        return true;
    }
  };

  const isLoading = () => {
    switch (task.type) {
      case TaskType.discord_connect:
      case TaskType.discord_join:
        return discord.isLoading;
      case TaskType.twitter_connect:
      case TaskType.twitter_activity:
      case TaskType.twitter_follow:
      case TaskType.twitter_like:
      case TaskType.twitter_reply:
      case TaskType.twitter_repost:
        return twitter.isLoading;
      case TaskType.telegram_connect:
      case TaskType.telegram_join:
        return telegram.isLoading;
    }
  };

  const authenticate = () => {
    switch (task.type) {
      case TaskType.discord_connect:
      case TaskType.discord_join:
        return discord.authenticate();
      case TaskType.twitter_connect:
      case TaskType.twitter_follow:
      case TaskType.twitter_like:
      case TaskType.twitter_reply:
      case TaskType.twitter_repost:
        return twitter.authenticate();
      case TaskType.telegram_connect:
      case TaskType.telegram_join:
        return telegram.authenticate();
    }
  };

  const onParticipate = async (body?: any) => {
    const resp = await participate(task, body);
    if (!resp) {
      setLinkClicked(false);
    }
  };

  const handleClick = () => {
    if (participationDisabled || maintenance || completed) {
      return undefined;
    }

    if (!isAuthenticated()) {
      authenticate();
    } else if (linkClicked) {
      onParticipate();
    } else {
      onLinkClick();
    }
  };

  const getType = () => {
    if (completed) {
      return TaskButtonType.COMPLETED;
    }

    if (task.participation?.status === ParticipantTaskStatus.pending) {
      return TaskButtonType.PENDING;
    }

    if (task.participation?.status === ParticipantTaskStatus.failed) {
      return TaskButtonType.FAILED;
    }

    if (linkClicked) {
      return TaskButtonType.CLAIM;
    }

    if (isAuthenticated()) {
      return TaskButtonType.START;
    }

    return TaskButtonType.NO_PARTICIPANT;
  };
  const noOnClick = () => {
    if (completed || maintenance || participationDisabled) {
      return true;
    }
    if (
      task.type === TaskType.manual ||
      task.type === TaskType.twitter_activity
    ) {
      return true;
    }
    return false;
  };
  return children({
    onClick: !noOnClick() ? handleClick : undefined,
    type: getType(),
    isLoading: isLoading() || isParticipationLoading,
    disabled: participationDisabled || maintenance,
    comment: task.participation?.comment,
  });
};

const TaskWrapper = (props: Props) => {
  const { task, participationDisabled, maintenance, completed } = props;
  return (
    <TaskProvider>
      <DiscordProvider>
        <TwitterProvider>
          <TelegramProvider>
            <TaskWrapperBase
              task={task}
              participationDisabled={participationDisabled}
              maintenance={maintenance}
              completed={completed || false}
              callbacks={props.callbacks}
            >
              {props.children}
            </TaskWrapperBase>
          </TelegramProvider>
        </TwitterProvider>
      </DiscordProvider>
    </TaskProvider>
  );
};

export default TaskWrapper;
