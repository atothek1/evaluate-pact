import { get } from "superagent";
import { Product } from "./types";

export async function getProducts( baseUrl: string ): Promise<Product[]> {
    const url = baseUrl + "/v1/products";
    const response = await get( url );
    return response.body as Promise<Product[]>;
}