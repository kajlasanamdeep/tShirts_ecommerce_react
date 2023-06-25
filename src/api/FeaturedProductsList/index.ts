import { ApiClient } from "api/ApiClient";
import { IFeaturedProductsResponse } from "models/api/FeaturedProductsResponse";
import { Endpoints } from "utils/Endpoints";

export const FeaturedProductsList = async (token: string) => {
    const url = await ApiClient.get(Endpoints.FEATURED_PRODUCTS_LIST, {
        headers: {
            Authorization: token,
        },
    });

    const response: IFeaturedProductsResponse = url.data;

    if (response.status === 200) {
        return response;
    }

    throw new Error("Unable to get featured products list");
};
