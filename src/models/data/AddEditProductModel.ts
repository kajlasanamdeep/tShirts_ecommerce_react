export interface IAddProduct {
    _for: string;
    name: string;
    price: string;
    description: string;
    isAvaliable: boolean;
    image: File | null;
}

export interface IAddProductError {
    name: boolean;
    price: boolean;
    description: boolean;
}

export interface IAddProductColor {
    _id: string | null;
    colorname: string;
    colorcode: string;
    isAvailable: boolean;
    image1: File | string | undefined;
    image2: File | string | undefined;
    image3: File | string | undefined;
}
