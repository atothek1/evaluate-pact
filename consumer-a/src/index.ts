import { get, post } from "superagent";
import { Product } from "./types";

export class ProductApi {
    constructor(private baseUrl: string) {
        this.baseUrl = `${baseUrl}/v1/products`
    }
    async getProducts() {
        const response = await get(this.baseUrl);
        return response.body as Promise<Product[]>;
    }
    async addProduct(product: Product) {
        return await post(this.baseUrl)
            .send(product)
            .then(response => response.body)
            .catch(err => {throw err.response.body})
    }
}

export async function getProducts(baseUrl: string): Promise<Product[]> {
    const url = baseUrl + "/v1/products";
    const response = await get(url);
    return response.body as Promise<Product[]>;
}