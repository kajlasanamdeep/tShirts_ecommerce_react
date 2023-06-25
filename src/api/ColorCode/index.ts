import { ApiClient } from "api/ApiClient";
import { IColorResponse } from "models/api/ColorResponse";
import { IAddProductPayload } from "models/data/ProductListModel";
import { Endpoints } from "utils/Endpoints";

export const ColorCode = async (data: IAddProductPayload) => {
    const url = await ApiClient.post(Endpoints.COLOR, data.data, {
        headers: {
            Authorization: data.token,
            "Content-Type": "multipart/form-data",
        },
    });

    const response: IColorResponse = url.data;

    if (response.status === 200) {
        return response;
    }

    throw new Error("Unable to add color");
};
