import type { Booru, Post, Query } from "./types";
import { Sort } from "./query";
import { parse_xml_nodes } from "./gelbooru_2";

export const Rule34: Booru = {
	short_name: "r34",
	display_name: "rule34.xxx",

	async is_working() {
		return true;
	},

	generate_url(id: string): string {
		return `https://rule34.xxx/index.php?page=post&s=view&id=${id}`;
	},

	async search(query: Query, index: number = 0): Promise<Post[]> {
		let search = query.search ?? "";
		if (query.sort == Sort.HighestRated) {
			search += "sort:score";
		} else if (query.sort == Sort.LowestRated) {
			search += "sort:score:asc";
		} else if (query.sort == Sort.Hotest) {
			search += "sort:score id:>=7000000";
		} else if (query.sort == Sort.Newest) {
			search += "sort:id";
		}

		let url = "https://api.rule34.xxx/index.php?page=dapi&s=post&q=index";
		let params = new URLSearchParams();
		params.set("tags", search ?? "");
		params.set("pid", String(index / 100));
		params.set("limit", "100");

		let r = await fetch(url + "&" + params.toString());
		let body = await r.text();
		let posts = parse_xml_nodes(body, Rule34);
		return posts;
	},

	async get(id: string): Promise<Post | undefined> {
		let posts = await this.search({ search: `id:${id}` }, 0);
		if (posts.length == 1) {
			return posts[0];
		} else {
			return undefined;
		}
	},

	async search_tags(search: string): Promise<string[]> {
		type Tag = {
			label: string;
			value: string;
		};

		const URL = "https://rule34.xxx/autocomplete.php";
		let params = new URLSearchParams({ q: search });
		let r = await fetch(URL + "?" + params.toString());
		let tags: Tag[] = await r.json();
		return tags.map(tag => tag.value);
	},
}
