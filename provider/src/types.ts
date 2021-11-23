export interface Product {
    readonly id: string;
    readonly name: string;
    readonly description?: string;
    readonly isAvailable?: boolean;
    readonly price: number;
    readonly imageUrls: string[];
}