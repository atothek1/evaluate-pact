import React from "react";
import { ProductsGrid } from "../../src/components/products/ProductsGrid";
import { render, waitFor } from "../utils";
import { pactWith } from 'jest-pact';
import { filteredProductsRequest, productsRequest, withListOfProductsResponse, withOneAvailableProductInTheListOfProductsResponse } from "./utils/productRequests";

pactWith({ consumer: 'e2e Consumer C', provider: 'e2e Provider', cors: true }, provider => {

    describe("getProducts()", () => {
        beforeEach(async () => {
            await provider.removeInteractions()
            process.env.API_HOST = provider.mockService.baseUrl;
        });
        
        test("integration without filters", async () => {
            await provider.addInteraction({
                ...productsRequest,
                ...withListOfProductsResponse
            })
            const { baseElement, getByRole } = render(<ProductsGrid />);
            expect(getByRole("heading")).toHaveTextContent("FETCHING");

            await waitFor(() => {
                getByRole("list")
            });

            expect(getByRole("list").children).toHaveLength(10);
            // not very usefull i know just for fiddling around
            expect(baseElement).toMatchSnapshot();
        })

        test("with filters", async () => {
            await provider.addInteraction({
                ...filteredProductsRequest({ isAvailable: "true" }),
                ...withOneAvailableProductInTheListOfProductsResponse()
            })

            const { baseElement, getByRole } = render(<ProductsGrid isAvailable={true} />);
            expect(getByRole("heading")).toHaveTextContent("FETCHING");

            await waitFor(() => {
                getByRole("list")
            });

            expect(getByRole("list").children).toHaveLength(1);
            // not very usefull i know just for fiddling around
            expect(baseElement).toMatchSnapshot();
        })
    })
})