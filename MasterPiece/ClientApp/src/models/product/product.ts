export class Product {
    name: string;
    description: string;
    category: string;
    price: number;
    balance: number;
    type: ProductType;
}

export enum ProductType {
    Default,
    Donation,
    ForSale
}