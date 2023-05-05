import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { attempt_get_booru, type Post } from "js/booru";
import { decode_query } from "js/booru/query";

export const load: PageServerLoad = async ({ url, params }) => {
	let booru_name = params.booru;
	const query = decode_query(url.searchParams);
	const booru = attempt_get_booru(booru_name);
	if (booru === undefined) throw error(404, "Booru Not Found");

	// let key = `${JSON.stringify(query)}-${booru.short_name}`;
	// let post_search = Cache.use_cache_async(key, 60_000, async () => {
	// 	try {
	// 		return await booru.search(query, 0);
	// 	} catch {
	// 		return [];
	// 	}
	// });
	// const timeout_promise = new Promise<Post[]>(resolve => setTimeout(() => resolve([]), 2000));
	let posts: Post[] = [];
	return { posts, booru_name, query };
};
