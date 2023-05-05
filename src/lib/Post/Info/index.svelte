<script lang="ts">
	import type { Post } from "js/booru/types";
	import Source from "./Source.svelte";
	import LeftBlock from "./InfoBlock.svelte";
	import TagList from "./TagList.svelte";

	export let post: Post | null;
</script>

<div id="main">
	{#if post}
		<div id="source">
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
		bottom: 0;
		left: 0;
		height: 1.5rem;
		width: 100%;
		z-index: 2;

		border-top: .1rem solid black;
		background-color: var(--BACKGROUND-2);
		display: grid;
		grid-template-rows: 1.5rem 1fr;


		transition: 200ms ease-in-out;
		&:hover {
			height: max(10rem, 100%);
		}
	}

	#inner {
		display: grid;
		grid-template-columns: 14rem 1fr 4rem;
		padding-bottom: 1rem;
	}

	#source {
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
