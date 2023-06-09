import { DEFAULT_QUERY } from "./query";
import type { Booru, Post, Query, Tag, Media, OptionalQuery } from "./types";
import { MediaType, Sort, TagNamespace } from "./types";
import { guess_media_type, guess_mimetype } from "./utils";
import { DEPLOYMENT } from "js/config";
import { DOMParser } from "@xmldom/xmldom";

const BLACKLISTED_TAGS: string[] = [];

const CLIENT_NAME = "Rule34Pics/1.0 (NoHomoZone)";

export class E621 implements Booru {
	url: string = "https://e621.net";
	api_url: string = "https://e621.net";
	short_name: string = "e621";
	display_name: string = "e621";

	get icon() {
		return this.url + "/favicon.ico";
	}

	async is_working() {
		return true;
	}

	generate_url = (id: string) => this.url + `/index.php?page=post&s=view&id=${id}`;

	async search(query: OptionalQuery, page: number = 0): Promise<Post[]> {
		let filled_query: Query = Object.assign({...DEFAULT_QUERY}, query);
		let tags: string[] = [];

		let search = "";

		if (DEPLOYMENT === "dev") {
			tags.push("rating:safe");
		}
		tags.push(...filled_query.include_tags);
		tags.push(...filled_query.exclude_tags.map(tag => `-${tag}`));

		tags.push(get_sort_tag(filled_query.sort));
		tags.push(...BLACKLISTED_TAGS);
		tags.push(...create_media_tags(filled_query));

		search = tags.join(" ");
		search += ` ${filled_query.search} `;

		let params = new URLSearchParams();
		params.set("tags", search);
		params.set("page", page.toString());
		params.set("limit", "64");
		params.set("_client", CLIENT_NAME);

		let url = "https://e621.net/posts.json?" + params.toString();
		let r = await fetch(url);
		let data = await r.json();
		let posts_data: E621Post[] = data["posts"];

		let parsed_posts = posts_data.map(data => {
			try {
				return parse_post(data, this);
			} catch {
				return undefined;
			}
		});
		let posts = parsed_posts.filter(post => post !== undefined) as Post[];
		if (filled_query.media.length === 0 || filled_query.media.length === 3) {
			return posts
		} else {
			return posts.filter(post => filled_query.media.includes(post.type));
		}
	}

	async get(id: string): Promise<Post | undefined> {
		let params = new URLSearchParams();
		params.set("_client", CLIENT_NAME);
		let url = this.api_url + `/posts/${id}.json?${params.toString()}`;
		let r = await fetch(url);
		let data = await r.json();

		if (data["success"] === false) {
			return undefined;
		} else {
			return parse_post(data["post"], this);
		}
	}

	async search_tags(search: string): Promise<Tag[]> {
		type E621Tag = {
			name: string;
			post_count: number;
			category: number;
		};

		let params = new URLSearchParams();
		params.set("search[name_matches]", search + "*");
		params.set("_client", CLIENT_NAME);

		let url = `https://e621.net/tags?format=json&${params.toString()}`;
		let r = await fetch(url);
		let data = await r.json();
		if ("tags" in data) {
			return [];
		}

		let e621_tags: E621Tag[] = data;
		let tags = e621_tags
			.sort((a, b) => b.post_count - a.post_count)
			.map((tag: E621Tag): Tag => {
				let namespace: TagNamespace;
				if (tag.category === 1) {
					namespace = TagNamespace.Creator;
				} else if (tag.category === 3) {
					namespace = TagNamespace.Copyright;
				} else if (tag.category === 4 || tag.category === 5) {
					namespace = TagNamespace.Character;
				} else if (tag.category === 7 || tag.category === 8) {
					namespace = TagNamespace.Meta;
				} else {
					namespace = TagNamespace.Generic;
				}

				return {
					name: tag.name,
					count: tag.post_count,
					namespace: namespace,
				};
			});

		let unique_tags = new Set<string>();
		tags = tags.filter(tag => {
			if (unique_tags.has(tag.name)) {
				return false;
			} else {
				unique_tags.add(tag.name);
				return true;
			}
		});
		return tags;
	}
}

function create_media_tags(query: Query): string[] {
	let media = query.media ?? [];
	const compareArrays = (a: any[], b: any[]) => a.toString() === b.toString();

	if (compareArrays(media, [MediaType.Video])) {
		return ["type:webm"];
	} else if (compareArrays(media, [MediaType.Animation])) {
		return ["type:gif"];
	} else if (compareArrays(media, [MediaType.Image])) {
		return ["-video"]
	} else {
		return []
	}
}

function get_sort_tag(sort: Sort): string {
	switch (sort) {
		case Sort.Top_Rated:
			return "order:score";
		case Sort.Newest:
			return "order:id_desc";
		case Sort.Random:
			return "order:random";
		case Sort.Lowest_Rated:
			return "order:score_asc";
	}
}

function parse_post(data: E621Post, booru: Booru): Post {
	let full = parse_post_media(data.file);

	let preview: Media | undefined;
	if (data.preview.has === true) {
		preview = parse_post_media(data.sample);
	}

	let thumbnail = parse_post_media(data.preview);
	if (thumbnail.type !== MediaType.Image) {
		if (full.type === MediaType.Image) {
			thumbnail = full;
		} else {
			throw new Error("Thumbnail isn't an image");
		}
	}

	let tags = parse_post_tags(data.tags);

	return {
		id: data.id.toString(),
		created_at: new Date(data.created_at).toISOString(),
		description: data.description,
		full,
		preview,
		thumbnail,
		source: data.sources[0] || "",
		title: "",
		origin: `https://e621.net/posts/${data.id}`,
		type: guess_media_type(full.url),
		score: data.score.up,
		tags,
		booru: booru.short_name,
	};
}

function parse_post_media(data: E621File): Media {
	let url;
	if (data.url) {
		url = data.url;
	} else if (data.url === null && data.ext && data.md5) {
		let folder_a = data.md5.substring(0, 2);
		let folder_b = data.md5.substring(2, 4);
		url = `https://static1.e621.net/data/${folder_a}/${folder_b}/${data.md5}${data.ext}`;
	} else {
		throw new Error("Unable to parse media");
	}
	return {
		height: data.height,
		width: data.width,
		url,
		mimetype: guess_mimetype(url),
		type: guess_media_type(url),
	};
}

function parse_post_tags(data: E621Tags): Tag[] {
	function convert(tags: string[], namespace: TagNamespace): Tag[] {
		return tags.map((name): Tag => ({ name, namespace }));
	}
	let tags = [];
	tags.push(
		...convert(data.general.concat(data.invalid).concat(data.lore), TagNamespace.Generic),
	);
	tags.push(
		...convert(data.general.concat(data.invalid).concat(data.lore), TagNamespace.Generic),
	);
	tags.push(...convert(data.character.concat(data.species), TagNamespace.Character));
	tags.push(...convert(data.copyright, TagNamespace.Copyright));
	tags.push(...convert(data.artist, TagNamespace.Creator));
	tags.push(...convert(data.meta, TagNamespace.Meta));

	return tags;
}

type E621Post = {
	id: number;
	created_at: string;
	rating: string;
	sources: string[];
	description: string;
	duration: null;

	file: E621File;
	preview: E621File;
	sample: E621File;

	score: E621Score;
	tags: E621Tags;
};

type E621File = {
	width: number;
	height: number;
	url: string | null;
	md5?: string;
	ext?: string;
	has?: boolean;
};

type E621Score = {
	up: number;
	down: number;
	total: number;
};

type E621Tags = {
	general: string[];
	species: string[];
	character: string[];
	copyright: string[];
	artist: string[];
	invalid: string[];
	lore: string[];
	meta: string[];
};
