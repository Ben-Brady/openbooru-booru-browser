import type { Booru, Post, Query, Tag } from "../types";
import { Sort, MediaType, TagNamespace } from "../types";
import { parse_xml_nodes } from "./utils";
import { CORS_PROXY, DEPLOYMENT } from "js/config";

const BLACKLISTED_TAGS: string[] = []

export abstract class Gelbooru2 implements Booru {
	url!:string
	api_url!:string
	short_name!: string;
	display_name!: string;

	get icon() {
		return this.url + "/favicon.ico";
	}

	async is_working() {
		return true;
	}

	generate_url(id: string): string {
		return this.url + `/index.php?page=post&s=view&id=${id}`;
	}


	async search(query: Query, page: number = 0): Promise<Post[]> {
		let tags: string[] = []
		if (DEPLOYMENT === "dev") {
			tags.push("rating:safe")
		}
		if (query.include_tags) {
			tags.push(...query.include_tags);
		}
		if (query.exclude_tags) {
			let exclude_tags = query.exclude_tags.map(tag => `-${tag}`);
			tags.push(...exclude_tags);
		}
		tags.push(get_sort_tag(query));
		tags.push(...BLACKLISTED_TAGS);

		let search = tags.join(" ");
		search += ` ${query.search ?? ""} `;
		search += create_media_tags(query);

		let params = new URLSearchParams();
		params.set("tags", search ?? "");
		params.set("pid", page.toString());
		params.set("limit", "64");

		let url = this.api_url + "/index.php?page=dapi&s=post&q=index&" + params.toString();
		let r = await fetch(url);
		let body = await r.text();
		let posts = parse_xml_nodes(body, this);
		return posts;
	}

	async get(id: string): Promise<Post | undefined> {
		let url = this.api_url + `/index.php?page=dapi&s=post&q=index&id=${id}`;
		let r = await fetch(url);
		let body = await r.text();
		let posts = parse_xml_nodes(body, this);

		if (posts.length == 1) {
			return posts[0];
		} else {
			return undefined;
		}
	}

	async search_tags(search: string): Promise<Tag[]> {
		type GelbooruTag = {
			label: string;
			value: string;
		};

		let url = this.url;
		url += "/autocomplete.php"
		url += "?"
		url += new URLSearchParams({ q: search })

		url = CORS_PROXY + encodeURI(url)
		let r = await fetch(url);
		let raw_tags: GelbooruTag[] = await r.json();

		return raw_tags.map((tag: GelbooruTag): Tag => {
			let name = tag.value;

			let count_match = tag.label.match(/\((\d+)\)/);
			let count = 0;
			if (count_match) {
				count = Number(count_match[1])
			}

			return { name, count, namespace: TagNamespace.Generic }
		});
	}
}


function create_media_tags(query: Query): string {
	if (query.media === undefined) return ""
	if (query.media.length === 0) return ""

	let images = query.media.includes(MediaType.Image);
	let videos = query.media.includes(MediaType.Video);
	let gifs = query.media.includes(MediaType.Animation);

	// Some videos are tagged as gif
	// So was can't do -gif if we need videos
	// GIF filtering is hard :(
	if (images && !videos && !gifs) {
		return " -gif -video "
	} else if (gifs && videos && !images) {
		return " ( video ~ gif ) ";
	} else if (gifs && !videos && !images) {
		return " gif -video ";
	} else if (videos && !gifs && !images) {
		return " video "
	} else if (gifs && images && !videos) {
		return " -video ";
	} else {
		return ""
	}
}
function get_sort_tag(query: Query): string {
	let sort = query.sort ?? Sort.Top_Rated;
	switch (sort) {
		case Sort.Top_Rated: return "sort:score"
		case Sort.Lowest_Rated: return "sort:score:asc"
		case Sort.Hotest: return `sort:score`
		case Sort.Newest: return "sort:id"
	}
}
