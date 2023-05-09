import type { OptionalQuery } from "js/booru";
import { encode_query } from "js/booru/query";

export const HOME = "/";
export const INFO = "/info";
export const ABOUT_US = "/info/about";
export const CONTACT_US = "/info/contact";
export const TOS = "/info/tos";

export function generate_post_link(id: string | number, booru: string): string {
	return`/post/${booru}/${id}`;
}

export function generate_tag_link(tag: string): string {
	return generate_posts_link({ search: tag });
}

export function generate_posts_link(query: OptionalQuery, booru: string | undefined = undefined) {
	let path = "/posts";
	if (booru) {
		path += `/${booru}`;
	}

	if (query) {
		let params = encode_query(query);
		if (params.toString() !== "") {
			return (path += `?${params.toString()}`);
		}
	}

	return path;
}

export default {
	home: HOME,
	generate_post_link,
	generate_posts_link,
	ABOUT_US,
	CONTACT_US,
	TOS,
	INFO,
};
