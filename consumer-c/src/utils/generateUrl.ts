import { isEmpty } from "./isEmpty";

export type ValidParameterValue = string | undefined | null | boolean | number;

export interface UrlParams {
    readonly query?: Record<string, ValidParameterValue> | null;
    readonly path?: Record<string, string> | null;
}

function isValidParameterValue(value: ValidParameterValue): value is string | number | boolean {
    return !isEmpty(value);
}

function sanitizeQueryParameters(queryParams: Record<string, ValidParameterValue>): Record<string, string> {
    return Object.entries(queryParams).reduce((result, [key, value]) => {
        if (!isValidParameterValue(value)) {
            return result;
        }
        result[key] = value.toString();
        return result;
    }, {} as Record<string, string>);
}

export function generateUrl(path: string, params: UrlParams = {path: null, query: null}): string {
    const {path: pathParams = null, query: queryParams = null} = params;
    let url = path;
    let queryStr = "";
    if (queryParams !== null) {
        queryStr = new URLSearchParams(sanitizeQueryParameters(queryParams)).toString();
        queryStr = queryStr.length > 0 ? "?" + queryStr : "";
    }
    if (pathParams !== null) {
        url = Object.entries(pathParams).reduce((result, [key, value]) => {
            result = result.split(`{${key}`).join(value);
            return result;
        }, url);
    }
    return url + (queryStr ?? "");
}