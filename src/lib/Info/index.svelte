<script lang="ts">
	import Sidebar from "./Sidebar.svelte";
	import About from "./About.svelte";
	import Contact from "./Contact.svelte";
	import ToS from "./ToS.svelte";

	export let page: "about" | "contact" | "tos" = "about";
</script>

<main>
	<Sidebar current="{page}" />
	<div>
		{#if page == "about"}
			<About />
		{:else if page == "contact"}
			<Contact />
		{:else if page == "tos"}
			<ToS />
		{/if}
	</div>
</main>

<style>
	main {
		display: grid;
		grid-template-columns: 10rem 1fr;
		height: 100%;
		background: var(--BACKGROUND-1);
	}

	div {
		padding-left: .5em;
		padding-right: .5em;

		font-size-adjust: 0.7;
		height: 100%;
		overflow-y: auto;
	}
</style>
