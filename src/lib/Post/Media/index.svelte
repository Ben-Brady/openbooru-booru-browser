<script lang="ts">
	import type { Post } from "js/booru/types";
	import Image from "./image.svelte";
	import Video from "./video.svelte";
	export let post: Post | null;
</script>

{#if post}
	{#if post.full.type === "video"}
		<Video video="{post.full}" poster="{post.thumbnail}" />
	{:else}
		<Image media="{post.full}" />
	{/if}
{/if}
