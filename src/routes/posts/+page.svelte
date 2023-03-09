<script lang="ts">
	import type { Post } from "js/booru/types";
	import { Rule34 } from "js/booru/rule34";
	import { browser } from "$app/environment";
	import PostsPage from "lib/Posts/Page.svelte";
	import HeadInfo from "lib/HeadInfo.svelte";

	let layout: "grid" | "column" = "grid";
	if (browser) {
		let last_layout = localStorage.getItem("last-posts");
		if (last_layout === "grid" || last_layout === "column") {
			layout = last_layout;
		}
	}
</script>

<HeadInfo path="/posts" />
<PostsPage layout={layout} booru={Rule34} />
