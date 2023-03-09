export interface Query {
    search: string
    sort?: Sort
}

export enum Sort {
    Newest = "Newest First",
    Hotest = "Hotest",
    HighestRated = "Top Rated",
    LowestRated = "Least Rated",
}

export function encode_query(query: Query): string {
    return query.search
}

export function decode_query(search: string): Query {
    return { search }

}