<script lang="ts">
	import type { Post, Booru, Query } from "js/booru/types";
	import { page } from "$app/stores";
	import { goto } from '$app/navigation';
	import { DEFAULT_QUERY, decode_query, encode_query } from "js/booru/query";
	import { generate_posts_link } from "js/links";

	import SearchBox from "lib/SearchBox/index.svelte";
	import Column from "lib/Posts/Column/index.svelte";
	import { browser } from "$app/environment";
	import Cache from "js/cache";
	import { onMount } from "svelte";
	import { useInfiniteQuery } from "@sveltestack/svelte-query";

	export let booru: Booru;

	let page_width = 0;

	let query: Query|null = null;
	let pid = 0;
	let finished = false;
	let loading = false;
	let posts: Post[] = [];

	async function resetSearch() {
		if (!browser || query === null) return

		await goto(generate_posts_link(query, booru.short_name))


		pid = 0;
		finished = false;
		loading = false;
		posts = [];
		await requestPosts();
	}
	$: ((..._) => resetSearch())(query, booru)

	async function requestPosts() {
		if (finished || loading || query === null) return;
		navigator.locks.request("posts-search", { ifAvailable: true}, async () => {
			loading = true;

			let new_posts: Post[];
			try {
				let cache_key = `${booru.short_name}-${pid}-${JSON.stringify(query)}`;
				new_posts = await Cache.use_cache_async(cache_key, 60000, () => booru.search(query, pid));
			} catch (e) {
				console.trace(e);
				return;
			}

			pid += 1
			posts = posts.concat(...new_posts);
			if (new_posts.length === 0) finished = true;
			loading = false;
		})
	}

	onMount(async () => {
		query = decode_query($page.url.searchParams);
		await resetSearch()
	})
</script>

<svelte:window bind:innerWidth="{page_width}"/>
{#if browser && page_width < 640}
	<Column
		{finished}
		{loading}
		{posts}
		{requestPosts}
	/>
{:else}
	<div id="container">
		<div id="search">
			<SearchBox
				bind:booru={booru}
				bind:query={query}
			/>
		</div>
		<Column
			{finished}
			{loading}
			{posts}
			{requestPosts}
		/>
	</div>
{/if}

<style>
	div#search {
		margin-top: 1rem;
		margin-left: 1rem;
	}

	div#container {
		display: grid;
		grid-template-columns: 18rem 1fr;
		/* grid-template-columns: 1fr; */
		width: 100%;
		height: 100%;
	}

	div#container:nth-child(1) {
		border-left: 1px solid black;
	}
</style>
