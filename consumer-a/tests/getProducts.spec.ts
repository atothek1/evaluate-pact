import { products as mockedProducts } from "../fixtures/getProducts/200";
import { Pact, Matchers } from "@pact-foundation/pact";
import { resolve } from "path";
import { getProducts } from "../src";

const {like} = Matchers;

const mockedProvider = new Pact({
    consumer: "e2e Consumer A",
    provider: "e2e Provider",
    // port: 9292,
    log: resolve(process.cwd(), "logs", "mockserver-integration.log"),
    dir: resolve(process.cwd(), "pacts"),
    logLevel: "warn",
    spec: 2,
})

beforeAll(() => mockedProvider.setup().then(options => {
    console.log(`http://localhost:${options.port}`);
    process.env.API_HOST = `http://localhost:${options.port}`;
}));

afterAll(() => mockedProvider.finalize());

afterEach(() => mockedProvider.verify());

describe("consumer-a/getProducts()", () => {

    beforeEach(() => {
        mockedProvider.addInteraction({
            state: "has a collection of products",
            uponReceiving: "a request for fetching all products",
            withRequest: {
                method: "GET",
                path: "/v1/products",
            },
            willRespondWith: {
                status: 200,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: like(mockedProducts),
            },
        })
    });

    it("200", async () => {
        const actual = await getProducts(process.env.API_HOST);
        const expected = expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
            isAvailable: expect.any(Boolean),
            price: expect.any(Number),
            imageUrls: expect.arrayContaining([expect.any(String)])
        });
        expect(actual).toBeDefined();
        expect(actual).toBeInstanceOf(Array);
        expect(actual[0]).toMatchObject(expected)
        expect(true).toBeTruthy();
    });
})