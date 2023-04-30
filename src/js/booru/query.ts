import { type Query, Sort, MediaType } from "./types";


export function encode_query(query: Query): URLSearchParams {
	let params = new URLSearchParams();
	let search = "";
	if (query.sort) {
		if (query.sort === Sort.Hotest) params.set("sort", "hotest")
		if (query.sort === Sort.Newest) params.set("sort", "newest")
		if (query.sort === Sort.Top_Rated) params.set("sort", "best")
		if (query.sort === Sort.Lowest_Rated) params.set("sort", "worst")
	}

	if (query.media && query.media.length > 0) {
		let media = []
		if (query.media.includes(MediaType.Image)) media.push("image");
		if (query.media.includes(MediaType.Animation)) media.push("animation");
		if (query.media.includes(MediaType.Video)) media.push("video");

		params.set("media", media.join("-"));
	}

	if (query.search) {
		params.set("search", query.search);
	}

	if (query.include_tags) {
		params.set("include", JSON.stringify(query.include_tags));
	}
	if (query.exclude_tags) {
		params.set("exclude", JSON.stringify(query.exclude_tags));
	}

	return params;
}

export function decode_query(params: URLSearchParams): Query {
	let query: Query = {};

	let include_param = params.get("include");
	if (include_param) query.include_tags = JSON.parse(include_param);

	let exclude_param = params.get("exclude");
	if (exclude_param) query.exclude_tags = JSON.parse(exclude_param);

	let search_param = params.get("search")
	if (search_param) query.search = search_param;

	let sort_param = params.get("sort");
	if (sort_param) {
		if (sort_param == "newest") query.sort = Sort.Newest;
		if (sort_param === "best") query.sort = Sort.Top_Rated;
		if (sort_param === "worst") query.sort = Sort.Lowest_Rated;
	}

	let media_param = params.get("media");
	if (media_param) {
		query.media = [];
		if (media_param.includes("image")) query.media.push(MediaType.Image);
		if (media_param.includes("animation")) query.media.push(MediaType.Animation);
		if (media_param.includes("video")) query.media.push(MediaType.Video);
	}

	return query;
}
