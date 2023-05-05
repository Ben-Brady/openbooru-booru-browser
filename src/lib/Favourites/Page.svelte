<script lang="ts">
	import { browser } from "$app/environment";
  import { favourites } from "js/settings";
  import FavouriteItem from "lib/Favourites/Item.svelte";
</script>

<main>
  {#if browser && $favourites.length === 0}
    <p>No favourites</p>
  {:else}
    <div>
      {#each $favourites as favourite}
      <FavouriteItem favourite="{favourite}" />
      {/each}
    </div>
  {/if}
</main>


<style lang="scss">
  main {
    padding: 1rem;
  }
  div {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
    grid-gap: 1rem;
  }
</style>
