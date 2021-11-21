import { Verifier, VerifierOptions } from "@pact-foundation/pact";
import { versionFromGitTag } from "@pact-foundation/absolute-version";

describe("provider/getProducts()", () => {
    const options: VerifierOptions = {
        provider: "e2e Provider",
        logLevel: "info",
        providerBaseUrl: "http://localhost:3001",
        pactBrokerUrl: "http://localhost:9292/",
        consumerVersionTags: ["main"],
        providerVersionTags: ["main"],
        enablePending: true,
        publishVerificationResult: true,
        providerVersion: versionFromGitTag(),
    };
    it("should verify pact successfully", async () => {
        // expect.assertions(1)
        const verifier = new Verifier(options);
        // why getting an string? how to fail the test if verification fails?
        const actual = await verifier.verifyProvider();
        console.log(actual);
    });
});