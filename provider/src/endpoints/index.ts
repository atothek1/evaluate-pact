import { Interaction, InteractionObject, Matchers, RequestOptions, ResponseOptions } from '@pact-foundation/pact';
import { products } from '../data/products';

const { like } = Matchers;

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
        body: like(products),
    }
};