import { ParticipantTaskStatus } from "@/models/enums/participants.enum";
import { TaskButtonType } from "@/models/enums/task_button_type.enum";
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
import {
  ThirdPartyAuthProvider,
  useThirdPartyAuth,
} from "@/providers/third_party_auth";

import { useState } from "react";
import { ThirdPartyProvider } from "..";

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

const TaskWrapperBase = (props: Props) => {
  const {
    task,
    participationDisabled,
    maintenance,
    children,
    callbacks,
    onSuccess,
  } = props;
  const [linkClicked, setLinkClicked] = useState<boolean>(false);

  const { participate, isParticipationLoading } = useTask();

  const thirdPartyAuth = useThirdPartyAuth();

  const completed =
    task.participation &&
    task.participation.status === ParticipantTaskStatus.completed;

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
        return thirdPartyAuth.isAuthenticated(ThirdPartyProvider.discord);
      case TaskType.twitter_connect:
      case TaskType.twitter_follow:
      case TaskType.twitter_like:
      case TaskType.twitter_reply:
      case TaskType.twitter_repost:
        return thirdPartyAuth.isAuthenticated(ThirdPartyProvider.twitter);
      case TaskType.telegram_connect:
      case TaskType.telegram_join:
        return thirdPartyAuth.isAuthenticated(ThirdPartyProvider.telegram);
      default:
        return true;
    }
  };

  const authenticate = () => {
    switch (task.type) {
      case TaskType.discord_connect:
      case TaskType.discord_join:
        return thirdPartyAuth.authenticate(ThirdPartyProvider.discord);
      case TaskType.twitter_connect:
      case TaskType.twitter_follow:
      case TaskType.twitter_like:
      case TaskType.twitter_reply:
      case TaskType.twitter_repost:
        return thirdPartyAuth.authenticate(ThirdPartyProvider.twitter);
      case TaskType.telegram_connect:
      case TaskType.telegram_join:
        return thirdPartyAuth.authenticate(ThirdPartyProvider.telegram);
    }
  };

  const onParticipate = async (body?: any) => {
    const resp = await participate(task, body, onSuccess);
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

    if (!task.participation) {
      return TaskButtonType.NO_PARTICIPANT;
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

    return TaskButtonType.AUTH_REQUIRED;
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
    isLoading: thirdPartyAuth.isLoading || isParticipationLoading,
    disabled: participationDisabled || maintenance,
    comment: task.participation?.comment,
  });
};

const TaskWrapper = (props: Props) => {
  const { task, participationDisabled, maintenance, errorCallback, onSuccess } =
    props;
  return (
    <TaskProvider errorCallback={errorCallback}>
      <ThirdPartyAuthProvider errorCallback={errorCallback}>
        <TaskWrapperBase
          task={task}
          participationDisabled={participationDisabled}
          maintenance={maintenance}
          callbacks={props.callbacks}
          onSuccess={onSuccess}
        >
          {props.children}
        </TaskWrapperBase>
      </ThirdPartyAuthProvider>
    </TaskProvider>
  );
};

export default TaskWrapper;
