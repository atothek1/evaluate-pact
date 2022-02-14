import { Matchers, Query, RequestOptions, ResponseOptions } from '@pact-foundation/pact';
import { Product } from '../../../src/types';
const faker = require("faker")

const { commerce, datatype, image } = faker;
faker.seed(5678);

const { like, eachLike } = Matchers;

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
function createProducts(count: number = 10): Product[] {
    const res: Product[] = [];
    for (let i = 0; i < count; i++) {
        res.push(createProduct());
    }
    return res
}

export const productsRequest : { uponReceiving: string, withRequest: RequestOptions } = {
    uponReceiving: 'a request for fetching all products',
    withRequest: {
        method: 'GET',
        path: '/v1/products',
    },
};
export const filteredProductsRequest = (filter: Query): { uponReceiving: string, withRequest: RequestOptions } => ({
    uponReceiving: 'a request for fetching a filtered list of products',
    withRequest: {
        method: 'GET',
        path: '/v1/products',
        query: filter
    },
});

export const withListOfProductsResponse : {state: string | undefined, willRespondWith: ResponseOptions } = {
    state: "has a collection of products",
    willRespondWith: {
        status: 200,
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: like(createProducts(10).map(product => ({
            id: like(product.id),
            name: like(product.name),
            description: like(product.description),
            price: like(product.price),
            imageUrls: eachLike(product.imageUrls[0]),
            isAvailable: like(product.isAvailable)
        }))),
    }
};

export const withOneAvailableProductInTheListOfProductsResponse = () : {state: string | undefined, willRespondWith: ResponseOptions } => ({
    state: "has a collection of many products with only a single product available",
    willRespondWith: {
        status: 200,
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: createProducts(1).map(product => ({
            id: like(product.id),
            name: like(product.name),
            description: like(product.description),
            price: like(product.price),
            imageUrls: eachLike(product.imageUrls[0]),
            isAvailable: true
        })),
    }
});