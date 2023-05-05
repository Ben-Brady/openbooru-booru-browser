<script lang="ts">
	import { page } from "$app/stores";
	import { browser } from "$app/environment";
	import { tracking_cookies } from "js/settings";
	import Links from "js/links";
	import Modal from "lib/Modal.svelte";

	let shouldPrompt = false;

	const KEY = "consented";
	function has_already_accepted() {
		return localStorage.getItem(KEY);
	}

	function accept_neccessary_cookies() {
		localStorage.setItem(KEY, "minimal");
		shouldPrompt = false;
		tracking_cookies.set(false);
	}

	function accept_all_cookies() {
		localStorage.setItem(KEY, "all");
		shouldPrompt = false;
		tracking_cookies.set(true);
	}

	const WHITELISTED_PAGES = [Links.INFO, Links.ABOUT_US, Links.CONTACT_US, Links.TOS];

	$: {
		if (browser) {
			if (navigator.userAgent?.toLowerCase()?.includes("bot")) {
				shouldPrompt = false;
			} else if (WHITELISTED_PAGES.includes($page.url.pathname)) {
				shouldPrompt = false;
			} else if (has_already_accepted()) {
				shouldPrompt = false;
			} else {
				shouldPrompt = true;
			}
		}
	}
</script>

{#if !shouldPrompt}
	<slot />
{:else}
	<Modal visible>
		<div id="container">
			<h1>
				This site is for <span id="red">Adults Only</span>!
			</h1>
			<p>
				By entering this website, I acknowledge that I am 18 years old or older and agree to
				the
				<a href="{Links.TOS}"> Terms of Service </a>.
			</p>
			<p>
				Some cookies are required for this site to work, such as user settings and caching.
				However, some cookies non-nessarary cookies are used for Google Ads/Analytics and
				other serivces.
			</p>
			<div id="buttons">
				<button on:click="{accept_all_cookies}"> All Cookies </button>
				<button on:click="{accept_neccessary_cookies}"> Neccessary Cookies </button>
			</div>
		</div>
	</Modal>
	<div id="background-blur">
		<slot />
	</div>
{/if}

<style>
	div#container {
		max-width: 30rem;
		padding: 0.5rem;

		background-color: var(--BACKGROUND-1);
		border: 0.2em solid var(--BORDER-1);
		border-radius: 1rem;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}

	div#buttons {
		display: flex;
		gap: 2rem;
	}

	div#buttons > button {
		appearance: none;
		cursor: pointer;
		height: 3rem;
		width: 9rem;
		border-radius: 1rem;
		border: 0.2rem solid var(--BORDER-1);

		background: var(--BACKGROUND-3);
		color: white;
	}

	h1 {
		text-align: center;
	}

	span#red {
		color: red;
	}

	p {
		margin-top: 0.1rem;
		margin-bottom: 0.5rem;
		text-align: center;
	}

	div#background-blur {
		position: absolute;
		z-index: 0;
		width: 100vw;
		height: 100vh;
		filter: blur(10px);
	}
</style>
