<script lang="ts">
	import PostsPage from "lib/Posts/Page.svelte";
	import HeadInfo from "lib/HeadInfo.svelte";
	import Settings from "js/settings";

	Settings.last_layout = "column"
</script>

<HeadInfo path="/posts/column" />
<PostsPage layout="column" booru="{Settings.last_booru}" />
