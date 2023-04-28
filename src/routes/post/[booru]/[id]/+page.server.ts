import type { PageServerLoad } from "./$types";
import { attempt_get_booru } from "js/booru";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params }) => {
	const { booru: booru_name, id } = params;
	const booru = attempt_get_booru(booru_name);
	if (booru === undefined) throw error(404, "Booru Not Found");

	let post = await (async () => {
		try {
			const post = await booru.get(id);
			if (post === undefined) throw error(404, "Post Not Found");
			return post;
		} catch (e) {
			return undefined;
		}
	})()
	return { post, booru_name, id };
};
