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
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from "react";
import { useApi } from "../hooks/useApi";
import { ParticipantTaskStatus } from "../models/enums/participants.enum";
import { errorMessages, shouldRefetchParticipant } from "../utils/errors";
import { useMissions } from "./missions";
import { useParticipant } from "./participant";
var context = createContext({
    isParticipationLoading: false,
    participate: function () { return Promise.resolve(false); },
});
export var useTask = function () { return useContext(context); };
export function TaskProvider(_a) {
    var children = _a.children, state = _a.state, errorCallback = _a.errorCallback;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    state !== null && state !== void 0 ? state : (state = useTaskState(errorCallback));
    return _jsx(context.Provider, { value: state, children: children });
}
export var useTaskState = function (errorCallback) {
    var _a = useState(false), isParticipationLoading = _a[0], setIsParticipationLoading = _a[1];
    var updateTaskStatus = useMissions().updateTaskStatus;
    var _b = useParticipant(), addPoints = _b.addPoints, getParticipant = _b.getParticipant;
    var api = useApi();
    var handleError = function (e) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        var message = "";
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
                var s = shouldRefetchParticipant(message);
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
    var participate = function (task, body, callback) { return __awaiter(void 0, void 0, void 0, function () {
        var data, base64;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsParticipationLoading(true);
                    data = __assign({}, body);
                    if (!(body === null || body === void 0 ? void 0 : body.file)) return [3 /*break*/, 2];
                    return [4 /*yield*/, fetch(body.file)
                            .then(function (response) { return response.blob(); })
                            .then(function (blob) {
                            var reader = new FileReader();
                            reader.readAsDataURL(blob);
                            return new Promise(function (res) {
                                reader.onloadend = function () {
                                    res(reader.result);
                                };
                            });
                        })];
                case 1:
                    base64 = _a.sent();
                    data = __assign(__assign({}, body), { file: {
                            imageSrc: base64,
                        } });
                    _a.label = 2;
                case 2: return [4 /*yield*/, api()
                        .post("tasks/".concat(task.id), body ? data : undefined)
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
                    })];
                case 3:
                    _a.sent();
                    return [2 /*return*/, false];
            }
        });
    }); };
    return {
        isParticipationLoading: isParticipationLoading,
        participate: participate,
    };
};
//# sourceMappingURL=task.js.map