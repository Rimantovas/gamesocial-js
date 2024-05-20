var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";
import { TaskRewardType } from "../models/enums/task_reward_type.enum";
import { useGamesocial } from "./gamesocial";
var context = createContext({
    participant: undefined,
    isThirdPartyAuthenticated: function () { return false; },
    addPoints: function () { },
    getParticipant: function () { },
});
export var useParticipant = function () { return useContext(context); };
export function ParticipantProvider(_a) {
    var children = _a.children, state = _a.state, errorCallback = _a.errorCallback;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    state !== null && state !== void 0 ? state : (state = useParticipantState(errorCallback));
    return _jsx(context.Provider, { value: state, children: children });
}
export var useParticipantState = function (errorCallback) {
    var _a = useState(), participant = _a[0], setParticipant = _a[1];
    var authToken = useGamesocial().authToken;
    var api = useApi();
    useEffect(function () {
        if (authToken) {
            getParticipant();
        }
        else {
            setParticipant(undefined);
        }
    }, [authToken]);
    var getParticipant = function () {
        api()
            .get("participants/me")
            .then(function (response) {
            setParticipant(response.data);
        })
            .catch(function (error) {
            console.error(error);
            errorCallback && errorCallback(error);
        });
    };
    var isThirdPartyAuthenticated = function (thirdParty) {
        return !!(participant === null || participant === void 0 ? void 0 : participant.authenticated.includes(thirdParty));
    };
    var addPoints = function (task) {
        if (!task.points_reward)
            return;
        setParticipant(function (prev) {
            var _a;
            if (!prev)
                return undefined;
            if (task.reward_type === TaskRewardType.points) {
                var points_1 = Math.floor(task.points_reward * ((_a = participant === null || participant === void 0 ? void 0 : participant.points_multiplier) !== null && _a !== void 0 ? _a : 1));
                setParticipant(function (prev) {
                    if (!prev)
                        return undefined;
                    return __assign(__assign({}, prev), { points: (prev === null || prev === void 0 ? void 0 : prev.points) + points_1 });
                });
            }
            else {
                setParticipant(function (prev) {
                    if (!prev)
                        return undefined;
                    return __assign(__assign({}, prev), { points_multiplier: (prev === null || prev === void 0 ? void 0 : prev.points_multiplier) + task.points_reward });
                });
            }
        });
    };
    return {
        participant: participant,
        isThirdPartyAuthenticated: isThirdPartyAuthenticated,
        addPoints: addPoints,
        getParticipant: getParticipant,
    };
};
//# sourceMappingURL=participant.js.map