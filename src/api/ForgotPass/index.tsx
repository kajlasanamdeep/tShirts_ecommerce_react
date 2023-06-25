import { ApiClient } from "api/ApiClient";
import { IForgotResponse } from "models/api/ForgotResponse";
import { Endpoints } from "utils/Endpoints";

export const ForgotPass = async (email: string) => {
    const url = await ApiClient.post(Endpoints.FORGOT, {
        email,
    });
    const response: IForgotResponse = url.data;
    if (response.status === 200) {
        return response;
    }
    throw new Error("Unable to send email");
};
