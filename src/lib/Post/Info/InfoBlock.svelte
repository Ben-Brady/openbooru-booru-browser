<script lang="ts">
	import type { Post } from "js/booru/types";
	import FavouriteButton from "lib/Favourites/FavouriteButton.svelte";

	export let post: Post;

	let created_at = new Date(post.created_at).toDateString();
</script>

<div>
	<span>{created_at}</span>
	<span>{post.score} Score</span>
	<FavouriteButton post="{post}" />
</div>

<style lang="scss">
	div {
		height: fit-content;
		width: fit-content;
		padding: 0.5rem;
		overflow: hidden;
		text-overflow: ellipsis;
		word-wrap: break-word;

		display: flex;
		flex-direction: column;
		align-items: left;
		justify-content: center;

		@media screen and (max-width: 40rem), (orientation: portrait) {
			align-items: center;
			justify-content: center;
		}
	}
</style>
