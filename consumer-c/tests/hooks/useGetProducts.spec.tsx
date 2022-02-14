// Setup of mocked api backend endpoints
import * as data from "../../pact/pacts/e2e_consumer_c-e2e_provider.json"
import { useGetProducts } from "../../src/hooks/useGetProducts";
import { createMockServer, renderHook, rest, sleep } from "../utils";

const products = data.interactions
    .find(interaction => 
        interaction.description === "a request for fetching all products" &&
        interaction.providerState === "has a collection of products"
    )?.response.body

const mockServer = createMockServer(
    rest.get("/v1/products", async (_req, res, ctx) => {
        await sleep(100);
        return res(ctx.json(products));
    }),
);

// Enable API mocking before tests.
beforeAll(() => mockServer.listen());

// Disable API mocking after the tests are done.
afterAll(() => mockServer.close());

describe("context-c/hooks/useGetProducts()", () => {
    it("should return init state", () => {
        const {result} = renderHook(() => useGetProducts());
        const {isPending, isError, data, error} = result.current;

        expect(isPending).toBeTruthy();
        expect(isError).toBeFalsy();
        expect(data).toBeNull();
        expect(error).toBeNull();
    });

    it("should return init state and resolve", async () => {
        const {result, waitForNextUpdate} = renderHook(() => useGetProducts());
        const {isPending, isError, data, error} = result.current;

        expect(isPending).toBeTruthy();
        expect(isError).toBeFalsy();
        expect(data).toBeNull();
        expect(error).toBeNull();

        await waitForNextUpdate();

        expect(result.current.data).not.toBeNull();
        expect(result.current.data).toBeInstanceOf(Array);
        expect(result.current.isPending).toBeFalsy();
        expect(result.current.isError).toBeFalsy();
        expect(result.current.error).toBeNull();
    });
})