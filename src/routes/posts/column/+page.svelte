<script lang="ts">
	import PostsPage from "lib/Posts/Page.svelte";
	import HeadInfo from "lib/HeadInfo.svelte";
	import { browser } from "$app/environment";
	import { boorus } from "js/booru";

	if (browser) {
		localStorage.setItem("last-posts", "column");
	}
</script>

<HeadInfo path="/posts/column" />
<PostsPage layout="column" booru="{boorus[0]}" />
