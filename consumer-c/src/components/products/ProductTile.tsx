import React from "react";

import { Product } from "../../types";
import { Heading, Image, Text } from "../common";

interface ProductTileProps {
    readonly product: Product;
}

export function ProductTile(props: ProductTileProps) {
    const {product} = props;
    const firstImage = product.imageUrls[0] ?? "/assets/fallback.png";
    return (
        <div>
            <Image src={firstImage}/>
            <Heading>{product.name}</Heading>
            <Text>{product.description}</Text>
            <Text bold={true}>{product.price}</Text>
        </div>
    );
}