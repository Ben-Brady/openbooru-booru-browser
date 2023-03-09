<script lang="ts">
	export let source: string;

	let url: URL | null;
	try {
		url = new URL(source);
	} catch {
		url = null;
	}
</script>

{#if url === null}
	<div title="{source}">
		<span>{source}</span>
	</div>
{:else}
	<div title="{url.hostname}">
		<span>{source}</span>
		<a href="{source}">
			<img src="/images/link.svg" height="{10}" width="{10}" alt="Link to Source" />
		</a>
	</div>
{/if}

<style>
	img {
		margin-top: 0.2rem;
		margin-left: 0.2rem;
		width: 0.8rem;
		height: 0.8rem;
	}

	a {
		user-select: none;
		cursor: pointer;
	}
</style>
