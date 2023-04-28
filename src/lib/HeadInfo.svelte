<script lang="ts">
	import { boorus } from "js/booru";
	import type { Media } from "js/booru/types";
	import { SITE_NAME, SITE_DESC, SITE_URL, SITE_KEYWORDS } from "js/config";

	export let path: string;
	export let title: string = "";
	export let description: string = "";
	export let keywords: string[] = [];
	export let media: Media | null = null;

	let RenderedKeywords = SITE_KEYWORDS.concat(keywords);
	let RenderedTitle = title ? `${SITE_NAME} | ${title}` : SITE_NAME;
	let RenderedDescription = description ? SITE_DESC + "\n" + description : SITE_DESC;
</script>

<svelte:head>
	<link rel="preconnect" href="	https://www.googletagmanager.com/" />
	<link rel="preconnect" href="https://fonts.gstatic.com/" />
	<link rel="preconnect" href="https://api-cdn.rule34.xxx/" />
	<link rel="preconnect" href="https://api.rule34.xxx" />
	<link rel="preconnect" href="https://e621.net" />

	<title>{RenderedTitle}</title>
	<meta name="description" content="{RenderedDescription}" />
	<meta name="keywords" content="{RenderedKeywords.join(', ')}" />
	<link rel="icon" type="image/x-icon" href="/favicon.ico" />
	<link rel="canonical" href="{SITE_URL + path}" />

	<meta property="og:locale" content="en_US" />
	<meta property="og:site_name" content="{SITE_NAME}" />
	<meta property="og:title" content="{RenderedTitle}" />
	<meta property="og:description" content="{RenderedDescription}" />
	<meta property="og:url" content="{path}" />

	<meta property="twitter:title" content="{RenderedTitle}" />
	<meta property="twitter:description" content="{RenderedDescription}" />
	<meta property="twitter:url" content="{SITE_URL + path}" />

	{#if media?.type == "image" || media?.type == "animation"}
		<meta property="og:image:url" content="{media.url.toString()}" />
		<meta property="og:image:secure_url" content="{media.url.toString()}" />
		<meta property="og:image:width" content="{media.width.toString()}" />
		<meta property="og:image:height" content="{media.height.toString()}" />

		<meta property="twitter:card" content="summary_large_image" />
		<meta property="twitter:image" content="{media.url.toString()}" />
	{:else if media?.type == "video"}
		<meta property="og:video:url" content="{media.url.toString()}" />
		<meta property="og:video:secure_url" content="{media.url.toString()}" />
		<meta property="og:video:width" content="{media.width.toString()}" />
		<meta property="og:video:height" content="{media.height.toString()}" />

		<meta property="twitter:card" content="player" />
		<meta property="twitter:player" content="{media.url.toString()}" />
		<meta property="twitter:player:width" content="{media.width.toString()}" />
		<meta property="twitter:player:height" content="{media.height.toString()}" />
	{/if}
</svelte:head>
