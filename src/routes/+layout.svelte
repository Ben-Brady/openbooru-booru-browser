<script lang="ts">
	import ConsentPrompt from "lib/ConsentPrompt.svelte";
	import NavigationBar from "lib/NavBar/index.svelte";
	import Analytics from "lib/Analytics.svelte";
	import Settings from "js/settings";

	let tracking_cookies: boolean;
	Settings.tracking_cookies.subscribe(value => { tracking_cookies = value })
</script>

{#if tracking_cookies}
	<Analytics measurementID="G-DH7G2DZL9B"/>
{/if}

<ConsentPrompt>
	<NavigationBar/>
	<main>
		<slot/>
	</main>
</ConsentPrompt>

<style>
	main {
		display: block;
		max-height: calc(100vh - var(--NAVBAR-HEIGHT));
		height: calc(100vh - var(--NAVBAR-HEIGHT));
		width: 100%;
		overflow-y: auto;
		overflow-x: hidden;
	}


	:global(:root) {
		--BACKGROUND-1: #303a30;

		--BACKGROUND-2: #2c352c;
		--BACKGROUND-2-HOVER: #202620;

		--BACKGROUND-3: #283028;
		--BACKGROUND-3-HOVER: #1b211b;

		--BORDER-1: #151a15;
		--BORDER-1-HOVER: #101410;

		--BORDER-2: #151a15;
		--BORDER-2-HOVER: #101410;

		--TEXT-NORMAL: #878787;
		--TEXT-LINK: #93b393;

		--NAVBAR-HEIGHT: 2.8rem;
	}

	:global(body) {
		margin: 0;
		padding: 0;
		overflow-x: hidden;
		overflow-y: hidden;
		font-family: "Lato", sans-serif;
		background-color: var(--BACKGROUND-1);

		color: #a7a4a4;
	}

	:global(img) {
		font-size: 0;
	}

	:global(a) {
		text-decoration: none;
		color: #b0e0b0;
	}

	/* latin */
	@font-face {
		font-family: "Lato";
		font-style: normal;
		font-weight: 400;
		src: url(https://fonts.gstatic.com/s/lato/v23/S6uyw4BMUTPHjx4wXg.woff2) format("woff2");
		unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
			U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
		font-display: swap;
	}

	/* latin-ext */
	@font-face {
		font-family: "Lato";
		font-style: normal;
		font-weight: 400;
		src: url(https://fonts.gstatic.com/s/lato/v23/S6uyw4BMUTPHjxAwXjeu.woff2) format("woff2");
		unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113,
			U+2C60-2C7F, U+A720-A7FF;
		font-display: swap;
	}
</style>
