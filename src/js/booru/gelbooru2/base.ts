import type { Booru, Post, Query } from "../types";
import { Sort } from "../query";
import { parse_xml_nodes } from "./utils";
import cache from "js/cache";
import { CORS_PROXY } from "js/config";

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

	async get_recent_top_id(): Promise<number> {
		return cache.use_cache_async(`${this.short_name}-top_id`, 60 * 60, async () => {
			let url = this.api_url + `/index.php?page=dapi&s=post&q=index&json=1`;
			let r = await fetch(url);
			let posts = await r.json();
			let post = posts[0];
			return post["id"];
		});
	}

	async search(query: Query, index: number = 0): Promise<Post[]> {
		let search = query.search ?? "";
		
		let top_id = await this.get_recent_top_id();
		let recent_id = Math.max(top_id * 0.9, top_id - 100_000);
		const SORT_LOOKUP = new Map<Sort, string>([
			[Sort.HighestRated, "sort:score"],
			[Sort.LowestRated, "sort:score:asc"],
			[Sort.Hotest, `sort:score id:>=${recent_id}`],
			[Sort.Newest, "sort:id"],
		]);
		search += " " + SORT_LOOKUP.get(query.sort ?? Sort.Hotest);
		

		let params = new URLSearchParams();
		params.set("tags", search ?? "");
		params.set("pid", String(index / 100));
		params.set("limit", "100");

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

	async search_tags(search: string): Promise<string[]> {
		type Tag = {
			label: string;
			value: string;
		};

		let url = this.url;
		url += "/autocomplete.php"
		url += "?"
		url += new URLSearchParams({ q: search })
		
		url = CORS_PROXY + encodeURI(url)
		let r = await fetch(url);
		let tags: Tag[] = await r.json();
		return tags.map(tag => tag.value);
	}
}

