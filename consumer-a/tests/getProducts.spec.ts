import { pactWith } from 'jest-pact';
import { ProductApi } from "../src";
import { productsRequest, withListOfProductsRequest } from "provider/src/endpoints";
import { Matchers } from '@pact-foundation/pact';
import { createProduct } from 'provider/src/data/products';
import { Product } from '../src/types';
import { addProduct, failProductCreation, succeedProductCreation } from './productRequests';

const { like } = Matchers;

pactWith({ consumer: 'e2e Consumer A', provider: 'e2e Provider' }, provider => {
  let client: ProductApi;

  beforeEach(async () => {
    await provider.removeInteractions()
    client = new ProductApi(provider.mockService.baseUrl)
  });

  describe('getProducts()', () => {

    test('if products are available, it returns a list of products', async () =>{      
      await provider.addInteraction({
        ...productsRequest,
        ...withListOfProductsRequest
      })
      await client.getProducts().then(products => {
        expect(products).toMatchSnapshot()
      })
    });

    test('if no products are available, it returns an empty list', async () =>{      
      await provider.addInteraction({
        ...productsRequest,
        state: "has no products",
        willRespondWith: {
            status: 200,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: like([]),
        }
      })
      await client.getProducts().then(products => {
        expect(products).toMatchSnapshot()
      })
    });
  });

  test('adding a product fails if required field is missing', async () => {
      const product = {
        ...createProduct(),
        description: undefined
      } as any as Product;
      
      await provider.addInteraction({
        ...addProduct(product),
        ...failProductCreation('fails if required field is missing', "Missing field 'description' in payload")
      })
      await client.addProduct(product as any as Product).catch(error => {
        expect(error).toMatchSnapshot()
      })
      expect.assertions(1)
    });
    
   test('adding a product succeeds for a valid product', async () => {
      const product = createProduct() as any as Product;
      await provider.addInteraction({
        ...addProduct(product),
        ...succeedProductCreation('succeeds for a valid product', product)
      })
      await client.addProduct(product).then(product => {
        expect(product).toMatchSnapshot()
      })
      expect.assertions(1)
    });
})