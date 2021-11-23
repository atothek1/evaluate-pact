import { Product, ServiceOptions } from "../types";
import { generateUrl } from "../utils";

export function getProduct(options?: ServiceOptions): Promise<Product> {
    const { baseUrl = "", params } = options ?? {};
    const url = generateUrl(baseUrl + "/v1/products/{id}", params);
    return fetch(url, {method: "GET"}).then(response => response.json());
}