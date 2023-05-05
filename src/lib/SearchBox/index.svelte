<script lang="ts">
	import MediaSelect from "./MediaSelect.svelte";
	import SearchInput from "./SearchInput.svelte";
	import SortSelect from "./SortSelect.svelte";
	import BooruSelect from "./BooruSelect/index.svelte";
	import type { Query, Booru } from "js/booru/types";
	import { previous_booru } from "js/settings";

	export let query: Query;
	export let booru: Booru;

	$: tmp_query = query;
	$: {
		let tmp_query: Query = Object.assign({}, query);
		if (tmp_query !== query) {
			query = tmp_query;
		}
	}

	$: previous_booru.set(booru.short_name);
</script>

<div id="container">
	<MediaSelect bind:media="{tmp_query.media}" />
	<div id="select">
		<BooruSelect bind:booru="{booru}" />
		<SortSelect bind:sort="{tmp_query.sort}" />
	</div>
	<SearchInput bind:search="{tmp_query.search}" />
	<!-- <TagSelect on:addTag={event => addTag(event.detail)} /> -->
</div>

<style>
	div#container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		background: var(--BACKGROUND-3);

		padding: 0.5rem;
		width: fit-content;
		height: fit-content;

		border: 2px solid black;
		border-radius: 0.5rem;
	}

	div#select {
		display: flex;
		align-items: center;
		justify-content: space-around;
		gap: 1rem;

		width: 100%;
	}
</style>
