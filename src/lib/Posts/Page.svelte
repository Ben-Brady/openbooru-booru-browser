<script lang="ts">
	import { page } from "$app/stores";

	import type { Post, Booru } from "js/booru/types";
	import { decode_query } from "js/booru/query";
	import { generate_post_link } from "js/links";
	import Grid from "lib/Posts/Grid/index.svelte";
	import Column from "lib/Posts/Column/index.svelte";
	import LayoutSelector from "./Buttons/LayoutSelector.svelte";

	export let layout: "grid" | "column" = "grid";
	export let initialPosts: Post[] = [];
	export let booru: Booru;

	let finished = false;
	let loading = false;
	let posts: Post[] = [];

	// Calculate Query 
	$: params = $page.url.searchParams;
	$: search = params.get("query") || "";
	if (typeof search === "object") search = search[0];
	$: query = decode_query(search);

	async function requestPosts() {
		if (finished || loading) return;
		loading = true;

		try {
			let new_posts = await booru.search(query, posts.length);
			posts = posts.concat(...new_posts);
			if (new_posts.length === 0) finished = true;
		} catch (e) {
			console.trace(e);
		}

		loading = false;
	}

	let layout_element: any;
	if (layout === "grid") {
		layout_element = Grid;
	} else if (layout === "column") {
		layout_element = Column;
	} else {
		layout_element = Grid;
	}
</script>

<LayoutSelector layout="{layout}" />
<svelte:component
	this="{layout_element}"
	finished="{finished}"
	loading="{loading}"
	posts="{posts || initialPosts}"
	requestPosts="{requestPosts}"
/>
<!-- <svelte:component
	this="{LayoutElement}"
	finished="{finished}"
	loading="{loading}"
	posts="{posts || initialPosts}"
	requestPosts="{requestPosts}"
	callback="{PostCallback}"
/> -->
