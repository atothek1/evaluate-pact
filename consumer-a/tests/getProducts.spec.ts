import { pactWith } from 'jest-pact';
import { API, api } from "../src";
import { productsRequest, withListOfProductsRequest } from "provider/src/endpoints";

pactWith({ consumer: 'e2e Consumer A', provider: 'e2e Provider' }, provider => {
    let client: API;
  
    beforeEach(() => {
      client = api(provider.mockService.baseUrl)
    });
  
    describe('getProducts()', () => {
  
      beforeEach(() =>
        provider.addInteraction({
          ...productsRequest,
          ...withListOfProductsRequest
        })
      );
  
      it('returns a list of products', () =>
        client.getProducts().then(products => {
          expect(products).toMatchSnapshot()
        }));
    });
})