<script lang="ts">
	import type { Post } from "js/booru/types";
	import { onMount } from "svelte";
	import LoadingIcon from "lib/LoadingIcon.svelte";
	import GridItem from "./Item.svelte";
	import { reachedEndOfScroll } from "../search";

	export let finished: boolean = false;
	export const loading: boolean = false;
	export let useScroll: boolean = true;
	export let posts: Post[] = [];
	export let requestPosts: () => Promise<void> = () => new Promise(resolve => resolve());

	let container: Element;
	async function checkNewPosts() {
		if (!container) return;
		if (reachedEndOfScroll(container) && !finished) {
			await requestPosts();
		}
	}

	onMount(checkNewPosts);
</script>

<div id="main" bind:this="{container}" on:scroll="{() => checkNewPosts()}" data-scroll="{useScroll}">
	<div id="grid">
		{#if posts.length > 0}
			{#each posts as post, index}
				<GridItem
					post="{post}"
					lazy="{index > 30}"
				/>
			{/each}
		{:else if !finished}
			<LoadingIcon fadeIn />
		{/if}
	</div>
</div>

<style lang="scss">
	
	div#main {
		--IMAGE-SIZE: 200px;
		/* API Thumbnail Size */
		
		/* Position */
		max-width: 100%;
		max-height: 100%;
		overflow-y: auto;
		overflow-x: hidden;
		
		&[data-scroll="false"] {
			overflow-y: visible;
			max-height: unset;
		}
	}

	#grid {
		overflow-x: hidden;
		padding: 2rem 10vw 2rem 10vw;

		/* Grid */
		display: grid;
		align-items: center;
		justify-items: center;
		gap: 1rem;
		grid-template-columns: repeat(
			auto-fit,
			minmax(min(calc(40vw - 2rem), var(--IMAGE-SIZE)), 1fr)
		);
	}

	@media screen and (max-width: 40rem), (orientation: portrait) {
		#grid {
			padding: 1rem;
		}
	}
</style>
