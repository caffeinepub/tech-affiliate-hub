import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Product {
    title: string;
    description: string;
    affiliateUrl: string;
    category: string;
    price: number;
}
export interface backendInterface {
    getAllFeaturedProducts(): Promise<Array<Product>>;
    getAllTodaysDeals(): Promise<Array<Product>>;
    getFeaturedProduct(productId: string): Promise<Product>;
    getProductsByCategory(category: string): Promise<Array<Product>>;
    getTodaysDeal(dealId: string): Promise<Product>;
}
