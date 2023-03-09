<script lang="ts">
	import type { Post } from "js/booru/types";
	import Source from "./Source.svelte";
	import Info from "./Info.svelte";
	import TagList from "./TagList.svelte";

	export let post: Post | null;
</script>

<div id="main">
	{#if post}
		<div id="inner">
			<Info post="{post}" />
			<div id="content">
				<Source source={post.source} />
				<TagList tags="{post.tags}" />
			</div>
		</div>
	{/if}
</div>

<style>
	div#main {
		display: grid;
		grid-template-rows: 1.2rem 1fr;

		position: relative;
		height: fit-content;
		min-height: 14rem;
		background-color: var(--BACKGROUND-3);
	}

	div#inner {
		display: grid;
		grid-template-columns: 14rem 1fr 4rem;
		padding-bottom: 1rem;
	}

	div#content {
		padding: 1rem;
	}

	@media screen and (max-width: 40rem), (orientation: portrait) {
		div#inner {
			display: flex;
			flex-flow: column;
			align-items: center;
			justify-content: center;
		}
	}
</style>
