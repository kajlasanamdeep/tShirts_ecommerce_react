import { ApiClient } from "api/ApiClient";
import { IProductDeletePayload } from "models/data/ProductListModel";
import { ICommonResponse } from "models/general/CommonResponse";
import { Endpoints } from "utils/Endpoints";

export const DeleteProduct = async (data: IProductDeletePayload) => {
    const url = await ApiClient.delete(
        `${Endpoints.PRODUCT}/${data.productId}`,
        {
            headers: {
                Authorization: data.token,
            },
        }
    );

    const response: ICommonResponse = url.data;
    return response;
};
