<script>
	import { QueryClient, QueryClientProvider } from "@sveltestack/svelte-query";
	import Prompts from "lib/Prompts/index.svelte";
	import NavigationBar from "lib/NavBar/index.svelte";

	const queryClient = new QueryClient();
</script>

<QueryClientProvider client="{queryClient}">
	<Prompts />
	<NavigationBar />
	<main>
		<slot />
	</main>
</QueryClientProvider>

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
		--BACKGROUND-1: var(--COLOR-1);

		--BACKGROUND-2: var(--COLOR-2);
		--BACKGROUND-2-HOVER: var(--COLOR-3);

		--BACKGROUND-3: var(--COLOR-3);
		--BACKGROUND-3-HOVER: var(--COLOR-4);

		--BACKGROUND-4: var(--COLOR-4);
		--BACKGROUND-4-HOVER: var(--COLOR-5);

		--BORDER-1: var(--COLOR-5);
		--BORDER-1-HOVER: var(--COLOR-6);

		--BORDER-2: var(--COLOR-6);
		--BORDER-2-HOVER: var(--COLOR-7);

		--NAVBAR-HEIGHT: 2.8rem;

		--COLOR-1: #303a30;
		--COLOR-2: #2f3e37;
		--COLOR-3: #26322c;
		--COLOR-4: #1c2520;
		--COLOR-5: #131815;
		--COLOR-6: #0e120f;
		--COLOR-7: #090b09;
	}

	:global(body) {
		margin: 0;
		padding: 0;
		overflow-x: hidden;
		overflow-y: hidden;
		font-family: "Lato", sans-serif;
		background-color: var(--BACKGROUND-1);
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
