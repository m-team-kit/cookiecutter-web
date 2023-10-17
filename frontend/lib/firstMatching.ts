import type { ParsedUrlQuery } from 'querystring';

export const firstMatching = (query: ParsedUrlQuery, key: string) => {
    const value = query[key];
    if (Array.isArray(value)) {
        return value[0];
    }
    return value;
};
