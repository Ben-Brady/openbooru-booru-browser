<script lang="ts">
	import type { Post } from "js/booru/types";
	import { generateUrl } from "js/proxy";
	import { generate_post_link } from "js/links";

	export let post: Post;
	export let priority: boolean = false;

	const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max)
	let image = post.thumbnail;
	let aspectRatio = clamp(image.width / image.height, 0.5, 4);
</script>

<a
	title="Post: {post.id}"
	href="{generate_post_link(post.id, post.booru)}"
	class="{post.full.type}"
	style={`aspect-ratio: ${aspectRatio};`}
>
	<img
		src="{generateUrl(image.url)}"
		width="{image.width}"
		height="{image.height}"
		alt="{post.tags.slice(0, 5).map(tag => tag.name).join(', ')}"
		loading="{priority ? null : 'lazy'}"
	/>
</a>

<style lang="scss">
	a {
		display: block;
		height: auto;
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
