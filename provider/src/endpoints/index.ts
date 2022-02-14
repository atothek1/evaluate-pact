import { Matchers, RequestOptions, ResponseOptions } from '@pact-foundation/pact';
import { createProduct, productRepository } from '../data/products';
import { Product } from '../types';

const { like } = Matchers;
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

export const withListOfProductsRequest : {state: string | undefined, willRespondWith: ResponseOptions } = {
    state: "has a collection of products",
    willRespondWith: {
        status: 200,
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: like(createProducts()),
    }
};