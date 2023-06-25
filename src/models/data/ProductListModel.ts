export interface IProductListPayload {
    pageNumber: number;
    token: string;
}

export interface IProductModal {
    productId: string | null;
    isVisible: boolean;
}

export interface IProductDeletePayload {
    productId: string;
    token: string;
}

export interface IAddProductPayload {
    data: FormData;
    token: string;
}

export interface IFeaturedProductModal {
    isVisible: boolean;
    productId: string;
    productName: string;
}
