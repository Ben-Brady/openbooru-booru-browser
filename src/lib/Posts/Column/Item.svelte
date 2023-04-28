<script lang="ts">
	import type { Post, Image } from "js/booru/types";
	import { generateUrl } from "js/proxy";
	import { generate_post_link } from "js/links";

	export let post: Post;
	export let priority: boolean = false;

	const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

	let image: Image;
	function onLoad(e: Event) {
		if (post.preview === undefined) return
		if (post.preview.type !== "image") return

		const MAX_SIZE_PIXELS = 8_000_000;
		let { width, height } = post.preview;
		if ((width * height) > MAX_SIZE_PIXELS) return

		image = post.preview;
	}

	image = post.thumbnail;

	let aspectRatio = image.height / image.width;
	let adjustedAspectRatio = clamp(aspectRatio, 0.5, 2);
	let adjustedHeight = (image.height / aspectRatio) * adjustedAspectRatio;
	let aspectRatioStyle = `aspect-ratio: ${image.width}/${adjustedHeight}`;
</script>

<a
	title="Post: {post.id}"
	href="{generate_post_link(post.id, post.booru)}"
	class="{post.full.type}"
	style="{aspectRatioStyle}"
>
	<img
		src="{generateUrl(image.url)}"
		width="{image.width}"
		height="{image.height}"
		alt="{post.tags.map(tag => tag.name).join(', ')}"
		loading="{priority ? null : 'lazy'}"
		on:load={onLoad}
	/>
</a>

<style lang="scss">
	a {
		display: block;
		height: auto;
		max-height: 50rem;
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

	a, img {
		border-radius: 1rem;
	}

	a:hover,
	img:hover {
		outline-width: 0.3rem;
		border-radius: 2rem;
	}
</style>
