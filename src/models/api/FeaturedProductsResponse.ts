export interface IFeaturedProductsResponse {
    data: IFeaturedProductsData[];
    error: string;
    message: string;
    status: number;
}

export interface IFeaturedProductsData {
    _id: string;
    productId: string;
    image: string;
    label: string;
    createdAt: string;
    updatedAt: string;
    product: Product;
}

interface Product {
    _id: string;
    for: string;
    name: string;
    image: string;
    price: number;
    description: string;
    sizes: string[];
    isAvaliable: boolean;
    createdAt: string;
    updatedAt: string;
}

type AddFeaturedProductData = Omit<IFeaturedProductsData, "product">;

export interface AddFeaturedProductResponse {
    data: AddFeaturedProductData;
    error: string;
    message: string;
    status: number;
}
