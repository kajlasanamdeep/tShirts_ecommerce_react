import { IFeaturedProductsResponse } from "models/api/FeaturedProductsResponse";

export const formatDate = (data: string) => {
    return `${new Date(data).getDate()}-${
        new Date(data).getMonth() + 1
    }-${new Date(data).getFullYear()}`;
};

export const isDataFeaturedProduct = (
    data: unknown
): data is IFeaturedProductsResponse => {
    if (
        !!data &&
        typeof data === "object" &&
        data.constructor === Object &&
        "data" in data
    ) {
        return true;
    }
    return false;
};
