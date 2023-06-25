import { ApiClient } from "api/ApiClient";
import { IProductListResponse } from "models/api/ProductsListResponse";
import { IProductListPayload } from "models/data/ProductListModel";
import { Endpoints } from "utils/Endpoints";

export const ProductsList = async (data: IProductListPayload) => {
    const url = await ApiClient.get(
        `${Endpoints.VIEW_PRODUCTS}?pageNumber=${data.pageNumber}`,
        {
            headers: {
                Authorization: data.token,
            },
        }
    );

    const response: IProductListResponse = url.data;

    if (response.status === 200) {
        return response.data;
    }

    throw new Error("Unable to get products list");
};
