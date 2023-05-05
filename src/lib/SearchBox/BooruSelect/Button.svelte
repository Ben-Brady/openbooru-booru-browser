<script lang="ts">
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();
	import type { Booru } from "js/booru/types";
	import { browser } from "$app/environment";

	export let booru: Booru | null = null;
</script>

<button on:click="{() => dispatch('click')}">
	<div>
		{#if browser}
			<img src="{booru?.icon}" alt="{booru?.display_name}" />
		{/if}
	</div>
</button>

<style>
	button {
		background: none;
		border: none;

		cursor: pointer;
		border-radius: 25%;
		border: 0.2rem solid var(--BORDER-1);
		padding: 0.1rem;
		box-sizing: content-box;
	}

	div {
		width: 30px;
		height: 30px;
		border-radius: 25%;
	}

	img {
		width: 100%;
		height: 100%;
	}

	img:hover {
		border-color: var(--BORDER-5);
	}

	button:hover {
		filter: brightness(0.9);
	}

	img:active {
		transition: 100ms ease-in-out;
		transform: rotate(10deg);
	}
</style>
