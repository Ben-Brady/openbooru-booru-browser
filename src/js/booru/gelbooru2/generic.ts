import { DEFAULT_QUERY } from "../query";
import type { Booru, Post, Query, OptionalQuery, Tag } from "../types";
import { Sort, MediaType, TagNamespace } from "../types";
import { parse_xml_nodes } from "./xml";
import { CORS_PROXY, DEPLOYMENT } from "js/config";
import { DOMParser } from "@xmldom/xmldom";

const BLACKLISTED_TAGS: string[] = [];

export abstract class Gelbooru2 implements Booru {
	url!: string;
	api_url!: string;
	short_name!: string;
	display_name!: string;

	get icon() {
		return this.url + "/favicon.ico";
	}

	is_working = async () => true;
	generate_url = (id: string) => `${this.url}/index.php?page=post&s=view&id=${id}`;

	async search(query: OptionalQuery, page: number = 0): Promise<Post[]> {
		let filled_query: Query = Object.assign({ ...DEFAULT_QUERY }, query);
		let tags: string[] = [];
		if (DEPLOYMENT === "dev") tags.push("rating:safe");

		tags.push(...filled_query.include_tags);
		tags.push(...filled_query.exclude_tags.map(tag => `-${tag}`));
		tags.push(...BLACKLISTED_TAGS);

		let search = tags.join(" ");
		search += ` ${query.search ?? ""} `;
		search += create_media_tags(filled_query);

		// Needs to be done later so it knows how many posts the search has
		if (query.sort == Sort.Random) {
			let posts = await this.get_search_size(search);
			let pages = Math.ceil(posts / 64);
			page = Math.floor(Math.random() * pages);
			filled_query.sort = Sort.Newest;
		}

		let sort = await this.get_sort_tag(filled_query.sort);
		search += ` ${sort} `;

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
		url += "/autocomplete.php";
		url += "?";
		url += new URLSearchParams({ q: search });

		url = CORS_PROXY + encodeURI(url);
		let r = await fetch(url);
		let raw_tags: GelbooruTag[] = await r.json();

		return raw_tags.map((tag: GelbooruTag): Tag => {
			let name = tag.value;

			let count_match = tag.label.match(/\((\d+)\)/);
			let count = 0;
			if (count_match) {
				count = Number(count_match[1]);
			}

			return { name, count, namespace: TagNamespace.Generic };
		});
	}

	async get_sort_tag(sort: Sort): Promise<string> {
		switch (sort) {
			case Sort.Top_Rated:
				return "sort:score";
			case Sort.Lowest_Rated:
				return "sort:score:asc";
			case Sort.Newest:
				return "sort:id";
			case Sort.Random:
				throw Error("Random sort shouldn't request a sort_tag");
		}
	}

	async get_search_size(search: string): Promise<number> {
		let params = new URLSearchParams();
		params.set("tags", search);
		params.set("limit", "0");

		let url = this.api_url + "/index.php?page=dapi&s=post&q=index&" + params.toString();
		let r = await fetch(url);
		let body = await r.text();

		const parser = new DOMParser();
		const document = parser.parseFromString(body, "application/xml");
		const search_node = Array.from(document.getElementsByTagName("posts"))[0];
		return Number(search_node.getAttribute("count"));
	}
}


function create_media_tags(query: Query): string {
	if (query.media === undefined) return "";
	if (query.media.length === 0) return "";

	let images = query.media.includes(MediaType.Image);
	let videos = query.media.includes(MediaType.Video);
	let gifs = query.media.includes(MediaType.Animation);

	// Some videos are tagged as gif
	// So was can't do -gif if we need videos
	// GIF filtering is hard :(
	if (images && !videos && !gifs) {
		return " -gif -video ";
	} else if (gifs && videos && !images) {
		return " ( video ~ gif ) ";
	} else if (gifs && !videos && !images) {
		return " gif -video ";
	} else if (videos && !gifs && !images) {
		return " video ";
	} else if (gifs && images && !videos) {
		return " -video ";
	} else {
		return "";
	}


}


