<script lang="ts">
	import type { Post } from "js/booru/types";
	import PostInfo from "lib/Post/Info/index.svelte";
	import Media from "lib/Post/Media/index.svelte";
	export let post: Post;
</script>

<main>
	<div>
		<Media post="{post}" />
	</div>
	<PostInfo post="{post}" />
</main>

<style>
	main {
		height: 100%;
		overflow-y: auto;
		display: grid;
		grid-template-rows: 1fr 1.5rem;
	}

	div {
		width: 100%;
		height: 100%;
		object-fit: contain;
		overflow: hidden;
	}
</style>
