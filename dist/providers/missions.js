import { jsx as _jsx } from "react/jsx-runtime";
import { useApi } from "@/hooks/useApi";
import { createContext, useCallback, useContext, useEffect, useState, } from "react";
import { TaskType } from "..";
import { useGamesocial } from "./gamesocial";
const context = createContext({
    missions: [],
    tasks: [],
    getTasksForMission: () => [],
    updateTaskStatus: () => { },
    maintenance: false,
});
export const useMissions = () => useContext(context);
export function MissionsProvider({ children, state, }) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    state !== null && state !== void 0 ? state : (state = useMissionsState());
    return _jsx(context.Provider, { value: state, children: children });
}
export const useMissionsState = () => {
    const [missions, setMissions] = useState([]);
    const [tasks, setTasks] = useState([]);
    const { authToken } = useGamesocial();
    const api = useApi();
    const [maintenance, setMaintenance] = useState(false);
    useEffect(() => {
        getMissions();
    }, [authToken]);
    useEffect(() => {
        if (missions.length > 0) {
            getTasks(missions.map((m) => m.id));
        }
    }, [missions]);
    useEffect(() => {
        if (authToken && authToken.length === 0) {
            setMaintenance(true);
        }
    }, [authToken]);
    const getMissions = () => {
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
    const getTasks = (missionIds) => {
        const promises = missionIds.map((id) => api().get(`missions/${id}/tasks`));
        Promise.all(promises)
            .then(function (responses) {
            const validTypes = new Set(Object.values(TaskType));
            const tasks = responses
                .map((r) => r.data)
                .flat()
                .filter((t) => validTypes.has(t.type));
            setTasks(tasks);
        })
            .catch(function () {
            setMaintenance(true);
        });
    };
    const updateTaskStatus = (taskId, status) => {
        setTasks(tasks.map((task) => task.id === taskId ? Object.assign(Object.assign({}, task), { participation: { status } }) : task));
    };
    const getTasksForMission = useCallback((missionId) => {
        return tasks.filter((t) => t.mission_id === missionId);
    }, [tasks]);
    return {
        missions,
        tasks,
        getTasksForMission,
        updateTaskStatus,
        maintenance,
    };
};
//# sourceMappingURL=missions.js.map