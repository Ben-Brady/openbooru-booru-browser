import { type OptionalQuery, type Query, Sort, MediaType } from "./types";


export function encode_query(query: OptionalQuery): URLSearchParams {
	let params = new URLSearchParams();
	if (DEFAULT_QUERY.sort !== query.sort) {
		if (query.sort === Sort.Random) params.set("sort", "random");
		if (query.sort === Sort.Newest) params.set("sort", "newest");
		if (query.sort === Sort.Top_Rated) params.set("sort", "best");
		if (query.sort === Sort.Lowest_Rated) params.set("sort", "worst");
	}

	if (query.media && query.media.length > 0) {
		let media = [];
		if (query.media.includes(MediaType.Image)) media.push("image");
		if (query.media.includes(MediaType.Animation)) media.push("animation");
		if (query.media.includes(MediaType.Video)) media.push("video");

		params.set("media", media.join("-"));
	}

	if (query.search) {
		params.set("search", query.search);
	}

	if (query.include_tags && query.include_tags.length > 0) {
		params.set("include", JSON.stringify(query.include_tags));
	}
	if (query.exclude_tags && query.exclude_tags.length > 0) {
		params.set("exclude", JSON.stringify(query.exclude_tags));
	}

	return params;
}

export function decode_query(params: URLSearchParams): Query {
	let search = params.get("search") ?? "";
	let include = JSON.parse(params.get("include") ?? "[]");
	let exclude = JSON.parse(params.get("exclude") ?? "[]");
	let sort = (() => {
		switch (params.get("sort")) {
			case "newest":
				return Sort.Newest;
			case "best":
				return Sort.Top_Rated;
			case "random":
				return Sort.Random;
			case "worst":
				return Sort.Lowest_Rated;
			default:
				return DEFAULT_QUERY.sort;
		}
	})();

	let media = (() => {
		let media_param = params.get("media") ?? "";
		let media = [];
		if (media_param.includes("image")) media.push(MediaType.Image);
		if (media_param.includes("animation")) media.push(MediaType.Animation);
		if (media_param.includes("video")) media.push(MediaType.Video);
		return media;
	})();

	return {
		search: search,
		media: media,
		include_tags: include,
		exclude_tags: exclude,
		sort: sort,
	};
}

export const DEFAULT_QUERY: Query = {
	include_tags: [],
	exclude_tags: [],
	media: [],
	search: "",
	sort: Sort.Top_Rated,
};
