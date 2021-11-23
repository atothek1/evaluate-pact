import { UrlParams } from "./utils";

export interface Product {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly isAvailable: boolean;
    readonly price: number;
    readonly imageUrls: string[];
}

export interface ServiceOptions {
    readonly params?: UrlParams;
    readonly baseUrl?: string;
}