import { Verifier, VerifierOptions } from "@pact-foundation/pact";
import { versionFromGitTag } from "@pact-foundation/absolute-version";
import { Product } from "../src/types";
import { createProduct, productRepository } from "../src/data/products";
import { server } from "../src"

function createProducts(count: number = 10): Product[] {
    const res: Product[] = [];
    for (let i = 0; i < count; i++) {
        res.push(createProduct());
    }
    return res
}

const withData = () => {
    return new Promise((resolve) => {
        productRepository.clear()
        productRepository.add(...createProducts(10));
        return resolve("Set up with products")
    })
}

describe("provider/getProducts()", () => {
    const options: VerifierOptions = {
        provider: "e2e Provider",
        logLevel: "info",
        providerBaseUrl: "http://localhost:3001",
        pactBrokerUrl: "http://localhost:9292/",
        consumerVersionTags: ["main"],
        providerVersionTags: ["main"],
        enablePending: false,
        publishVerificationResult: true,
        providerVersion: versionFromGitTag(),
        stateHandlers: {
            "has no products": () => {
                productRepository.clear()
                return new Promise((resolve) => {
                    console.log(`Set up with no products`)
                    resolve(`Set up with no products`);
                })
            },
            "fails if required field is missing": withData,
            "succeeds for a valid product": withData,
            "has a collection of products": withData,
            "has a collection of products that are available": withData,
        }
    };

    it("should verify pact successfully", async () => {
        return new Verifier(options).verifyProvider().then(output => {
            console.log("=== Pact Verification Complete!")
            console.log(output)
            server.close(() => {})
        })
    });
});