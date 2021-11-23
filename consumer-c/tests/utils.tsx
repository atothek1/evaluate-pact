import "whatwg-fetch";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import React, { ComponentType, ReactElement } from "react";
import { RequestHandler } from "msw/lib/types/handlers/RequestHandler";
import { setupServer, SetupServerApi } from "msw/node";
import { rest as mswRest } from "msw";
import { render, RenderOptions, RenderResult } from "@testing-library/react";

let mockServer: SetupServerApi | null = null;
let orgUse: SetupServerApi["use"] | null = null;

export function sleep(ms: number, callback?: () => any): Promise<number> {
    return new Promise((resolve) => {
        return setTimeout(() => {
            resolve(!!callback ? callback() : undefined);
        }, ms);
    });
}

export function createMockServer(...handlers: RequestHandler[]): SetupServerApi {
    if (mockServer === null) {
        mockServer = setupServer();
        orgUse = mockServer.use.bind(mockServer);
        mockServer.use = () => {
            throw new Error("register mocked request handlers via the the createMockServer. Adding mocked request handler in test is not possible.");
        };
    }
    if (Array.isArray(handlers) && handlers.length > 0) {
        orgUse!(...handlers);
    }
    return mockServer;
}

type RestFactoryProxy = typeof mswRest;
export const rest: RestFactoryProxy = mswRest;
export * from "@testing-library/react";

export {
    act as invoke,
    renderHook,
    RenderHookOptions,
    RenderHookResult,
} from "@testing-library/react-hooks";

function AllProviders({children}: { readonly children: React.ReactNode }): JSX.Element {
    return (
        <>
            {children}
        </>
    );
}

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, "queries">,
): RenderResult => render(ui, {
    wrapper: AllProviders as ComponentType,
    ...options
});

export { customRender as render };
export { default as userEvent } from "@testing-library/user-event";
