<script lang="ts">
	import { boorus } from "js/booru";
	import PostsPage from "lib/Posts/Page.svelte";
	import HeadInfo from "lib/HeadInfo.svelte";
	import Settings from "js/settings";
	</script>

<HeadInfo path="/posts" />
<PostsPage layout="{Settings.last_layout}" booru="{Settings.last_booru}" />
