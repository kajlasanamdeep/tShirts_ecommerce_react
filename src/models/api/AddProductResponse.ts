export interface IAddProductResponse {
    data: IAddProductItem;
    error: string;
    message: string;
    status: number;
}

interface IAddProductItem {
    for: string;
    name: string;
    image: string;
    price: number;
    description: string;
    sizes: string[];
    isAvaliable: boolean;
    _id: string;
    createdAt: string;
    updatedAt: string;
}
