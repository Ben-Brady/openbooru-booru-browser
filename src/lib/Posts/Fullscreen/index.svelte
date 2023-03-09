<script lang="ts">
	import type { Post } from "js/booru/types";
	import { onMount } from "svelte";
	import Links from "js/links";
	import DesktopPosts from "./desktop.svelte";

	export let loading: boolean;
	export let finished: boolean;
	export let posts: Post[];
	export let requestPosts: () => void;
	export let exitCallback: () => void;
	export let index: number;
	export let setIndex: (index: number) => void;

	const post = posts[index];
	const prevPost = posts[index - 1];
	const nextPost = posts[index + 1];

	function CheckForMorePosts() {
		const postsRemaining = posts.length - (index + 1);
		if (postsRemaining < 32) {
			requestPosts();
		}
	}

	function visit() {
		window.location.href = Links.post(post.id);
	}

	function gotoNextPost() {
		CheckForMorePosts();
		if (index !== posts.length - 1) {
			setIndex(index + 1);
		}
	}

	function gotoPrevPost() {
		if (index > 0) {
			setIndex(index - 1);
		}
	}

	onMount(CheckForMorePosts);
</script>

<DesktopPosts
	exit={exitCallback}
	visit={visit}
	gotoNextPost={gotoNextPost}
	gotoPrevPost={gotoPrevPost}
	prevPost={prevPost}
	post={post}
	nextPost={nextPost}
	loading={loading}
/>
