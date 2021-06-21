import { ImageFormat } from './../shared/imageFormat';
export class Product {
    name: string;
    description: string;
    category: string;
    pictureBase64: string;
    price?: number;
    balance?: number;
    type: ProductType;
    image: ImageFormat = new ImageFormat();
    imageUrl?: string;
}

export enum ProductType {
    Default,
    Donation,
    ForSale
}