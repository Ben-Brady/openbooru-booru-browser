<script lang="ts">
	import { page } from "$app/stores";
	import { goto } from '$app/navigation';
	import type { Post, Booru } from "js/booru/types";
	import { decode_query, encode_query } from "js/booru/query";
	import { generate_posts_link } from "js/links";

	import Grid from "lib/Posts/Grid/index.svelte";
	import SearchBox from "lib/SearchBox/index.svelte";
	import Column from "lib/Posts/Column/index.svelte";
	import LayoutSelector from "./Buttons/LayoutSelector.svelte";
	import { browser } from "$app/environment";
	import Cache from "js/cache";

	export let layout: "grid" | "column" = "grid";
	export let booru: Booru;
	
	let pid = 0;
	let finished = false;
	let loading = false;
	let posts: Post[] = [];

	async function resetSearch() {
		if (!browser) return
		pid = 0;
		finished = false;
		loading = false;
		posts = [];
		await requestPosts();
		await goto(generate_posts_link("", query), { replaceState: true });
	}

	async function requestPosts() {
		if (finished || loading) return;
		loading = true;

		try {
			let cache_key = `${booru.short_name}-${pid}-${encode_query(query)}`;
			let new_posts = await Cache.use_cache_async(cache_key, 60 , () => booru.search(query, pid));
			pid += 1;
			posts = posts.concat(...new_posts);
			if (new_posts.length === 0) finished = true;
		} catch (e) {
			console.trace(e);
		}

		loading = false;
	}

	// Calculate Query 
	let params = $page.url.searchParams;
	let search = params.get("query") || "";
	if (typeof search === "object") search = search[0];
	let query = decode_query(search);

	$: (_ => resetSearch())((query, booru))


	let layout_element: any;
	if (layout === "grid") {
		layout_element = Grid;
	} else if (layout === "column") {
		layout_element = Column;
	} else {
		layout_element = Grid;
	}
</script>

{#if browser && innerWidth < 640}
	<Column
		finished="{finished}"
		loading="{loading}"
		posts="{posts}"
		requestPosts="{requestPosts}"
	/>
{:else}
	<LayoutSelector layout="{layout}" />
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
		margin-top: 4rem;
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