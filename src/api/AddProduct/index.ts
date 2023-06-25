import { ApiClient } from "api/ApiClient";
import { IAddProductResponse } from "models/api/AddProductResponse";
import { IAddProductPayload } from "models/data/ProductListModel";
import { Endpoints } from "utils/Endpoints";

export const AddProduct = async (data: IAddProductPayload) => {
    const url = await ApiClient.post(Endpoints.PRODUCT, data.data, {
        headers: {
            Authorization: data.token,
            "Content-Type": "multipart/form-data",
        },
    });

    const response: IAddProductResponse = url.data;

    if (response.status === 200) {
        return response;
    }

    throw new Error("Unable to add product");
};
