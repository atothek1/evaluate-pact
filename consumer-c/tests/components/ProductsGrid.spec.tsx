import React from "react";
import { products } from "../../fixtures/getProducts/200";
import { ProductsGrid } from "../../src/components/products/ProductsGrid";
import { render, waitFor } from "../utils";
import { Pact, Matchers } from "@pact-foundation/pact";
import { resolve } from "path";

const { like } = Matchers;

const mockedProvider = new Pact({
    consumer: "e2e Consumer C",
    provider: "e2e Provider",
    cors: true,
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

describe("consumer-c/components/products/ProductsGrid", () => {
    describe("integration without filters", () => {
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
                    body: like(products),
                },
            })
        });

        it("should render ProductsGrid component with all products", async () => {
            const {baseElement, getByRole} = render(<ProductsGrid/>);
            expect(getByRole("heading")).toHaveTextContent("FETCHING");

            await waitFor(() => {
                getByRole("list")
            });

            expect(getByRole("list").children).toHaveLength(10);
            // not very usefull i know just for fiddling around
            expect(baseElement).toMatchSnapshot();
        });
    });

    describe("integration with filters", () => {
        beforeEach(() => {
            mockedProvider.addInteraction({
                state: "has a collection of products that are available",
                uponReceiving: "a request for fetching available products",
                withRequest: {
                    method: "GET",
                    path: "/v1/products",
                    query: {isAvailable: "true"}
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    },
                    body: like(products.filter(p => p.isAvailable)),
                },
            })
        });

        it("should render ProductsGrid component with only available products", async () => {
            const {baseElement, getByRole} = render(<ProductsGrid isAvailable={true}/>);
            expect(getByRole("heading")).toHaveTextContent("FETCHING");

            await waitFor(() => {
                getByRole("list")
            });

            expect(getByRole("list").children).toHaveLength(1);
            // not very usefull i know just for fiddling around
            expect(baseElement).toMatchSnapshot();
        });
    });
});