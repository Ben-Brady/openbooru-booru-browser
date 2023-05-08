<script>
	import { goto } from "$app/navigation";
	import { previous_booru } from "js/settings";
	import { onMount } from "svelte";

  onMount(async () => {
    let booru = $previous_booru;
    goto(`/posts/${booru}${location.search}`)
  })
</script>
