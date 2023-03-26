export interface Query {
	search?: string;
	sort?: Sort;
	media?: Set<MediaType>;
}

export enum MediaType {
	Image,
	Video,
	Gif,
}

export enum Sort {
	Newest = "Newest First",
	Hotest = "Hotest",
	HighestRated = "Top Rated",
	LowestRated = "Worst Rated",
}

export function encode_query(query: Query): string | undefined {
	return query.search;
}

export function decode_query(search: string): Query {
	return { search };
}
