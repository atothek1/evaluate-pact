import { get } from "superagent";
import { Product } from "./types";

export type API = {
    getProducts: () => Promise<Product[]>
}

export function api(baseUrl: string): API {
    return {
        getProducts: () => getProducts(baseUrl)
    }
}

export async function getProducts(baseUrl: string): Promise<Product[]> {
    const url = baseUrl + "/v1/products";
    const response = await get(url);
    return response.body as Promise<Product[]>;
}