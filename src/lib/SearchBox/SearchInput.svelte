<script lang="ts">
	import { onMount, onDestroy } from "svelte";

	export let search: string|undefined;
	let input: string = search ?? "";

	let element: HTMLInputElement;
	$: {
		clearTimeout(update_timeout);
		update_timeout = setTimeout(() => {
			search = input
		}, 1000)
	}

	let update_timeout: string | number | NodeJS.Timeout | undefined;
	onMount(() => {
		search = input;
	})
	onDestroy(() => {
		clearTimeout(update_timeout);
	})
</script>

<div>
	<img src="/images/search.svg" alt="Search" />
	<input bind:this={element} bind:value="{input}"/>
</div>

<style>
  div {
    height: 1.5rem;
    width: 100%;
    display: flex;
    gap: .5rem;
    justify-content: left;
    align-items: center;
  }

	img {
		width: 1.2rem;
		height: 1.2rem;
	}

	input {
		height: 1rem;
		width: 16em;
		border-radius: 1rem;
	}
</style>
