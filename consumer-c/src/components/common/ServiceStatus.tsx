import React from "react";

interface ServiceStatusProps {
    readonly children: React.ReactNode;
    readonly isPending: boolean;
    readonly isError: boolean;
    readonly hasData: boolean;
    readonly error: Error | null;
}

export function ServiceStatus(props: ServiceStatusProps) {
    const {children, isPending, isError, hasData, error} = props;
    if (isPending) {
        return (
            <div>
                <h2>FETCHING</h2>
                <p>fetching data ...</p>
            </div>
        );
    }

    if (isError && error) {
        return (
            <div>
                <h2>ERROR</h2>
                <p>fetching data has caused an error.</p>
                <p>{error.message}</p>
                <p>{error.stack}</p>
            </div>
        );
    }

    if (!hasData) {
        return (
            <div>
                <h2>EMPTY</h2>
                <p>no data found</p>
            </div>
        );
    }

    return <>{children}</>;
}
