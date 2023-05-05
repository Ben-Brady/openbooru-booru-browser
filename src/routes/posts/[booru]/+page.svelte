<script lang="ts">
	import type { PageData } from "./$types";
	import { get_booru, type Booru } from "js/booru";
	import PostsPage from "lib/Posts/Page.svelte";
	import HeadInfo from "lib/HeadInfo.svelte";

	export let data: PageData;

	let booru: Booru = get_booru(data.booru_name);
</script>

<HeadInfo path="/posts" />
<PostsPage booru="{booru}" />
