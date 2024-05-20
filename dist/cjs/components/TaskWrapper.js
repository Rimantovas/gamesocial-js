"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var participants_enum_1 = require("@/models/enums/participants.enum");
var task_button_type_enum_1 = require("@/models/enums/task_button_type.enum");
var tasks_enum_1 = require("@/models/enums/tasks.enum");
var task_1 = require("@/providers/task");
var third_party_auth_1 = require("@/providers/third_party_auth");
var third_party_enum_1 = require("@/models/enums/third_party.enum");
var react_1 = require("react");
var TaskWrapperBase = function (props) {
    var _a;
    var task = props.task, participationDisabled = props.participationDisabled, maintenance = props.maintenance, children = props.children, callbacks = props.callbacks, onSuccess = props.onSuccess;
    var _b = (0, react_1.useState)(false), linkClicked = _b[0], setLinkClicked = _b[1];
    var _c = (0, task_1.useTask)(), participate = _c.participate, isParticipationLoading = _c.isParticipationLoading;
    var thirdPartyAuth = (0, third_party_auth_1.useThirdPartyAuth)();
    var completed = task.participation &&
        task.participation.status === participants_enum_1.ParticipantTaskStatus.completed;
    var onLinkClick = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, file, value, secondsWatched;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = task.type;
                    switch (_a) {
                        case tasks_enum_1.TaskType.discord_join: return [3 /*break*/, 1];
                        case tasks_enum_1.TaskType.twitter_follow: return [3 /*break*/, 2];
                        case tasks_enum_1.TaskType.twitter_like: return [3 /*break*/, 3];
                        case tasks_enum_1.TaskType.twitter_reply: return [3 /*break*/, 4];
                        case tasks_enum_1.TaskType.twitter_repost: return [3 /*break*/, 5];
                        case tasks_enum_1.TaskType.telegram_join: return [3 /*break*/, 6];
                        case tasks_enum_1.TaskType.image_upload: return [3 /*break*/, 7];
                        case tasks_enum_1.TaskType.submit_string: return [3 /*break*/, 9];
                        case tasks_enum_1.TaskType.open_url: return [3 /*break*/, 11];
                        case tasks_enum_1.TaskType.youtube_view: return [3 /*break*/, 12];
                        case tasks_enum_1.TaskType.daily_login: return [3 /*break*/, 14];
                        case tasks_enum_1.TaskType.twitch_follow: return [3 /*break*/, 15];
                        case tasks_enum_1.TaskType.youtube_subscribe: return [3 /*break*/, 16];
                    }
                    return [3 /*break*/, 17];
                case 1:
                    window.open(task.metadata.invite_url, "_blank");
                    return [3 /*break*/, 17];
                case 2:
                    window.open("https://twitter.com/intent/follow?screen_name=".concat(task.metadata.username), "_blank");
                    return [3 /*break*/, 17];
                case 3:
                    window.open(task.metadata.post_url, "_blank");
                    return [3 /*break*/, 17];
                case 4:
                    window.open(task.metadata.post_url, "_blank");
                    return [3 /*break*/, 17];
                case 5:
                    window.open("https://twitter.com/intent/retweet?tweet_id=".concat(task.metadata.post_id), "_blank");
                    return [3 /*break*/, 17];
                case 6:
                    window.open("https://t.me/".concat(task.metadata.username), "_blank");
                    return [3 /*break*/, 17];
                case 7: return [4 /*yield*/, callbacks.onFileUpload(task)];
                case 8:
                    file = _b.sent();
                    onParticipate({
                        file: file,
                    });
                    return [2 /*return*/];
                case 9: return [4 /*yield*/, callbacks.onSubmitString(task)];
                case 10:
                    value = _b.sent();
                    onParticipate({
                        value: value,
                    });
                    return [2 /*return*/];
                case 11:
                    window.open(task.metadata.url, "_blank");
                    return [3 /*break*/, 17];
                case 12: return [4 /*yield*/, callbacks.onYoutubeView(task, task.metadata.video_id)];
                case 13:
                    secondsWatched = _b.sent();
                    onParticipate({
                        seconds: secondsWatched,
                    });
                    return [2 /*return*/];
                case 14:
                    onParticipate();
                    return [2 /*return*/];
                case 15:
                    window.open(task.metadata.twitch_url, "_blank");
                    return [3 /*break*/, 17];
                case 16:
                    window.open(task.metadata.channel_url, "_blank");
                    return [3 /*break*/, 17];
                case 17:
                    setLinkClicked(true);
                    return [2 /*return*/];
            }
        });
    }); };
    var isAuthenticated = function () {
        switch (task.type) {
            case tasks_enum_1.TaskType.discord_connect:
            case tasks_enum_1.TaskType.discord_join:
                return thirdPartyAuth.isAuthenticated(third_party_enum_1.ThirdPartyProvider.discord);
            case tasks_enum_1.TaskType.twitter_connect:
            case tasks_enum_1.TaskType.twitter_follow:
            case tasks_enum_1.TaskType.twitter_like:
            case tasks_enum_1.TaskType.twitter_reply:
            case tasks_enum_1.TaskType.twitter_repost:
                return thirdPartyAuth.isAuthenticated(third_party_enum_1.ThirdPartyProvider.twitter);
            case tasks_enum_1.TaskType.telegram_connect:
            case tasks_enum_1.TaskType.telegram_join:
                return thirdPartyAuth.isAuthenticated(third_party_enum_1.ThirdPartyProvider.telegram);
            default:
                return true;
        }
    };
    var authenticate = function () {
        switch (task.type) {
            case tasks_enum_1.TaskType.discord_connect:
            case tasks_enum_1.TaskType.discord_join:
                return thirdPartyAuth.authenticate(third_party_enum_1.ThirdPartyProvider.discord);
            case tasks_enum_1.TaskType.twitter_connect:
            case tasks_enum_1.TaskType.twitter_follow:
            case tasks_enum_1.TaskType.twitter_like:
            case tasks_enum_1.TaskType.twitter_reply:
            case tasks_enum_1.TaskType.twitter_repost:
                return thirdPartyAuth.authenticate(third_party_enum_1.ThirdPartyProvider.twitter);
            case tasks_enum_1.TaskType.telegram_connect:
            case tasks_enum_1.TaskType.telegram_join:
                return thirdPartyAuth.authenticate(third_party_enum_1.ThirdPartyProvider.telegram);
        }
    };
    var onParticipate = function (body) { return __awaiter(void 0, void 0, void 0, function () {
        var resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, participate(task, body, onSuccess)];
                case 1:
                    resp = _a.sent();
                    if (!resp) {
                        setLinkClicked(false);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var handleClick = function () {
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
    var getType = function () {
        var _a, _b;
        if (completed) {
            return task_button_type_enum_1.TaskButtonType.COMPLETED;
        }
        if (!task.participation) {
            return task_button_type_enum_1.TaskButtonType.NO_PARTICIPANT;
        }
        if (((_a = task.participation) === null || _a === void 0 ? void 0 : _a.status) === participants_enum_1.ParticipantTaskStatus.pending) {
            return task_button_type_enum_1.TaskButtonType.PENDING;
        }
        if (((_b = task.participation) === null || _b === void 0 ? void 0 : _b.status) === participants_enum_1.ParticipantTaskStatus.failed) {
            return task_button_type_enum_1.TaskButtonType.FAILED;
        }
        if (linkClicked) {
            return task_button_type_enum_1.TaskButtonType.CLAIM;
        }
        if (isAuthenticated()) {
            return task_button_type_enum_1.TaskButtonType.START;
        }
        return task_button_type_enum_1.TaskButtonType.AUTH_REQUIRED;
    };
    var noOnClick = function () {
        if (completed || maintenance || participationDisabled) {
            return true;
        }
        if (task.type === tasks_enum_1.TaskType.manual ||
            task.type === tasks_enum_1.TaskType.twitter_activity) {
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
var TaskWrapper = function (props) {
    var task = props.task, participationDisabled = props.participationDisabled, maintenance = props.maintenance, errorCallback = props.errorCallback, onSuccess = props.onSuccess;
    return ((0, jsx_runtime_1.jsx)(task_1.TaskProvider, { errorCallback: errorCallback, children: (0, jsx_runtime_1.jsx)(third_party_auth_1.ThirdPartyAuthProvider, { errorCallback: errorCallback, children: (0, jsx_runtime_1.jsx)(TaskWrapperBase, { task: task, participationDisabled: participationDisabled, maintenance: maintenance, callbacks: props.callbacks, onSuccess: onSuccess, children: props.children }) }) }));
};
exports.default = TaskWrapper;
//# sourceMappingURL=TaskWrapper.js.map