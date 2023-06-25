import { ApiClient } from "api/ApiClient";
import { IUserListResponse } from "models/api/UsersListResponse";
import { IUserListPayload } from "models/data/UserListModel";
import { Endpoints } from "utils/Endpoints";

export const UsersList = async (data: IUserListPayload) => {
    const url = await ApiClient.get(
        `${Endpoints.USER_LIST}?pageNumber=${data.pageNumber}`,
        {
            headers: {
                Authorization: data.token,
            },
        }
    );

    const response: IUserListResponse = url.data;

    if (response.status === 200) {
        return response.data;
    }

    throw new Error("Unable to get users list");
};
