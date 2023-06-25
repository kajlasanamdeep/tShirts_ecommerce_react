import axios from "axios";
import { CONSTANTS } from "utils/Constants";

export const ApiClient = axios.create({
    baseURL: CONSTANTS.HOST + CONSTANTS.API_VERSION,
    timeout: 25000,
    headers: {
        Accept: "application/json",
    },
});
