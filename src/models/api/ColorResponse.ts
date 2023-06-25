export interface IColorResponse {
    data: IColorItem;
    error: string;
    message: string;
    status: number;
}

interface IColorItem {
    name: string;
    color_code: string;
    productId: string;
    image1: File | undefined;
    image2: File | undefined;
    image3: File | undefined;
    isAvaliable: boolean;
    _id: string;
    createdAt: string;
    updatedAt: string;
}
