<script lang="ts">
	import type { Image, Animation } from "js/booru/types";
	import { generateUrl } from "js/proxy";
	export let media: Image | Animation;

	let zoomed = false;
	const zoomIn = () => (zoomed = true);
	const zoomOut = () => (zoomed = false);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div data-zoom="{zoomed}" on:click="{zoomed ? zoomOut : zoomIn}">
	<img
		src="{generateUrl(media.url)}"
		alt=""
		width="{media.width}"
		height="{media.height}"
		loading="eager"
	/>
</div>

<style>
	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	div[data-zoom="true"] > img {
		height: unset;
		overflow-y: scroll;
	}

	div[data-zoom="false"] {
		display: contents;
		cursor: zoom-in;
	}
	div[data-zoom="true"] {
		cursor: zoom-out;

		display: block;
		height: 100%;
		overflow-y: auto;
		--MARGIN: 25%;
		margin-left: var(--MARGIN);
		margin-right: var(--MARGIN);
	}
</style>
