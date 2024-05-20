import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from "react";
import { useApi } from "@/hooks/useApi";
import { TaskRewardType } from "@/models/enums/task_reward_type.enum";
import { useGamesocial } from "./gamesocial";
const context = createContext({
    participant: undefined,
    isThirdPartyAuthenticated: () => false,
    addPoints: () => { },
    getParticipant: () => { },
});
export const useParticipant = () => useContext(context);
export function ParticipantProvider({ children, state, errorCallback, }) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    state !== null && state !== void 0 ? state : (state = useParticipantState(errorCallback));
    return _jsx(context.Provider, { value: state, children: children });
}
export const useParticipantState = (errorCallback) => {
    const [participant, setParticipant] = useState();
    const { authToken } = useGamesocial();
    const api = useApi();
    useEffect(() => {
        if (authToken) {
            getParticipant();
        }
        else {
            setParticipant(undefined);
        }
    }, [authToken]);
    const getParticipant = () => {
        api()
            .get(`participants/me`)
            .then(function (response) {
            setParticipant(response.data);
        })
            .catch(function (error) {
            console.error(error);
            errorCallback && errorCallback(error);
        });
    };
    const isThirdPartyAuthenticated = (thirdParty) => {
        return !!(participant === null || participant === void 0 ? void 0 : participant.authenticated.includes(thirdParty));
    };
    const addPoints = (task) => {
        if (!task.points_reward)
            return;
        setParticipant((prev) => {
            var _a;
            if (!prev)
                return undefined;
            if (task.reward_type === TaskRewardType.points) {
                const points = Math.floor(task.points_reward * ((_a = participant === null || participant === void 0 ? void 0 : participant.points_multiplier) !== null && _a !== void 0 ? _a : 1));
                setParticipant((prev) => {
                    if (!prev)
                        return undefined;
                    return Object.assign(Object.assign({}, prev), { points: (prev === null || prev === void 0 ? void 0 : prev.points) + points });
                });
            }
            else {
                setParticipant((prev) => {
                    if (!prev)
                        return undefined;
                    return Object.assign(Object.assign({}, prev), { points_multiplier: (prev === null || prev === void 0 ? void 0 : prev.points_multiplier) + task.points_reward });
                });
            }
        });
    };
    return {
        participant,
        isThirdPartyAuthenticated,
        addPoints,
        getParticipant,
    };
};
//# sourceMappingURL=participant.js.map