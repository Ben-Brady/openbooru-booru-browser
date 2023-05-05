<script lang="ts">
	export let src: string = "/favicon.ico";
	export let name: string = "";
	export let href: string = "";
	export let active: boolean = false;

	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();
</script>

{#if href}
	<a href="{href}">
		<button class="{active ? 'active' : ''}">
			<img src="{src}" alt="{name}" />
		</button>
	</a>
{:else}
	<button class="{active ? 'active' : ''}" on:click="{() => dispatch('click')}">
		<img src="{src}" alt="{name}" />
	</button>
{/if}

<style lang="scss">
	button {
		aspect-ratio: 1/1;
		min-width: 48px;
		min-height: 48px;
		width: 2.5rem;
		height: 2.5rem;
		padding: 0.2rem;

		background-color: var(--BACKGROUND-3);
		border: 0.15rem solid var(--BORDER-1);
		border-radius: 0.4rem;

		display: flex;
		justify-content: center;
		align-items: center;

		cursor: pointer;
		transition: 0.2s ease-in-out;
		&:hover,
		&.active {
			background-color: var(--BACKGROUND-3-HOVER);
		}
	}

	img {
		width: 100%;
		height: 100%;

		filter: invert(0%);

		animation-fill-mode: forwards;
		transition: 0.2s ease-in-out;

		button:hover & {
			filter: invert(90%);
		}
	}
</style>
