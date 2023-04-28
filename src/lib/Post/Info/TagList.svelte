<script lang="ts">
	import { TagNamespace, type Tag as TagType } from "js/booru";
	import Tag from "lib/Tag.svelte";
	import { generate_posts_link } from "js/links";
	export let tags: TagType[] = [];

	let order = [
		TagNamespace.Creator,
		TagNamespace.Copyright,
		TagNamespace.Character,
		TagNamespace.Meta,
		TagNamespace.Generic,
	]
	let tags_copy = tags.slice();
	tags_copy.sort()
	tags_copy.sort((a, b) => order.indexOf(a.namespace) - order.indexOf(b.namespace));

	function create_link(tag: string) {
		let href = generate_posts_link({ search: tag });
		return href;
	}
</script>

<div>
	{#each tags_copy as tag}
		<Tag
			name="{tag.name}"
			count={tag.count}
			namespace={tag.namespace}
			href="{create_link(tag.name)}"
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

		height: 14rem;
		overflow-y: auto;
		margin-top: 1rem;
		margin-bottom: 1rem;
	}
</style>
