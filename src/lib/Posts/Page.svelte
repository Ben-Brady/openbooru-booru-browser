<script lang="ts">
	import type { Post, Booru, Query } from "js/booru/types";
	import { page } from "$app/stores";
	import { goto } from '$app/navigation';
	import { decode_query, encode_query } from "js/booru/query";
	import { generate_posts_link } from "js/links";

	import SearchBox from "lib/SearchBox/index.svelte";
	import Column from "lib/Posts/Column/index.svelte";
	import { browser } from "$app/environment";
	import Cache from "js/cache";

	const layout = "column";
	export let booru: Booru;

	let pid = 0;
	let finished = false;
	let loading = false;
	let posts: Post[] = [];

	async function resetSearch() {
		if (!browser) return
		await goto(generate_posts_link(query))

		pid = 0;
		finished = false;
		loading = false;
		posts = [];
		await requestPosts();
	}

	async function requestPosts() {
		if (finished || loading) return;
		loading = true;

		let new_posts: Post[];
		try {
			let cache_key = `${booru.short_name}-${pid}-${JSON.stringify(query)}`;
			new_posts = await Cache.use_cache_async(cache_key, 60 , () => booru.search(query, pid));
		} catch (e) {
			console.trace(e);
			return;
		}

		pid += 1
		posts = posts.concat(...new_posts);
		if (new_posts.length === 0) finished = true;
		loading = false;
	}

	let query = decode_query($page.url.searchParams);
	$: (_ => resetSearch())((query, booru))


	let layout_element: any;
	if (layout === "column") {
		layout_element = Column;
	} else {
		layout_element = Column;
	}
	let width = 0;
</script>

<svelte:window bind:innerWidth="{width}"/>
{#if browser && width < 640}
	<Column
		finished="{finished}"
		loading="{loading}"
		posts="{posts}"
		requestPosts="{requestPosts}"
	/>
{:else}
	<div id="container">
		<div id="search">
			<SearchBox
				bind:booru={booru}
				bind:query={query}
			/>
		</div>
		<svelte:component this="{layout_element}"
			finished="{finished}"
			loading="{loading}"
			posts="{posts}"
			requestPosts="{requestPosts}"
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
