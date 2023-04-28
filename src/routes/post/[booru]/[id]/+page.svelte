<script lang="ts">
	import { error } from "@sveltejs/kit";
	import type { PageData } from "./$types";
	import { get_booru } from "js/booru";
	import { generate_post_link } from "js/links";
	import HeadInfo from "lib/HeadInfo.svelte";
	import PostPage from "lib/Post/Page.svelte";
	import { goto } from "$app/navigation";

	export let data: PageData;
	const { post, booru_name, id } = data;

	const booru = get_booru(booru_name);

	async function getPost() {
		const post = await booru.get(id);

		if (post === undefined) {
			await goto("/")
			throw error(404, "Post not found");
		} else {
			return post;
		}
	}

	const title = `${booru?.display_name}: Post ${id}`;
	const link = generate_post_link(id, booru_name);
</script>

{#if post}
	<HeadInfo
		title="{title}"
		path="{link}"
		media="{post.full}"
	/>
	<PostPage post="{post}" />
{:else}
	<HeadInfo
		title="Post"
		path="{link}"
	/>
	{#await getPost() then post}
		<PostPage post="{post}" />
	{/await}
{/if}
