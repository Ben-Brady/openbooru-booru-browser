<script lang="ts">
	import type { PageData } from "./$types";
	import type { Post } from "js/booru/types";
	import { booru_from_string } from "js/booru";
	import { generate_post_link } from "js/links";
	import HeadInfo from "lib/HeadInfo.svelte";
	import PostPage from "lib/Post/Page.svelte";

	export let data: PageData;
	const { post, booru_name, id } = data;

	async function getPost() {
		const booru = booru_from_string(booru_name);
		const post = await booru?.get(id);
		if (post === undefined) {
			location.href = "/";
			throw 404;
		} else {
			return post;
		}
	}

	function generateTitle(post: Post) {
		const booru = booru_from_string(booru_name);
		return `${booru?.display_name}: Post ${post.id}`;
	}
</script>

{#if post}
	<HeadInfo
		title="{generateTitle(post)}"
		path="{generate_post_link(post.id, post.booru)}"
		media="{post.full}"
	/>
	<PostPage post="{post}" />
{:else}
	{#await getPost() then post}
		<HeadInfo
			title="{generateTitle(post)}"
			path="{generate_post_link(post.id, post.booru)}"
			media="{post.full}"
		/>
		<PostPage post="{post}" />
	{/await}
{/if}
