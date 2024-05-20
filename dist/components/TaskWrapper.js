var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx } from "react/jsx-runtime";
import { ParticipantTaskStatus } from "@/models/enums/participants.enum";
import { TaskButtonType } from "@/models/enums/task_button_type.enum";
import { TaskType } from "@/models/enums/tasks.enum";
import { TaskProvider, useTask } from "@/providers/task";
import { ThirdPartyAuthProvider, useThirdPartyAuth, } from "@/providers/third_party_auth";
import { useState } from "react";
import { ThirdPartyProvider } from "..";
const TaskWrapperBase = (props) => {
    var _a;
    const { task, participationDisabled, maintenance, children, callbacks, onSuccess, } = props;
    const [linkClicked, setLinkClicked] = useState(false);
    const { participate, isParticipationLoading } = useTask();
    const thirdPartyAuth = useThirdPartyAuth();
    const completed = task.participation &&
        task.participation.status === ParticipantTaskStatus.completed;
    const onLinkClick = () => __awaiter(void 0, void 0, void 0, function* () {
        switch (task.type) {
            case TaskType.discord_join:
                window.open(task.metadata.invite_url, "_blank");
                break;
            case TaskType.twitter_follow:
                window.open(`https://twitter.com/intent/follow?screen_name=${task.metadata.username}`, "_blank");
                break;
            case TaskType.twitter_like:
                window.open(task.metadata.post_url, "_blank");
                break;
            case TaskType.twitter_reply:
                window.open(task.metadata.post_url, "_blank");
                break;
            case TaskType.twitter_repost:
                window.open(`https://twitter.com/intent/retweet?tweet_id=${task.metadata.post_id}`, "_blank");
                break;
            case TaskType.telegram_join:
                window.open(`https://t.me/${task.metadata.username}`, "_blank");
                break;
            case TaskType.image_upload:
                const file = yield callbacks.onFileUpload(task);
                onParticipate({
                    file,
                });
                return;
            case TaskType.submit_string:
                const value = yield callbacks.onSubmitString(task);
                onParticipate({
                    value,
                });
                return;
            case TaskType.open_url:
                window.open(task.metadata.url, "_blank");
                break;
            case TaskType.youtube_view:
                const secondsWatched = yield callbacks.onYoutubeView(task, task.metadata.video_id);
                onParticipate({
                    seconds: secondsWatched,
                });
                return;
            case TaskType.daily_login:
                onParticipate();
                return;
            case TaskType.twitch_follow:
                window.open(task.metadata.twitch_url, "_blank");
                break;
            case TaskType.youtube_subscribe:
                window.open(task.metadata.channel_url, "_blank");
                break;
        }
        setLinkClicked(true);
    });
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
    const onParticipate = (body) => __awaiter(void 0, void 0, void 0, function* () {
        const resp = yield participate(task, body, onSuccess);
        if (!resp) {
            setLinkClicked(false);
        }
    });
    const handleClick = () => {
        if (participationDisabled || maintenance || completed) {
            return undefined;
        }
        if (!isAuthenticated()) {
            authenticate();
        }
        else if (linkClicked) {
            onParticipate();
        }
        else {
            onLinkClick();
        }
    };
    const getType = () => {
        var _a, _b;
        if (completed) {
            return TaskButtonType.COMPLETED;
        }
        if (!task.participation) {
            return TaskButtonType.NO_PARTICIPANT;
        }
        if (((_a = task.participation) === null || _a === void 0 ? void 0 : _a.status) === ParticipantTaskStatus.pending) {
            return TaskButtonType.PENDING;
        }
        if (((_b = task.participation) === null || _b === void 0 ? void 0 : _b.status) === ParticipantTaskStatus.failed) {
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
        if (task.type === TaskType.manual ||
            task.type === TaskType.twitter_activity) {
            return true;
        }
        return false;
    };
    return children({
        onClick: !noOnClick() ? handleClick : undefined,
        type: getType(),
        isLoading: thirdPartyAuth.isLoading || isParticipationLoading,
        disabled: participationDisabled || maintenance,
        comment: (_a = task.participation) === null || _a === void 0 ? void 0 : _a.comment,
    });
};
const TaskWrapper = (props) => {
    const { task, participationDisabled, maintenance, errorCallback, onSuccess } = props;
    return (_jsx(TaskProvider, { errorCallback: errorCallback, children: _jsx(ThirdPartyAuthProvider, { errorCallback: errorCallback, children: _jsx(TaskWrapperBase, { task: task, participationDisabled: participationDisabled, maintenance: maintenance, callbacks: props.callbacks, onSuccess: onSuccess, children: props.children }) }) }));
};
export default TaskWrapper;
//# sourceMappingURL=TaskWrapper.js.map