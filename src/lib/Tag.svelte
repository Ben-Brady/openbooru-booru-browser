<script lang="ts">
	import type { Tag } from "js/booru/types";
	import { createEventDispatcher } from "svelte";
	
	export let tagName: string | null = null;
	export let data: Tag | null = null;
	export let href: string | null = null;
	export let showCount: boolean = false;

	const name = tagName ?? data?.name ?? "Foo";
	const namespace = data?.namespace ?? "generic";
	const count = data?.count ?? null;

	const dispatch = createEventDispatcher()
</script>

<a href="{href}" on:click={() => dispatch("click", name)}>
	<span class="{namespace}">
		{name}
		{#if showCount && count !== null}
			{count}
		{/if}
		<slot />
	</span>
</a>

<style>
	a {
		cursor: pointer;
		text-decoration: none;
		width: fit-content;
		height: fit-content;
	}

	span {
		display: flex;
		gap: 0.2rem;
		align-items: center;
		justify-content: left;

		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;

		border: 0.1rem solid var(--BORDER-2);
		border-radius: 1rem;
		background: var(--BACKGROUND-4);

		padding: 0 0.3rem;

		color: black;
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
