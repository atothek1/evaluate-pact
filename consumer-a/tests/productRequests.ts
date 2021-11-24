import { Matchers, RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Product } from "../src/types";

const { like } = Matchers;

export const addProduct = (body: any): { uponReceiving: string, withRequest: RequestOptions } => ({
  uponReceiving: 'an attempt to add an product',
  withRequest: {
    method: 'POST',
    path: '/v1/products',
    headers: {
      'content-type': 'application/json'
    },
    body: like(body)
  },
});

export const succeedProductCreation = (state: string, expectedProduct: Product): { state: string | undefined, willRespondWith: ResponseOptions } => ({
  state,
  willRespondWith: {
    status: 201,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: {
        ...expectedProduct,
        id: like(expectedProduct.id),
    },
  }
});

export const failProductCreation = (state: string, expectedErrorMessage: string): { state: string | undefined, willRespondWith: ResponseOptions } => ({
  state,
  willRespondWith: {
    status: 400,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: like({ error: expectedErrorMessage}),
  }
});