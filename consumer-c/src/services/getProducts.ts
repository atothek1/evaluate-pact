import { Product, ServiceOptions } from "../types";
import { generateUrl } from "../utils";

export function getProducts(options?: ServiceOptions): Promise<Product[]> {
    const { baseUrl = "", params } = options ?? {};
    const url = generateUrl(baseUrl + "/v1/products", params );
    return fetch(url, {method: "GET"}).then(response => response.json());
}