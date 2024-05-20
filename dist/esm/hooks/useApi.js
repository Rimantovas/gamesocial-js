import { useGamesocial } from "../providers/gamesocial";
import axios from "axios";
export var useApi = function () {
    var _a = useGamesocial(), authToken = _a.authToken, apiUrl = _a.apiUrl, apiKey = _a.apiKey;
    var api = function () {
        var api = axios.create({
            baseURL: apiUrl,
            timeout: 10000,
            headers: {
                "Api-Key": apiKey,
                "Api-Version": "1.0",
            },
        });
        api.interceptors.request.use(function (config) {
            var token = authToken;
            if (token) {
                config.headers.Authorization = "Bearer ".concat(token);
            }
            return config;
        }, function (error) {
            return Promise.reject(error);
        });
        api.interceptors.response.use(function (response) {
            return response;
        }, function (error) {
            if (error.response && error.response.status === 401) {
                // Ensure this runs only in the browser
                if (typeof window !== "undefined") {
                    localStorage.removeItem("token");
                }
            }
            return Promise.reject(error);
        });
        return api;
    };
    return api;
};
//# sourceMappingURL=useApi.js.map