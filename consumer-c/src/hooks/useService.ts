import { useEffect, useRef, useState } from "react";
import { ServiceOptions } from "../types";

interface ServiceFn<TData> {
    (options?: ServiceOptions): Promise<TData>;
}

export interface UseServiceState<TData> {
    readonly isPending: boolean;
    readonly data: TData | null;
    readonly isError: boolean;
    readonly error: any
}

interface UseServiceOptions<TData = any> extends ServiceOptions {
    readonly isLazy?: boolean;

    resolver?(response: any): TData;
}

function defaultResolver(response: any) {
    return response;
}

export function useService<TData>(service: ServiceFn<TData>, options: UseServiceOptions<TData> = {
    isLazy: false
}): UseServiceState<TData> {

    const {isLazy = false, resolver = defaultResolver, ...serviceOptions} = options;
    const [state, setState] = useState<UseServiceState<TData>>({
        isPending: false,
        data: null,
        isError: false,
        error: null
    });

    const requestRef = useRef<any>(null);

    function createRequestRef() {
        if (requestRef.current === null) {
            requestRef.current = {
                state,
                setState,
                async execute() {
                    requestRef.current?.setState((prevState: UseServiceState<TData>) => ({
                        ...prevState,
                        isPending: true
                    }));
                    try {
                        let {baseUrl = "", params} = serviceOptions;
                        // TODO: temporary workaround to work with pact-js as it is not supporting relative path without a host:port url
                        if (__IS_TESTING__) {
                            baseUrl = process.env.API_HOST ?? "";
                        }
                        const response = await service({baseUrl, params}) as TData;
                        const data = resolver(response);
                        requestRef.current?.setState((prevState: UseServiceState<TData>) => ({
                            ...prevState,
                            isPending: false,
                            data
                        }))
                    } catch (error) {
                        requestRef.current?.setState((prevState: UseServiceState<TData>) => ({
                            ...prevState,
                            isPending: false,
                            isError: true,
                            error
                        }))
                    }
                },
                dispose() {
                    requestRef.current = null;
                }
            };
        }
        return requestRef.current;
    };

    const request = createRequestRef();
    useEffect(() => {
        if (!isLazy) {
            request.execute();
        }
        return request.dispose;
    }, [isLazy, request]);
    return state;
}