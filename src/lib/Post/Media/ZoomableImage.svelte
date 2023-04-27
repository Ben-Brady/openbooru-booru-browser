<script lang="ts">
	import type { Image, Animation } from "js/booru/types";
	import { generateUrl } from "js/proxy";
	export let media: Image | Animation;

	let zoomed = false;
	let wide = media.width > media.height;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	data-zoom="{zoomed}"
	data-wide="{wide}"
	on:click="{() => zoomed = !zoomed}"
	>
	<img
		src="{generateUrl(media.url)}"
		alt=""
		width="{media.width}"
		height="{media.height}"
		loading="eager"
	/>
</div>

<style lang="scss">
	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	img {
		div[data-zoom="true"][data-wide="false"] & {
			height: unset;
			overflow-y: scroll;
		}
		div[data-zoom="true"][data-wide="true"] & {
				width: unset;
				overflow-x: scroll;
		}
	}

	div[data-zoom="false"] {
		display: contents;
		cursor: zoom-in;
	}

	div[data-zoom="true"] {
		cursor: zoom-out;

		display: block;
		&[data-wide="false"] {
			overflow-y: auto;
			height: 100%;
			margin-left: 15%;
			margin-right: 15%;
		}

		&[data-wide="true"] {
			overflow-x: scroll;
			height: 90%;
			width: 100%;
			margin-top: 2.5%;
			margin-bottom: 2.5%;
		}
	}
</style>
