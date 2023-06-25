import { ApiClient } from "api/ApiClient";
import { AxiosError } from "axios";
import { IAdminProfileResponse } from "models/api/AdminProfileResponse";
import { Endpoints } from "utils/Endpoints";

export const AdminProfile = async () => {
    const token = localStorage.getItem("token");

    if (!token) throw new AxiosError("Token not found");

    const url = await ApiClient.get(Endpoints.ADMIN_PROFILE, {
        headers: {
            Authorization: token,
        },
    });

    const response: IAdminProfileResponse = url.data;

    if (response.status === 200) {
        return { ...response.data, token };
    }

    throw new Error("Unable to get admin profile details");
};
