export function isEmpty( input: any ): boolean {
    if( input === undefined || input === null || (typeof input === "string" && input === "" ) ) {
        return true;
    }
    if( Array.isArray( input ) && input.length === 0 ) {
        return true;
    }
    return false;
}