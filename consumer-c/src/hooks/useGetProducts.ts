import { getProducts } from "../services/getProducts";
import { Product, ServiceOptions } from "../types";
import { useService, UseServiceState } from "./useService";

export function useGetProducts(options?: ServiceOptions): UseServiceState<Product[]> {
    function resolver(response: Product[]) {
        return response.map(p => {
            return {...p, price: p.price / 100};
        })
    };
    return useService(getProducts, {...options, resolver});
}