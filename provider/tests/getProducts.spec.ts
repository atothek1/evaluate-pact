import { Verifier } from "@pact-foundation/pact";

describe("provider/getProducts()", () => {
    const options = {
        provider: "e2e Provider",
        logLevel: "info",
        providerBaseUrl: "http://localhost:3001",

        // Fetch pacts from broker
        pactBrokerUrl: "http://localhost:9292/",

        // Fetch from broker with given tags
        consumerVersionTags: ["main"],

        // Tag provider version with given tags
        providerVersionTags: ["main"], // in real code, this would be dynamically set by process.env.GIT_BRANCH

        // Enables "pending pacts" feature
        enablePending: true,
    };
    it("", () => {

        return new Verifier(options).verifyProvider().then(output => {
            console.log("Pact Verification Complete!")
            console.log(output)
        })
    });
});