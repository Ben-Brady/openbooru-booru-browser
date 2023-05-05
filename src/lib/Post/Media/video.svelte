<script lang="ts">
	import type { Video, Image } from "js/booru/types";
	import { generateUrl } from "js/proxy";
	import { onMount } from "svelte";
	export let video: Video;
	export let poster: Image | null = null;

	let volume = 1;

	function updateVolume() {
		localStorage.setItem("video-volume", volume.toString());
	}

	onMount(() => {
		volume = Number(localStorage.getItem("video-volume")) ?? 1;
	});
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<video
	bind:volume="{volume}"
	on:volumechange="{updateVolume}"
	poster="{generateUrl(poster?.url)}"
	preload="auto"
	controls
	loop
>
	<source
		src="{generateUrl(video.url)}"
		width="{video.width}"
		height="{video.height}"
		type="{video.mimetype}"
	/>
</video>

<style>
	video {
		width: 100%;
		height: 100%;
		object-fit: contain;
		background-color: black;
	}
</style>
