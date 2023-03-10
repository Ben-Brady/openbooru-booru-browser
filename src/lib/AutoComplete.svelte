<script lang="ts">
	import Tag from "./Tag.svelte";

	export let input: string;
	export let autocomplete_func: (search: string) => Promise<string[]>;
	export let callback: (tag: string) => void;
</script>

{#await autocomplete_func(input) then tags}
	{#if tags.length > 0}
		<div>
			{#each tags as tag}
				<Tag name="{tag}" on:click="{() => callback(tag)}" />
			{/each}
		</div>
	{/if}
{/await}

<style>
	div {
		min-width: 8em;
		height: fit-content;
		padding: 0.2rem;

		background: var(--BACKGROUND-3);
		border: 0.2rem solid var(--BORDER-1);
		border-radius: 1rem;

		display: flex;
		flex-direction: column;
		align-items: baseline;
		gap: 0.5rem;
	}
</style>
