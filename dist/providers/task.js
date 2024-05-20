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
import { createContext, useContext, useState } from "react";
import { useApi } from "@/hooks/useApi";
import { ParticipantTaskStatus } from "@/models/enums/participants.enum";
import { errorMessages, shouldRefetchParticipant } from "@/utils/errors";
import { useMissions } from "./missions";
import { useParticipant } from "./participant";
const context = createContext({
    isParticipationLoading: false,
    participate: () => Promise.resolve(false),
});
export const useTask = () => useContext(context);
export function TaskProvider({ children, state, errorCallback, }) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    state !== null && state !== void 0 ? state : (state = useTaskState(errorCallback));
    return _jsx(context.Provider, { value: state, children: children });
}
export const useTaskState = (errorCallback) => {
    const [isParticipationLoading, setIsParticipationLoading] = useState(false);
    const { updateTaskStatus } = useMissions();
    const { addPoints, getParticipant } = useParticipant();
    const api = useApi();
    const handleError = (e) => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        let message = "";
        if ((_b = (_a = e === null || e === void 0 ? void 0 : e.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) {
            if (typeof ((_d = (_c = e === null || e === void 0 ? void 0 : e.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.message) === "string") {
                message = (_f = (_e = e === null || e === void 0 ? void 0 : e.response) === null || _e === void 0 ? void 0 : _e.data) === null || _f === void 0 ? void 0 : _f.message.toString();
            }
            else {
                // todo
            }
        }
        else if ((_g = e === null || e === void 0 ? void 0 : e.response) === null || _g === void 0 ? void 0 : _g.message) {
            message = (_h = e === null || e === void 0 ? void 0 : e.response) === null || _h === void 0 ? void 0 : _h.message.toString();
        }
        if (!message) {
            errorCallback && errorCallback("Server error, please try again later");
        }
        else {
            if (message in errorMessages) {
                const s = shouldRefetchParticipant(message);
                if (s) {
                    // TODO Maybe await this
                    getParticipant();
                }
                errorCallback && errorCallback(errorMessages[message]);
            }
            else {
                errorCallback && errorCallback(message);
            }
        }
    };
    const participate = (task, body, callback) => __awaiter(void 0, void 0, void 0, function* () {
        setIsParticipationLoading(true);
        let data = Object.assign({}, body);
        if (body === null || body === void 0 ? void 0 : body.file) {
            const base64 = yield fetch(body.file)
                .then((response) => response.blob())
                .then((blob) => {
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                return new Promise((res) => {
                    reader.onloadend = () => {
                        res(reader.result);
                    };
                });
            });
            data = Object.assign(Object.assign({}, body), { file: {
                    imageSrc: base64,
                } });
        }
        yield api()
            .post(`tasks/${task.id}`, body ? data : undefined)
            .then(function (response) {
            updateTaskStatus(task.id, response.data.status);
            if (response.data.status === ParticipantTaskStatus.completed &&
                task.points_reward) {
                addPoints(task);
            }
            if (callback) {
                callback();
            }
            return true;
        })
            .catch(function (error) {
            handleError(error);
        })
            .finally(function () {
            setIsParticipationLoading(false);
        });
        return false;
    });
    return {
        isParticipationLoading,
        participate,
    };
};
//# sourceMappingURL=task.js.map