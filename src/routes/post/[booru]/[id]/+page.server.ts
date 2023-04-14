import type { PageServerLoad } from "./$types";
import type { Post } from "js/booru/types";
import { error } from "@sveltejs/kit";
import { get_booru } from "js/booru";

async function get_post(booru_name: string, id: string) {
	const booru = get_booru(booru_name);
	const post = await booru?.get(id);
	if (post === undefined) throw 404;
	return post;
}

export const load: PageServerLoad = async ({ params }) => {
	const { booru: booru_name, id } = params;

	try {
		let post: Post | undefined = await get_post(booru_name, id);
		return { post, booru_name, id };
	} catch (e: any) {
		console.trace(e);
		throw error(404, "Post Not Found");
	}
};
