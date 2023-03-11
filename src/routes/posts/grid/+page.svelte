<script lang="ts">
	import PostsPage from "lib/Posts/Page.svelte";
	import HeadInfo from "lib/HeadInfo.svelte";
	import Settings from "js/settings";

	Settings.last_layout = "grid"
</script>

<HeadInfo path="/posts/grid" />
<PostsPage layout="grid" booru="{Settings.last_booru}" />
