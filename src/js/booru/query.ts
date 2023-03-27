import { type Query, Sort, MediaType } from "./types";


export function encode_query(query: Query): string {
	let search = "";
	if (query.sort) {
		if (query.sort === Sort.Hotest) search += "sort:hotest-"
		if (query.sort === Sort.Newest) search += "sort:newest-"
		if (query.sort === Sort.Top_Rated) search += "sort:best-"
		if (query.sort === Sort.Lowest_Rated) search += "sort:worst-"
	}

	if (query.media) {
		if (query.media.includes(MediaType.Image)) search += "media:image-"
		if (query.media.includes(MediaType.Animation)) search += "media:animation-"
		if (query.media.includes(MediaType.Video)) search += "media:video-"
	}

	if (query.search) {
		search += `-"${query.search}" `
	}
	return search
}

export function decode_query(search: string): Query {
	let query: Query = {};
	if (search.includes("sort:hotest ")) query.sort = Sort.Hotest;
	if (search.includes("sort:newest ")) query.sort = Sort.Newest;
	if (search.includes("sort:best ")) query.sort = Sort.Top_Rated;
	if (search.includes("sort:worst ")) query.sort = Sort.Lowest_Rated;
	
	query.media = []
	if (search.includes("media:image")) query.media.push(MediaType.Image);
	if (search.includes("media:animation")) query.media.push(MediaType.Animation);
	if (search.includes("media:video")) query.media.push(MediaType.Video);
	
	let sections = search.split('\"');
	query.search = sections.at(-2);
	return query
}
