<script lang="ts">
	import type { Image, Animation } from "js/booru/types";
	import { generateUrl } from "js/proxy";
	import ZoomableImage from "./ZoomableImage.svelte";
	export let media: Image | Animation;

	let aspectRatio = media.height / media.width;
</script>

{#if aspectRatio > 2 || aspectRatio < 0.3}
	<ZoomableImage media="{media}" />
{:else}
	<img
		src="{generateUrl(media.url)}"
		alt=""
		width="{media.width}"
		height="{media.height}"
		loading="eager"
	/>
{/if}

<style>
	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
</style>
