import type { Booru, Post, Query } from "../types";
import { Sort, MediaType } from "../types";
import { parse_xml_nodes } from "./utils";
import { CORS_PROXY } from "js/config";
import Cache from "js/cache";

const BLACKLISTED_TAGS = [
	"gore",
	"scat",
	"shit",
	"pissing",
	"smegma",
	"musk",
	"fart_fetish",
	"fart_cloud",
	"fart",
	"mlp",
	"my_little_pony",
	"friendship_is_magic",
	"incest",
	"gore",
	"cannibalism",
	"implied_cannibalism",
	"necrophilia",
]

// To comply with UK Pornography Laws
const UK_BLACKLISTED_TAGS = [
	"rape",
	"necrophilia",
	"gaping",
	"bestiality",
	"equine",
	"horse",
	"dog",
]

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
		let search = query.search ?? "";
		search += await this.create_sort_tag(query);
		search += await this.create_media_tags(query);
		search += " " + BLACKLISTED_TAGS.map(tag => "-" + tag).join(" ") + " ";
		search += " " + UK_BLACKLISTED_TAGS.map(tag => "-" + tag).join(" ") + " ";

		let params = new URLSearchParams();
		params.set("tags", search ?? "");
		params.set("pid", page.toString());
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

	private async create_media_tags(query: Query): Promise<string> {
		if (query.media === undefined) return ""
		if (query.media.length === 0) return ""

		let include_images = query.media.includes(MediaType.Image);
		let include_videos = query.media.includes(MediaType.Video);
		let include_animations = query.media.includes(MediaType.Animation);
		
		if (include_images && include_videos && include_animations) {
			return ""
		} else if (include_images && !include_videos && include_animations) {
			return " -video "
		} else if (include_images && include_videos && !include_animations) {
			return " "
		}  else if (include_images && !include_videos && !include_animations) {
			return " -video -gif "
		} else if (!include_images && include_videos && include_animations) {
			return " ( video ~ gif ) "
		} else if (!include_images && include_videos && !include_animations) {
			return " video "
		} else if (!include_images && !include_videos && include_animations) {
			return " gif "
		} else {
			return ""
		}
	}

	private async create_sort_tag(query: Query): Promise<string> {
		let top_id = await this.get_recent_top_id();
		let recent_id = Math.max(top_id * 0.9, top_id - 100_000);
		const SORT_LOOKUP = new Map<Sort, string>([
			[Sort.Top_Rated, "sort:score"],
			[Sort.Lowest_Rated, "sort:score:asc"],
			[Sort.Hotest, `sort:score id:>=${recent_id}`],
			[Sort.Newest, "sort:id"],
		]);
		let sort = query.sort ?? Sort.Newest;
		return ` ${SORT_LOOKUP.get(sort)} `;
	}

	private async get_recent_top_id(): Promise<number> {
		return Cache.use_cache_async(`${this.short_name}-top_id`, 60 * 60, async () => {
			let url = this.api_url + `/index.php?page=dapi&s=post&q=index&json=1`;
			let r = await fetch(url);
			let posts = await r.json();
			let post = posts[0];
			return post["id"];
		});
	}
}
