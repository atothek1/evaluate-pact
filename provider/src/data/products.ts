const faker = require("faker")
import { Product } from "../../src/types";

const { commerce, datatype, image } = faker;
faker.seed(5678);

function createImageUrls(): string[] {
    const res: string[] = [];
    for (let i = 0; i < 10; i++) {
        res.push(image.imageUrl());
    }
    return res
}

export function createProduct(): Product {
    return {
        id: datatype.uuid(),
        name: commerce.productName(),
        price: parseFloat(commerce.price()) * 10,
        description: commerce.productDescription(),
        isAvailable: datatype.boolean(),
        imageUrls: createImageUrls()
    }
}
export class Products {
    constructor(private products: Product[] = []) { }
    clear() { this.products = [] }
    add(...products: Product[]) { this.products.push(...products) }
    get() { return [ ...this.products ] }
}
export const productRepository = new Products();