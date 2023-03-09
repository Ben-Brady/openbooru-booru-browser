<script lang="ts">
	import type { Post } from "js/booru/types";
	import { generateUrl } from "js/proxy";
	import Links from "js/links";
	import Image from "lib/Post/Media/image.svelte";
	import { onMount } from "svelte";
	import About from "lib/Info/About.svelte";

	export let post: Post;
	export let callback: (() => void) | null;
	export let lazy: boolean;

	let image = post.thumbnail;
	function onClick(e: Event) {
		if (callback) {
			e.preventDefault();
			callback();
		}
	}
</script>

<a class="border {post.full.type}" href="{Links.post(post.id)}" on:click="{onClick}">
	<img
		class="border"
		src="{generateUrl(image.url)}"
		alt="{post.tags.join(',')}"
		width="{image.width}"
		height="{image.height}"
		loading="{lazy ? 'lazy' : 'eager'}"
	/>
</a>

<style>
	a {
		--MAX-SIZE: var(--IMAGE-SIZE);
		--MIN-SIZE: calc(var(--IMAGE-SIZE) / 6);

		min-width: var(--MIN-SIZE);
		min-height: var(--MIN-SIZE);
		max-width: var(--MAX-SIZE);
		max-height: var(--MAX-SIZE);
		display: flex;
		justify-content: center;
		align-items: center;

		background: var(--BACKGROUND-3);
		outline: 0.3rem solid;
	}

	a.image {
		outline-color: var(--BACKGROUND-3);
	}

	a.video {
		outline-color: #008600;
	}

	a.animation {
		outline-color: #000085;
	}

	.loading {
		opacity: 0;
	}

	.loaded {
		transition: ease-in-out 100ms;
		opacity: 1;
	}

	img {
		background: var(--BACKGROUND-3);
		cursor: pointer;
		height: var(--IMAGE-SIZE);
		width: 100%;
		object-fit: cover;
	}

	.border {
		border-radius: 1rem;
	}

	.border:hover {
		transition: 0.2s all ease-out;
		border-color: var(--BACKGROUND-3-HOVER);
		border-radius: calc(var(--IMAGE-SIZE) / 5);
	}
</style>
