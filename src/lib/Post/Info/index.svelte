<script lang="ts">
	import type { Post } from "js/booru/types";
	import Source from "./Source.svelte";
	import LeftBlock from "./InfoBlock.svelte";
	import TagList from "./TagList.svelte";

	export let post: Post | null;

	let container: Element;
</script>

<div id="main" bind:this={container}>
	{#if post}
		<div id="top">
			<Source source="{post.origin}" />
		</div>
		<div id="inner">
			<LeftBlock post="{post}" />
			<div id="content">
				<TagList tags="{post.tags}" />
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	#main {
		position: sticky;
		float: left;
		height: 1rem;
		bottom: 0;
		left: 0;
		width: max(10rem, 100%);
		z-index: 2;

		border-top: .1rem solid black;
		display: grid;
		grid-template-rows: 1.5rem 1fr;

		#inner {
			display: grid;
			grid-template-columns: 14rem 1fr 4rem;
			padding-bottom: 1rem;
		}
	}

	#top {
		width: 100%;
		display: flex;
		align-items: baseline;
		justify-content: center;
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
