import { getProduct } from "../services/getProduct";
import { Product, ServiceOptions } from "../types";
import { useService, UseServiceState } from "./useService";

export function useGetProduct(options?: ServiceOptions): UseServiceState<Product> {
    return useService(getProduct, options);
}