<script lang="ts">
	import type { PageData } from "./$types";
	import { error } from "@sveltejs/kit";
	import { goto } from "$app/navigation";
	import { createQuery } from '@tanstack/svelte-query';
	import { get_booru } from "js/booru";
	import { generate_post_link } from "js/links";
	import HeadInfo from "lib/HeadInfo.svelte";
	import PostPage from "lib/Post/Page.svelte";
	import LoadingIcon from "lib/LoadingIcon.svelte";

	export let data: PageData;
	const { post, booru_name, id } = data;

	const booru = get_booru(booru_name);
	const title = `${booru?.display_name}: Post ${id}`;
	const link = generate_post_link(id, booru_name);

	async function getPost() {
		const post = await booru.get(id);
		if (post === undefined) {
			await goto("/");
			throw error(404, "Post not found");
		} else {
			return post;
		}
	}
	const queryResult = createQuery({
		queryKey: [booru_name, id],
		queryFn: getPost,
		initialData: post,
	});
</script>

{#if $queryResult.data === undefined}
	<HeadInfo title="Post" path="{link}" />
	<LoadingIcon />
{:else}
	<HeadInfo title="{title}" path="{link}" media="{$queryResult.data.full}" />
	<PostPage post="{$queryResult.data}" />
{/if}
