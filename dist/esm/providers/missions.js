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
import { useApi } from "../hooks/useApi";
import { createContext, useCallback, useContext, useEffect, useState, } from "react";
import { TaskType } from "..";
import { useGamesocial } from "./gamesocial";
var context = createContext({
    missions: [],
    tasks: [],
    getTasksForMission: function () { return []; },
    updateTaskStatus: function () { },
    maintenance: false,
});
export var useMissions = function () { return useContext(context); };
export function MissionsProvider(_a) {
    var children = _a.children, state = _a.state;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    state !== null && state !== void 0 ? state : (state = useMissionsState());
    return _jsx(context.Provider, { value: state, children: children });
}
export var useMissionsState = function () {
    var _a = useState([]), missions = _a[0], setMissions = _a[1];
    var _b = useState([]), tasks = _b[0], setTasks = _b[1];
    var authToken = useGamesocial().authToken;
    var api = useApi();
    var _c = useState(false), maintenance = _c[0], setMaintenance = _c[1];
    useEffect(function () {
        getMissions();
    }, [authToken]);
    useEffect(function () {
        if (missions.length > 0) {
            getTasks(missions.map(function (m) { return m.id; }));
        }
    }, [missions]);
    useEffect(function () {
        if (authToken && authToken.length === 0) {
            setMaintenance(true);
        }
    }, [authToken]);
    var getMissions = function () {
        api()
            .get("missions")
            .then(function (response) {
            setMissions(response.data);
        })
            .catch(function () {
            setMaintenance(true);
        })
            .finally(function () {
            // always executed
        });
    };
    var getTasks = function (missionIds) {
        var promises = missionIds.map(function (id) { return api().get("missions/".concat(id, "/tasks")); });
        Promise.all(promises)
            .then(function (responses) {
            var validTypes = new Set(Object.values(TaskType));
            var tasks = responses
                .map(function (r) { return r.data; })
                .flat()
                .filter(function (t) { return validTypes.has(t.type); });
            setTasks(tasks);
        })
            .catch(function () {
            setMaintenance(true);
        });
    };
    var updateTaskStatus = function (taskId, status) {
        setTasks(tasks.map(function (task) {
            return task.id === taskId ? __assign(__assign({}, task), { participation: { status: status } }) : task;
        }));
    };
    var getTasksForMission = useCallback(function (missionId) {
        return tasks.filter(function (t) { return t.mission_id === missionId; });
    }, [tasks]);
    return {
        missions: missions,
        tasks: tasks,
        getTasksForMission: getTasksForMission,
        updateTaskStatus: updateTaskStatus,
        maintenance: maintenance,
    };
};
//# sourceMappingURL=missions.js.map