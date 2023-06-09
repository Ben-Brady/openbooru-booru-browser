<script lang="ts">
	import type { Post } from "js/booru/types";
	import { onMount, onDestroy } from "svelte";
	import LoadingIcon from "lib/LoadingIcon.svelte";
	import Item from "./Item.svelte";
	import { reachedEndOfScroll, SplitPosts } from "./utils";

	export let finished: boolean;
	export let loading: boolean;
	export let posts: Post[];
	export let requestPosts: () => Promise<any>;

	const Clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

	let container: Element;
	async function checkNewPosts() {
		if (!container) return;
		if (reachedEndOfScroll(container, 8000) && !finished) {
			await requestPosts();
		}
	}

	let interval: NodeJS.Timer;
	onMount(() => {
		window.history.scrollRestoration = "auto";
		checkNewPosts();
		interval = setInterval(checkNewPosts, 1000);
	});
	onDestroy(() => clearInterval(interval));

	let page_width = 0;
	$: column_count = Math.floor((page_width - 200) / 300);
	$: post_columns = SplitPosts(posts, Clamp(column_count, 1, 8));
</script>

<div id="main" bind:this="{container}" bind:clientWidth="{page_width}" on:scroll="{checkNewPosts}">
	<div id="columns">
		{#each post_columns as column}
			<div class="column">
				{#each column as post, index}
					<Item post="{post}" priority="{index < 5}" />
				{/each}
			</div>
		{/each}
	</div>

	{#if loading}
		<div id="loading" class="{post_columns.length === 0 ? 'center' : 'bottom'}">
			<LoadingIcon />
		</div>
	{/if}
</div>

<style>
	div#main {
		box-sizing: border-box;
		height: 100%;
		overflow-y: auto;

		display: flex;
		justify-items: center;
		flex-flow: column;
		gap: 1rem;
	}

	div#columns {
		width: 100%;
		/* Flex */
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	div.column {
		width: 100%;
		margin: 1rem;

		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 15px;
	}

	@media screen and (max-width: 40rem), (orientation: portrait) {
		div.column {
			--IMAGE-WIDTH: 40vw;
			margin: 8px;
		}
	}

	#loading {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	#loading.center {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	#loading.bottom {
		position: absolute;
		width: 100%;
		height: 100%;
		bottom: 1rem;
		position: static;
	}
</style>
