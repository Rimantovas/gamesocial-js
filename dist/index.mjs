var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/models/enums/participants.enum.ts
var ParticipantTaskStatus = /* @__PURE__ */ ((ParticipantTaskStatus2) => {
  ParticipantTaskStatus2["created"] = "created";
  ParticipantTaskStatus2["pending"] = "pending";
  ParticipantTaskStatus2["completed"] = "completed";
  ParticipantTaskStatus2["failed"] = "failed";
  return ParticipantTaskStatus2;
})(ParticipantTaskStatus || {});
var ParticipantMissionStatus = /* @__PURE__ */ ((ParticipantMissionStatus2) => {
  ParticipantMissionStatus2["created"] = "created";
  ParticipantMissionStatus2["started"] = "started";
  ParticipantMissionStatus2["completed"] = "completed";
  ParticipantMissionStatus2["failed"] = "failed";
  return ParticipantMissionStatus2;
})(ParticipantMissionStatus || {});

// src/models/enums/task_button_type.enum.ts
var TaskButtonType = /* @__PURE__ */ ((TaskButtonType2) => {
  TaskButtonType2["NO_PARTICIPANT"] = "NO_PARTICIPANT";
  TaskButtonType2["START"] = "START";
  TaskButtonType2["CLAIM"] = "CLAIM";
  TaskButtonType2["PENDING"] = "PENDING";
  TaskButtonType2["COMPLETED"] = "COMPLETED";
  TaskButtonType2["FAILED"] = "FAILED";
  TaskButtonType2["AUTH_REQUIRED"] = "AUTH_REQUIRED";
  return TaskButtonType2;
})(TaskButtonType || {});

// src/models/enums/tasks.enum.ts
var TaskType = /* @__PURE__ */ ((TaskType2) => {
  TaskType2["telegram_join"] = "telegram_join";
  TaskType2["telegram_connect"] = "telegram_connect";
  TaskType2["youtube_view"] = "youtube_view";
  TaskType2["image_upload"] = "image_upload";
  TaskType2["twitter_repost"] = "twitter_repost";
  TaskType2["twitter_follow"] = "twitter_follow";
  TaskType2["twitter_reply"] = "twitter_reply";
  TaskType2["twitter_like"] = "twitter_like";
  TaskType2["twitter_activity"] = "twitter_activity";
  TaskType2["twitter_connect"] = "twitter_connect";
  TaskType2["discord_join"] = "discord_join";
  TaskType2["discord_connect"] = "discord_connect";
  TaskType2["submit_string"] = "submit_string";
  TaskType2["manual"] = "manual";
  TaskType2["daily_login"] = "daily_login";
  TaskType2["open_url"] = "open_url";
  TaskType2["youtube_subscribe"] = "youtube_subscribe";
  TaskType2["twitch_follow"] = "twitch_follow";
  return TaskType2;
})(TaskType || {});

// src/providers/task.tsx
import { createContext as createContext4, useContext as useContext4, useState as useState5 } from "react";

// src/providers/gamesocial.tsx
import { createContext, useCallback, useContext, useState } from "react";
import { jsx } from "react/jsx-runtime";
var context = createContext({
  apiUrl: "",
  apiKey: "",
  authToken: void 0,
  setAuthToken: () => {
  }
});
var useGamesocial = () => useContext(context);
function GamesocialProvider({
  children,
  state,
  apiKey,
  apiUrl
}) {
  state != null ? state : state = useGamesocialState(apiKey, apiUrl);
  return /* @__PURE__ */ jsx(context.Provider, { value: state, children });
}
var useGamesocialState = (apiKey, apiUrl) => {
  const [config, setConfig] = useState({
    apiUrl,
    apiKey,
    userAuthToken: void 0
  });
  const authToken = config.userAuthToken;
  const setAuthToken = useCallback((token) => {
    setConfig((prev) => __spreadProps(__spreadValues({}, prev), {
      userAuthToken: token
    }));
  }, []);
  return {
    apiUrl,
    apiKey,
    authToken,
    setAuthToken
  };
};

// src/hooks/useApi.ts
import axios from "axios";
import { useEffect, useState as useState2 } from "react";
var useApi = () => {
  const { authToken, apiUrl, apiKey } = useGamesocial();
  const createApi = () => {
    const api2 = axios.create({
      baseURL: apiUrl,
      timeout: 1e4,
      headers: {
        "Api-Key": apiKey,
        "Api-Version": "1.0"
      }
    });
    api2.interceptors.request.use(
      (config) => {
        const token = authToken;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    api2.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token");
        }
        return Promise.reject(error);
      }
    );
    return api2;
  };
  const [api, setApi] = useState2(createApi());
  useEffect(() => {
    setApi(createApi());
  }, [apiUrl, apiKey, authToken]);
  return api;
};

// src/utils/errors.ts
var errorMessages = {
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
  invalid_captcha: "Invalid captcha"
};
var shouldRefetchParticipant = (error) => {
  return error === errorMessages.discord_unauthenticated || error === errorMessages.telegram_unauthenticated || error === errorMessages.twitter_unauthenticated;
};

// src/providers/missions.tsx
import {
  createContext as createContext2,
  useCallback as useCallback2,
  useContext as useContext2,
  useEffect as useEffect2,
  useState as useState3
} from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
var context2 = createContext2({
  missions: [],
  tasks: [],
  getTasksForMission: () => [],
  updateTaskStatus: () => {
  },
  maintenance: false
});
var useMissions = () => useContext2(context2);
function MissionsProvider({
  children,
  state
}) {
  state != null ? state : state = useMissionsState();
  return /* @__PURE__ */ jsx2(context2.Provider, { value: state, children });
}
var useMissionsState = () => {
  const [missions, setMissions] = useState3([]);
  const [tasks, setTasks] = useState3([]);
  const { authToken } = useGamesocial();
  const api = useApi();
  const [maintenance, setMaintenance] = useState3(false);
  useEffect2(() => {
    getMissions();
  }, [authToken]);
  useEffect2(() => {
    if (missions.length > 0) {
      getTasks(missions.map((m) => m.id));
    }
  }, [missions]);
  useEffect2(() => {
    if (authToken && authToken.length === 0) {
      setMaintenance(true);
    }
  }, [authToken]);
  const getMissions = () => {
    api.get("missions").then(function(response) {
      setMissions(response.data);
    }).catch(function() {
      setMaintenance(true);
    }).finally(function() {
    });
  };
  const getTasks = (missionIds) => {
    const promises = missionIds.map((id) => api.get(`missions/${id}/tasks`));
    Promise.all(promises).then(function(responses) {
      const validTypes = new Set(Object.values(TaskType));
      const tasks2 = responses.map((r) => r.data).flat().filter((t) => validTypes.has(t.type));
      setTasks(tasks2);
    }).catch(function() {
      setMaintenance(true);
    });
  };
  const updateTaskStatus = (taskId, status) => {
    setTasks(
      tasks.map(
        (task) => task.id === taskId ? __spreadProps(__spreadValues({}, task), { participation: { status } }) : task
      )
    );
  };
  const getTasksForMission = useCallback2(
    (missionId) => {
      return tasks.filter((t) => t.mission_id === missionId);
    },
    [tasks]
  );
  return {
    missions,
    tasks,
    getTasksForMission,
    updateTaskStatus,
    maintenance
  };
};

// src/providers/participant.tsx
import { createContext as createContext3, useContext as useContext3, useEffect as useEffect3, useState as useState4 } from "react";

// src/models/enums/task_reward_type.enum.ts
var TaskRewardType = /* @__PURE__ */ ((TaskRewardType2) => {
  TaskRewardType2["points"] = "points";
  TaskRewardType2["multiplier"] = "multiplier";
  return TaskRewardType2;
})(TaskRewardType || {});

// src/providers/participant.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
var context3 = createContext3({
  participant: void 0,
  isThirdPartyAuthenticated: () => false,
  addPoints: () => {
  },
  getParticipant: () => {
  }
});
var useParticipant = () => useContext3(context3);
function ParticipantProvider({
  children,
  state,
  errorCallback
}) {
  state != null ? state : state = useParticipantState(errorCallback);
  return /* @__PURE__ */ jsx3(context3.Provider, { value: state, children });
}
var useParticipantState = (errorCallback) => {
  const [participant, setParticipant] = useState4();
  const { authToken } = useGamesocial();
  const api = useApi();
  useEffect3(() => {
    if (authToken) {
      getParticipant();
    } else {
      setParticipant(void 0);
    }
  }, [authToken]);
  const getParticipant = () => {
    api.get(`participants/me`).then(function(response) {
      setParticipant(response.data);
    }).catch(function(error) {
      console.error(error);
      errorCallback && errorCallback(error);
    });
  };
  const isThirdPartyAuthenticated = (thirdParty) => {
    return !!(participant == null ? void 0 : participant.authenticated.includes(thirdParty));
  };
  const addPoints = (task) => {
    if (!task.points_reward)
      return;
    setParticipant((prev) => {
      var _a;
      if (!prev)
        return void 0;
      if (task.reward_type === "points" /* points */) {
        const points = Math.floor(
          task.points_reward * ((_a = participant == null ? void 0 : participant.points_multiplier) != null ? _a : 1)
        );
        setParticipant((prev2) => {
          if (!prev2)
            return void 0;
          return __spreadProps(__spreadValues({}, prev2), {
            points: (prev2 == null ? void 0 : prev2.points) + points
          });
        });
      } else {
        setParticipant((prev2) => {
          if (!prev2)
            return void 0;
          return __spreadProps(__spreadValues({}, prev2), {
            points_multiplier: (prev2 == null ? void 0 : prev2.points_multiplier) + task.points_reward
          });
        });
      }
    });
  };
  return {
    participant,
    isThirdPartyAuthenticated,
    addPoints,
    getParticipant
  };
};

// src/providers/task.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
var context4 = createContext4({
  isParticipationLoading: false,
  participate: () => Promise.resolve(false)
});
var useTask = () => useContext4(context4);
function TaskProvider({
  children,
  state,
  errorCallback
}) {
  state != null ? state : state = useTaskState(errorCallback);
  return /* @__PURE__ */ jsx4(context4.Provider, { value: state, children });
}
var useTaskState = (errorCallback) => {
  const [isParticipationLoading, setIsParticipationLoading] = useState5(false);
  const { updateTaskStatus } = useMissions();
  const { addPoints, getParticipant } = useParticipant();
  const api = useApi();
  const handleError = (e) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    let message = "";
    if ((_b = (_a = e == null ? void 0 : e.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) {
      if (typeof ((_d = (_c = e == null ? void 0 : e.response) == null ? void 0 : _c.data) == null ? void 0 : _d.message) === "string") {
        message = (_f = (_e = e == null ? void 0 : e.response) == null ? void 0 : _e.data) == null ? void 0 : _f.message.toString();
      } else {
      }
    } else if ((_g = e == null ? void 0 : e.response) == null ? void 0 : _g.message) {
      message = (_h = e == null ? void 0 : e.response) == null ? void 0 : _h.message.toString();
    }
    if (!message) {
      errorCallback && errorCallback("Server error, please try again later");
    } else {
      if (message in errorMessages) {
        const s = shouldRefetchParticipant(message);
        if (s) {
          getParticipant();
        }
        errorCallback && errorCallback(errorMessages[message]);
      } else {
        errorCallback && errorCallback(message);
      }
    }
  };
  const participate = (task, body, callback) => __async(void 0, null, function* () {
    setIsParticipationLoading(true);
    let data = __spreadValues({}, body);
    if (body == null ? void 0 : body.file) {
      const base64 = yield fetch(body.file).then((response) => response.blob()).then((blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        return new Promise((res) => {
          reader.onloadend = () => {
            res(reader.result);
          };
        });
      });
      data = __spreadProps(__spreadValues({}, body), {
        file: {
          imageSrc: base64
        }
      });
    }
    yield api.post(`tasks/${task.id}`, body ? data : void 0).then(function(response) {
      updateTaskStatus(task.id, response.data.status);
      if (response.data.status === "completed" /* completed */ && task.points_reward) {
        addPoints(task);
      }
      if (callback) {
        callback();
      }
      return true;
    }).catch(function(error) {
      handleError(error);
    }).finally(function() {
      setIsParticipationLoading(false);
    });
    return false;
  });
  return {
    isParticipationLoading,
    participate
  };
};

// src/models/enums/third_party.enum.ts
var ThirdPartyProvider = /* @__PURE__ */ ((ThirdPartyProvider2) => {
  ThirdPartyProvider2["twitter"] = "twitter";
  ThirdPartyProvider2["telegram"] = "telegram";
  ThirdPartyProvider2["discord"] = "discord";
  return ThirdPartyProvider2;
})(ThirdPartyProvider || {});

// src/utils/utils.ts
var getCurrentHrefWithoutQueryParams = () => {
  const url = new URL(window.location.href);
  url.search = "";
  return url.href;
};

// src/providers/third_party_auth.tsx
import { createContext as createContext5, useContext as useContext5, useEffect as useEffect4, useState as useState6 } from "react";
import { jsx as jsx5 } from "react/jsx-runtime";
var defaultProviderStatus = Object.fromEntries(
  Object.values(ThirdPartyProvider).map((provider) => [provider, false])
);
var context5 = createContext5({
  isLoading: false,
  authenticated: defaultProviderStatus,
  authenticate: () => ({}),
  isAuthenticated: () => false
});
var useThirdPartyAuth = () => useContext5(context5);
function ThirdPartyAuthProvider({
  children,
  state,
  errorCallback
}) {
  state != null ? state : state = useThirdPartyAuthState(errorCallback);
  return /* @__PURE__ */ jsx5(context5.Provider, { value: state, children });
}
var useThirdPartyAuthState = (errorCallback) => {
  const [authenticated, setAuthenticated] = useState6(
    defaultProviderStatus
  );
  const [isLoading, setIsLoading] = useState6(false);
  const { participant } = useParticipant();
  const api = useApi();
  useEffect4(() => {
    const newStatus = Object.fromEntries(
      Object.values(ThirdPartyProvider).map((provider) => [
        provider,
        !!(participant == null ? void 0 : participant.authenticated.includes(provider))
      ])
    );
    setAuthenticated(newStatus);
  }, [participant]);
  const isAuthenticated = (provider) => {
    return authenticated[provider] || false;
  };
  const authenticate = (provider) => {
    setIsLoading(true);
    api.get(`auth/${provider}`, {
      params: {
        redirect_url: getCurrentHrefWithoutQueryParams()
      }
    }).then(function(response) {
      if (response.data.url) {
        if (response.data.url.includes("?error=")) {
          throw new Error(
            "Failed to authenticate with ThirdPartyAuth: " + response.data.url.split("?error=")[1]
          );
        }
        window.location.href = response.data.url;
      }
    }).catch(function(error) {
      console.error(error);
      errorCallback && errorCallback(error);
    }).finally(() => {
      setIsLoading(false);
    });
  };
  return {
    isLoading,
    authenticated,
    authenticate,
    isAuthenticated
  };
};

// src/components/TaskWrapper.tsx
import { useState as useState7 } from "react";
import { jsx as jsx6 } from "react/jsx-runtime";
var TaskWrapperBase = (props) => {
  var _a;
  const {
    task,
    participationDisabled,
    maintenance,
    children,
    callbacks,
    onSuccess
  } = props;
  const [linkClicked, setLinkClicked] = useState7(false);
  const { participate, isParticipationLoading } = useTask();
  const thirdPartyAuth = useThirdPartyAuth();
  const completed = task.participation && task.participation.status === "completed" /* completed */;
  const onLinkClick = () => __async(void 0, null, function* () {
    switch (task.type) {
      case "discord_join" /* discord_join */:
        window.open(
          task.metadata.invite_url,
          "_blank"
        );
        break;
      case "twitter_follow" /* twitter_follow */:
        window.open(
          `https://twitter.com/intent/follow?screen_name=${task.metadata.username}`,
          "_blank"
        );
        break;
      case "twitter_like" /* twitter_like */:
        window.open(task.metadata.post_url, "_blank");
        break;
      case "twitter_reply" /* twitter_reply */:
        window.open(
          task.metadata.post_url,
          "_blank"
        );
        break;
      case "twitter_repost" /* twitter_repost */:
        window.open(
          `https://twitter.com/intent/retweet?tweet_id=${task.metadata.post_id}`,
          "_blank"
        );
        break;
      case "telegram_join" /* telegram_join */:
        window.open(
          `https://t.me/${task.metadata.username}`,
          "_blank"
        );
        break;
      case "image_upload" /* image_upload */:
        const file = yield callbacks.onFileUpload(task);
        onParticipate({
          file
        });
        return;
      case "submit_string" /* submit_string */:
        const value = yield callbacks.onSubmitString(task);
        onParticipate({
          value
        });
        return;
      case "open_url" /* open_url */:
        window.open(task.metadata.url, "_blank");
        break;
      case "youtube_view" /* youtube_view */:
        const secondsWatched = yield callbacks.onYoutubeView(
          task,
          task.metadata.video_id
        );
        onParticipate({
          seconds: secondsWatched
        });
        return;
      case "daily_login" /* daily_login */:
        onParticipate();
        return;
      case "twitch_follow" /* twitch_follow */:
        window.open(
          task.metadata.twitch_url,
          "_blank"
        );
        break;
      case "youtube_subscribe" /* youtube_subscribe */:
        window.open(
          task.metadata.channel_url,
          "_blank"
        );
        break;
    }
    setLinkClicked(true);
  });
  const isAuthenticated = () => {
    switch (task.type) {
      case "discord_connect" /* discord_connect */:
      case "discord_join" /* discord_join */:
        return thirdPartyAuth.isAuthenticated("discord" /* discord */);
      case "twitter_connect" /* twitter_connect */:
      case "twitter_follow" /* twitter_follow */:
      case "twitter_like" /* twitter_like */:
      case "twitter_reply" /* twitter_reply */:
      case "twitter_repost" /* twitter_repost */:
        return thirdPartyAuth.isAuthenticated("twitter" /* twitter */);
      case "telegram_connect" /* telegram_connect */:
      case "telegram_join" /* telegram_join */:
        return thirdPartyAuth.isAuthenticated("telegram" /* telegram */);
      default:
        return true;
    }
  };
  const authenticate = () => {
    switch (task.type) {
      case "discord_connect" /* discord_connect */:
      case "discord_join" /* discord_join */:
        return thirdPartyAuth.authenticate("discord" /* discord */);
      case "twitter_connect" /* twitter_connect */:
      case "twitter_follow" /* twitter_follow */:
      case "twitter_like" /* twitter_like */:
      case "twitter_reply" /* twitter_reply */:
      case "twitter_repost" /* twitter_repost */:
        return thirdPartyAuth.authenticate("twitter" /* twitter */);
      case "telegram_connect" /* telegram_connect */:
      case "telegram_join" /* telegram_join */:
        return thirdPartyAuth.authenticate("telegram" /* telegram */);
    }
  };
  const onParticipate = (body) => __async(void 0, null, function* () {
    const resp = yield participate(task, body, onSuccess);
    if (!resp) {
      setLinkClicked(false);
    }
  });
  const handleClick = () => {
    if (participationDisabled || maintenance || completed) {
      return void 0;
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
    var _a2, _b;
    if (completed) {
      return "COMPLETED" /* COMPLETED */;
    }
    if (!task.participation) {
      return "NO_PARTICIPANT" /* NO_PARTICIPANT */;
    }
    if (((_a2 = task.participation) == null ? void 0 : _a2.status) === "pending" /* pending */) {
      return "PENDING" /* PENDING */;
    }
    if (((_b = task.participation) == null ? void 0 : _b.status) === "failed" /* failed */) {
      return "FAILED" /* FAILED */;
    }
    if (linkClicked) {
      return "CLAIM" /* CLAIM */;
    }
    if (isAuthenticated()) {
      return "START" /* START */;
    }
    return "AUTH_REQUIRED" /* AUTH_REQUIRED */;
  };
  const noOnClick = () => {
    if (completed || maintenance || participationDisabled) {
      return true;
    }
    if (task.type === "manual" /* manual */ || task.type === "twitter_activity" /* twitter_activity */) {
      return true;
    }
    return false;
  };
  return children({
    onClick: !noOnClick() ? handleClick : void 0,
    type: getType(),
    isLoading: thirdPartyAuth.isLoading || isParticipationLoading,
    disabled: participationDisabled || maintenance,
    comment: (_a = task.participation) == null ? void 0 : _a.comment
  });
};
var TaskWrapper = (props) => {
  const { task, participationDisabled, maintenance, errorCallback, onSuccess } = props;
  return /* @__PURE__ */ jsx6(TaskProvider, { errorCallback, children: /* @__PURE__ */ jsx6(ThirdPartyAuthProvider, { errorCallback, children: /* @__PURE__ */ jsx6(
    TaskWrapperBase,
    {
      task,
      participationDisabled,
      maintenance,
      callbacks: props.callbacks,
      onSuccess,
      children: props.children
    }
  ) }) });
};
var TaskWrapper_default = TaskWrapper;

// src/models/enums/missions.enum.ts
var MissionType = /* @__PURE__ */ ((MissionType2) => {
  MissionType2["guaranteed"] = "guaranteed";
  MissionType2["scoreboard"] = "scoreboard";
  MissionType2["lottery"] = "lottery";
  return MissionType2;
})(MissionType || {});
var MissionRewardType = /* @__PURE__ */ ((MissionRewardType2) => {
  MissionRewardType2["crypto"] = "crypto";
  MissionRewardType2["points"] = "points";
  MissionRewardType2["points_per_task"] = "points_per_task";
  return MissionRewardType2;
})(MissionRewardType || {});

// src/models/enums/quest_webhook_type.ts
var QuestWebhookType = /* @__PURE__ */ ((QuestWebhookType2) => {
  QuestWebhookType2["participant_reward_added"] = "participant_reward_added";
  QuestWebhookType2["participant_reward_removed"] = "participant_reward_removed";
  QuestWebhookType2["third_party_authenticated"] = "third_party_authenticated";
  QuestWebhookType2["task_completed"] = "task_completed";
  return QuestWebhookType2;
})(QuestWebhookType || {});

// src/models/enums/task_validation.enum.ts
var TaskValidation = /* @__PURE__ */ ((TaskValidation2) => {
  TaskValidation2["email"] = "email";
  TaskValidation2["is_equal"] = "is_equal";
  return TaskValidation2;
})(TaskValidation || {});

// src/wrappers.tsx
import { jsx as jsx7 } from "react/jsx-runtime";
var QuestsProvider = ({
  children,
  apiKey,
  apiUrl,
  errorCallback
}) => {
  return /* @__PURE__ */ jsx7(GamesocialProvider, { apiKey, apiUrl, children: /* @__PURE__ */ jsx7(ParticipantProvider, { errorCallback, children: /* @__PURE__ */ jsx7(MissionsProvider, { children }) }) });
};
export {
  GamesocialProvider,
  MissionRewardType,
  MissionType,
  MissionsProvider,
  ParticipantMissionStatus,
  ParticipantProvider,
  ParticipantTaskStatus,
  QuestWebhookType,
  QuestsProvider,
  TaskButtonType,
  TaskProvider,
  TaskRewardType,
  TaskType,
  TaskValidation,
  TaskWrapper_default as TaskWrapper,
  ThirdPartyProvider,
  errorMessages,
  getCurrentHrefWithoutQueryParams,
  shouldRefetchParticipant,
  useGamesocial,
  useGamesocialState,
  useMissions,
  useMissionsState,
  useParticipant,
  useParticipantState,
  useTask,
  useTaskState
};
//# sourceMappingURL=index.mjs.map