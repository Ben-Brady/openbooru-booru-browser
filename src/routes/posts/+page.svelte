<script lang="ts">
	import { get_booru, type Booru } from "js/booru";
	import PostsPage from "lib/Posts/Page.svelte";
	import HeadInfo from "lib/HeadInfo.svelte";
	import Settings from "js/settings";

	let booru: Booru;
	Settings.current_booru.subscribe(value => {
		booru = get_booru(value)
	})
	</script>

<HeadInfo path="/posts" />
<PostsPage booru="{booru}" />
