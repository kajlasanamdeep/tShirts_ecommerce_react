interface IColor {
    _id: string;
    name: string;
    color_code: string;
    productId: string;
    image1?: string;
    image2?: string;
    image3?: string;
    isAvaliable: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface IProductItem {
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
    colors: IColor[];
}

export interface IProductList {
    items: IProductItem[];
    totalItems: number;
    pageNumber: string;
    pageSize: string;
}

export interface IProductListResponse {
    data: IProductList;
    error: string;
    message: string;
    status: number;
}
