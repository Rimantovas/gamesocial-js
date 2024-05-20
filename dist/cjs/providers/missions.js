"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMissionsState = exports.MissionsProvider = exports.useMissions = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var useApi_1 = require("../hooks/useApi");
var react_1 = require("react");
var __1 = require("..");
var gamesocial_1 = require("./gamesocial");
var context = (0, react_1.createContext)({
    missions: [],
    tasks: [],
    getTasksForMission: function () { return []; },
    updateTaskStatus: function () { },
    maintenance: false,
});
var useMissions = function () { return (0, react_1.useContext)(context); };
exports.useMissions = useMissions;
function MissionsProvider(_a) {
    var children = _a.children, state = _a.state;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    state !== null && state !== void 0 ? state : (state = (0, exports.useMissionsState)());
    return (0, jsx_runtime_1.jsx)(context.Provider, { value: state, children: children });
}
exports.MissionsProvider = MissionsProvider;
var useMissionsState = function () {
    var _a = (0, react_1.useState)([]), missions = _a[0], setMissions = _a[1];
    var _b = (0, react_1.useState)([]), tasks = _b[0], setTasks = _b[1];
    var authToken = (0, gamesocial_1.useGamesocial)().authToken;
    var api = (0, useApi_1.useApi)();
    var _c = (0, react_1.useState)(false), maintenance = _c[0], setMaintenance = _c[1];
    (0, react_1.useEffect)(function () {
        getMissions();
    }, [authToken]);
    (0, react_1.useEffect)(function () {
        if (missions.length > 0) {
            getTasks(missions.map(function (m) { return m.id; }));
        }
    }, [missions]);
    (0, react_1.useEffect)(function () {
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
            var validTypes = new Set(Object.values(__1.TaskType));
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
    var getTasksForMission = (0, react_1.useCallback)(function (missionId) {
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
exports.useMissionsState = useMissionsState;
//# sourceMappingURL=missions.js.map