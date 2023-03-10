<script lang="ts">
	import type { Post } from "js/booru/types";
	import Media from "lib/Post/Media/index.svelte";
	import PostInfo from "lib/Post/Info/index.svelte";
	import Button from "./button.svelte";

	export let exit: () => void;
	export let visit: () => void;
	export let gotoNextPost: () => void;
	export let gotoPrevPost: () => void;
	export let prevPost: Post | null;
	export let post: Post;
	export let nextPost: Post | null;
	export let loading: boolean;

	function keyboardHandler(e: KeyboardEvent) {
		// @ts-ignore
		if (e.target.tagName === "INPUT") return;
		let KEYBINDS = {
			Escape: exit,
			w: visit,
			ArrowUp: visit,
			s: exit,
			ArrowDown: exit,
			a: gotoNextPost,
			ArrowRight: gotoNextPost,
			d: gotoPrevPost,
			ArrowLeft: gotoPrevPost,
		};
		if (e.key in KEYBINDS) {
			// @ts-ignore
			KEYBINDS[e.key]();
		}
	}
</script>

<div id="container" on:keydown="{keyboardHandler}">
	<div id="post">
		<Button post="{prevPost}" callback="{gotoPrevPost}" />
		<Media post="{post}" />
		<Button post="{nextPost}" callback="{gotoNextPost}" loading="{loading}" />
	</div>
	<PostInfo post="{post}" />
</div>

<style>
	div#container {
		position: relative;
		height: 100%;
		width: 100%;
		top: 0;
		left: 0;
		overflow-y: auto;
		overflow-x: hidden;
	}

	div#post {
		width: 100%;
		height: calc(100% - 1.5rem);
		user-select: none;
		border-bottom: #000 solid 1px;

		/* Flex */
		display: grid;
		grid-template-columns: 5rem 1fr 5rem;
		grid-template-rows: 100%;
	}
</style>
