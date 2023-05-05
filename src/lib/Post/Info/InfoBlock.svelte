<script lang="ts">
	import type { Post } from "js/booru/types";
	export let post: Post;

	let created_at = new Date(post.created_at).toDateString();
</script>

<div>
	<span>{created_at}</span>
	<span>{post.score} Score</span>
</div>

<style>
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
	}
</style>
