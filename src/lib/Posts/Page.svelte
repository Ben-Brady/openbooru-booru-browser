<script lang="ts">
	import { BSL } from "openbooru";
	import { page } from "$app/stores";

	import type { Post, Booru } from "js/booru/types";
	import type { Query } from "js/booru/query";
	import { encode_query, decode_query } from "js/booru/query";
	import Links from "js/links";
	import Grid from "lib/Posts/Grid/index.svelte";
	import Column from "lib/Posts/Column/index.svelte";
	import LayoutSelector from "./Buttons/LayoutSelector.svelte";

	export let layout: "grid" | "column" = "grid";
	export let initialPosts: Post[] = [];
	export let booru: Booru;

	let finished = false;
	let loading = false;
	let posts: Post[] = [];

	$: params = $page.url.searchParams;
	$: search = params.get("query") || "";
	if (typeof search === "object") search = search[0];
	$: query = decode_query(search);
	
	async function requestPosts() {
		if (finished || loading) return;
		loading = true;

		let new_posts;
		try {
			new_posts = await booru.search(query, posts.length);
		} catch (e) {
			return;
		}

		posts = posts.concat(new_posts);
		if (new_posts.length === 0) finished = true;
		loading = false;
	}

	function setQuery(query: Query) {
		let bsl = encode_query(query);
		let search = bsl ? "?query=" + bsl : "";
		window.location.search = search;
	}

	interface PostCallbackInterface {
		id: number;
		index: number;
	}
	function PostCallback({ id, index }: PostCallbackInterface) {
		return () => {
			location.href = Links.post(id.toString(), booru.name);
		};
	}

	const LayoutLookup = {
		grid: Grid,
		column: Column,
	};
	const LayoutElement = LayoutLookup[layout] ?? Grid;
</script>

<LayoutSelector layout="{layout}" />
<Grid
	finished="{finished}"
	loading="{loading}"
	posts="{posts || initialPosts}"
	requestPosts="{requestPosts}"
	callback="{PostCallback}"
/>
<!-- <svelte:component
	this="{LayoutElement}"
	finished="{finished}"
	loading="{loading}"
	posts="{posts || initialPosts}"
	requestPosts="{requestPosts}"
	callback="{PostCallback}"
/> -->
