<script lang="ts">
	import { TagNamespace, type Tag as TagType } from "js/booru";
	import Tag from "lib/Tag.svelte";
	import { generate_tag_link } from "js/links";

	export let tags: TagType[] = [];
	export let callback: (tag: string) => void = () => {};

	let order = [
		TagNamespace.Creator,
		TagNamespace.Copyright,
		TagNamespace.Character,
		TagNamespace.Meta,
		TagNamespace.Generic,
	];
	let tags_copy = tags.slice();
	tags_copy.sort();
	tags_copy.sort((a, b) => order.indexOf(a.namespace) - order.indexOf(b.namespace));
</script>

<div>
	{#each tags_copy as tag}
		<Tag
			name="{tag.name}"
			count="{tag.count}"
			namespace="{tag.namespace}"
			on:click="{() => callback(tag.name)}"
			href="{generate_tag_link(tag.name)}"
		/>
	{/each}
</div>

<style>
	div {
		position: relative;
		height: fit-content;
		width: 100%;

		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		align-content: baseline;
		gap: 0.5rem;

		overflow-y: auto;
		margin-top: 1rem;
		margin-bottom: 1rem;
	}
</style>
