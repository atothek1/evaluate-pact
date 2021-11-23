import React from "react";

import { useGetProducts } from "../../hooks/useGetProducts";
import { isEmpty } from "../../utils";
import { Heading } from "../common";
import { ServiceStatus } from "../common/ServiceStatus";
import { ProductTile } from "./ProductTile";

interface ProductsGridProps {
    readonly isAvailable?: boolean;
}
export function ProductsGrid( props: ProductsGridProps) {
    const { isAvailable } = props;
    const options = { params: { query: { isAvailable } } };
    const {isPending, isError, data, error} = useGetProducts( options );
    const hasData = !isEmpty(data);
    const elements = hasData ? data!.map(product => {
        return (
            <li key={product.id}>
                <ProductTile product={product}/>
            </li>
        );
    }) : null;
    return (
        <ServiceStatus isPending={isPending} isError={isError} hasData={hasData} error={error}>
            <Heading>Products</Heading>
            <ul>{elements}</ul>
        </ServiceStatus>
    );
}