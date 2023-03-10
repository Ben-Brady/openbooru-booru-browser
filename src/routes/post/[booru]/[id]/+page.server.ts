import type { PageServerLoad } from "./$types";
import type { Post } from "js/booru/types";
import { error } from "@sveltejs/kit";
import { booru_from_string } from "js/booru";

async function get_post(booru_name: string, id: string) {
	const booru = booru_from_string(booru_name);
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
		console.error(e);
		throw error(404, "Post Not Found");
	}
};
