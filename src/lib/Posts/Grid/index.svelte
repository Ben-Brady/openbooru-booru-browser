<script lang="ts">
	import type { Post } from "js/booru/types";
	import { onMount } from "svelte";
	import LoadingIcon from "lib/LoadingIcon.svelte";
	import GridItem from "./Item.svelte";

	export let finished: boolean = false;
	export const loading: boolean = false;
	export let useScroll: boolean = true;
	export let posts: Post[] = [];
	export let requestPosts: () => void = () => {};
	export let callback: (({ id, index }: { id: string; index: number }) => () => void) | null =
		null;

	let container: Element;
	async function CheckNewPosts() {
		if (!container) return;
		const { scrollTop, offsetHeight, scrollHeight } = container;
		let distanceFromTop = scrollTop + offsetHeight;
		let distanceFromBottom = scrollHeight - distanceFromTop;
		if (distanceFromBottom < 2000 && !finished) {
			await requestPosts();
		}
	}

	onMount(CheckNewPosts);
</script>

<main bind:this="{container}" on:scroll="{() => CheckNewPosts()}" data-scroll="{useScroll}">
	<div id="grid">
		{#if posts.length > 0}
			{#each posts as post, index}
				<GridItem
					post="{post}"
					lazy="{index > 30}"
					callback="{callback ? callback({ id: post.id, index }) : null}"
				/>
			{/each}
		{:else if !finished}
			<LoadingIcon fadeIn />
		{/if}
	</div>
</main>

<style>
	main[data-scroll="false"] {
		overflow-y: visible;
		max-height: unset;
	}

	main {
		--IMAGE-SIZE: 180px;
		/* API Thumbnail Size */

		/* Position */
		max-width: 100vw;
		max-height: 100%;
		overflow-y: auto;
		overflow-x: hidden;
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
