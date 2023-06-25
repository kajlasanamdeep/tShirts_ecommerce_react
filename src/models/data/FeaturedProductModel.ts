export interface IFeaturedProductModal {
    featuredId: string | null;
    isVisible: boolean;
}

export interface IFeaturedProductDeletePayload {
    featuredId: string;
    token: string;
}

export interface IAddFeaturedProductPayload {
    data: FormData;
    token: string;
}
