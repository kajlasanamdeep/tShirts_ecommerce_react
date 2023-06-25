import { ApiClient } from "api/ApiClient";
import { IFeaturedProductDeletePayload } from "models/data/FeaturedProductModel";
import { ICommonResponse } from "models/general/CommonResponse";
import { Endpoints } from "utils/Endpoints";

export const DeleteFeaturedProduct = async (
    data: IFeaturedProductDeletePayload
) => {
    const url = await ApiClient.delete(
        `${Endpoints.FEATURED_PRODUCT}/${data.featuredId}`,
        {
            headers: {
                Authorization: data.token,
            },
        }
    );

    const response: ICommonResponse = url.data;
    return response;
};
