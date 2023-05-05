<script lang="ts">
	import type { Post, Image } from "js/booru/types";
	import { generateUrl } from "js/proxy";
	import { generate_post_link } from "js/links";

	export let post: Post;
	export let priority: boolean = false;

	let image: Image;
	function onLoad() {
		if (post.preview === undefined) return;
		if (post.preview.type !== "image") return;

		const MAX_SIZE_PIXELS = 8_000_000;
		let { width, height } = post.preview;
		if (width * height > MAX_SIZE_PIXELS) return;

		image = post.preview;
	}

	image = post.thumbnail;
</script>

<a
	title="Post: {post.id}"
	href="{generate_post_link(post.id, post.booru)}"
	class="{post.full.type}"
>
	<img
		src="{generateUrl(image.url)}"
		width="{image.width}"
		height="{image.height}"
		alt="{post.tags.map(tag => tag.name).join(', ')}"
		loading="{priority ? null : 'lazy'}"
		on:load="{onLoad}"
	/>
</a>

<style lang="scss">
	a {
		display: block;
		height: auto;
		max-height: 40rem;
		min-height: 10rem;
		max-height: 200%;
		width: 100%;
		cursor: pointer;

		margin: 0.2rem;
		outline: 0.3rem solid;
		background: var(--BACKGROUND-3);

		&.image {
			outline-color: var(--BACKGROUND-3);
		}

		&.video {
			outline-color: #008600;
		}

		&.animation {
			outline-color: #000085;
		}
	}

	img {
		height: 100%;
		width: 100%;
		object-fit: cover;
		border-radius: 1rem;
	}

	a,
	img {
		border-radius: 1rem;
	}

	a:hover,
	img:hover {
		outline-width: 0.3rem;
		border-radius: 2rem;
	}
</style>
