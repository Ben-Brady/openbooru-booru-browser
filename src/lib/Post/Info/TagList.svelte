<script lang="ts">
	import type { Query } from "js/booru/types";
	import { encode_query } from "js/booru/query";
	import Tag from "lib/Tag.svelte";
	export let tags: string[] = [];
	tags.sort();

	function create_link(tag: string) {
		let query: Query = { search: tag };
		let bsl = encode_query(query);
		// TODO: Add button Links.posts
		let href = `/posts/?query=${bsl}`;
		return href;
	}
</script>

<div>
	{#each tags as tag}
		<Tag name="{tag}" href="{create_link(tag)}" />
	{/each}
</div>

<style>
	div {
		position: relative;
		height: fit-content;
		width: 100%;

		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		align-content: baseline;
		gap: 0.5rem;
	}
</style>
