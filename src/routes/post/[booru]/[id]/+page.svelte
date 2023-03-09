<script lang="ts">
	import type { PageData } from "./$types";
	import type { Post, Booru } from "js/booru/types";
	import { booru_from_string  } from "js/booru";
	import * as Links from "js/links";
	import HeadInfo from "lib/HeadInfo.svelte";
	import PostPage from "lib/Post/Page.svelte";
	import titleCase from "ap-style-title-case";
	import Error from "routes/+error.svelte";

	export let data: PageData;
	const { booru_name, id } = data;

	const post_promise = (async () => {
		const booru = booru_from_string(booru_name);
		const post = await booru?.get(id)
		console.log()
		if (post === undefined){
			location.href = "/"
			throw 404
		} else {
			return post
		}
	})()
</script>

{#await post_promise then post}
	<HeadInfo title="{`Post ${titleCase(post.booru)}(${post.id})`}" path="{Links.post(post.id, post.booru)}" media="{post.full}" />
	<PostPage post="{post}" />
{/await}
