const faker = require("faker")
import { Product } from "../../src/types";

const {commerce, datatype, image } = faker;
faker.seed(5678);

function createImageUrls(): string [] {
    const res: string[] = [];
    for (let i = 0; i < 10; i++) {
        res.push(image.imageUrl());
    }
    return res
}

function createProduct(): Product {
    return {
        id: datatype.uuid(),
        name: commerce.productName(),
        price: parseFloat(commerce.price()) * 10,
        isAvailable: datatype.boolean(),
        imageUrls: createImageUrls()
    }
}

function createProducts(): Product [] {
    const res: Product[] = [];
    for (let i = 0; i < 10; i++) {
        res.push(createProduct());
    }
    return res
}

export const products = createProducts();