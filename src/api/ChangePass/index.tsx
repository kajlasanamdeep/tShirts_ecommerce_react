import { ApiClient } from "api/ApiClient";
import { IChangePasswordResponse } from "models/api/ChangePasswordResponse";
import { IChangePasswordPayload } from "models/data/ChangePasswordModel";
import { Endpoints } from "utils/Endpoints";

export const ChangePass = async (data: IChangePasswordPayload) => {
    const url = await ApiClient.post(
        Endpoints.CHANGE_PASSWORD,
        {
            newPassword: data.newPassword,
            oldPassword: data.oldPassword,
        },
        {
            headers: {
                Authorization: data.token,
            },
        }
    );
    const response: IChangePasswordResponse = url.data;

    if (response.status === 200) {
        return response;
    }
    throw new Error("Unable to change password");
};
