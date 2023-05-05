<script lang="ts">
	import { browser } from "$app/environment";
  import { favourites } from "js/settings";
  import ColumnPage from "lib/Posts/Column/index.svelte";
</script>

<main>
  {#if browser && $favourites.length === 0}
    <p>No favourites</p>
  {:else}
    <ColumnPage
      finished={true}
      loading={false}
      posts={$favourites}
      requestPosts={async (..._) => {}}
    />
  {/if}
</main>


<style lang="scss">
  main {
    padding: 1rem;
  }
</style>
