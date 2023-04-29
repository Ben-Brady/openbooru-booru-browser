<script lang="ts">
	import { TagNamespace } from "js/booru/types";
	import { createEventDispatcher } from "svelte";

	export let name: string;
	export let namespace: TagNamespace | undefined = undefined;
	export let count: number | undefined = undefined;
	export let href: string | undefined = undefined;
	export let showCount: boolean = true;

	namespace ??= TagNamespace.Generic;

	const dispatch = createEventDispatcher();
</script>

<a href="{href}" on:click="{() => dispatch('click', name)}">
	<span class="{namespace}">
		{name}
		{#if showCount && count !== undefined}
			({count})
		{/if}
		<slot />
	</span>
</a>

<style lang="scss">
	a {
		cursor: pointer;
		text-decoration: none;
		width: fit-content;
		height: fit-content;
	}

	span {
		width: min-content;
		display: flex;
		gap: 0.2rem;
		align-items: center;
		justify-content: left;

		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;

		border: 0.1rem solid var(--BORDER-2);
		border-radius: 1rem;
		background: var(--BACKGROUND-3);

		padding: 0 0.3rem;

		transition: 0.2s ease-in-out;
		a:hover & {
			color: invert(90%);
			background-color: var(--BACKGROUND-3-HOVER);
		}
	}

	span.copyright {
		color: #f0a0f0;
	}

	span.character {
		color: #f0f0a0;
	}

	span.creator {
		color: #f0a0a0;
	}

	span.meta {
		color: #90d9ed;
	}
</style>
