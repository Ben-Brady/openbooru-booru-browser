<script lang="ts">
	import type { Post } from "js/booru/types";
	export let post: Post;

	let created_at = post.created_at.toDateString();
</script>

<div>
	<span>{created_at}</span>
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
		align-items: center;
		justify-content: center;
	}
</style>
