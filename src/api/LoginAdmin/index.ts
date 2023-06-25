import { ApiClient } from "api/ApiClient";
import { ILoginResponse } from "models/api/LoginResponse";
import { ILogin } from "models/data/LoginModel";
import { Endpoints } from "utils/Endpoints";

export const LoginAdmin = async (data: ILogin) => {
    const url = await ApiClient.post(Endpoints.LOGIN, data);
    const response: ILoginResponse = url.data;
    if (response.status === 200) {
        return response;
    }
    throw new Error("Unable to login");
};
