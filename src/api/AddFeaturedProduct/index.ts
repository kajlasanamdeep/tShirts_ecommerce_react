import { ApiClient } from "api/ApiClient";
import { AddFeaturedProductResponse } from "models/api/FeaturedProductsResponse";
import { IAddFeaturedProductPayload } from "models/data/FeaturedProductModel";
import { Endpoints } from "utils/Endpoints";

export const AddFeaturedProduct = async (data: IAddFeaturedProductPayload) => {
    const url = await ApiClient.post(Endpoints.FEATURED_PRODUCT, data.data, {
        headers: {
            Authorization: data.token,
            "Content-Type": "multipart/form-data",
        },
    });

    const response: AddFeaturedProductResponse = url.data;

    if (response.status === 200) {
        return response;
    }

    throw new Error("Unable to add featured product");
};
