<script lang="ts">
  import MediaSelect from "./MediaSelect.svelte";
  import SearchInput from "./SearchInput.svelte";
  import SortSelect from "./SortSelect.svelte";
  import BooruSelect from "./BooruSelect/index.svelte";
  import type { Query, Booru } from "js/booru/types";

  export let query: Query = {};
  export let booru: Booru;
  $: ((_) => {
    let tmp_query: Query = Object.assign({}, query);
    if (tmp_query.media && tmp_query.media.length === 0) {
      delete tmp_query.media
    }
    if (tmp_query.search && tmp_query.search.length === 0) {
      delete tmp_query.search
    }

    if (tmp_query !== query) {
      query = tmp_query
    }
  })(query)
</script>

<div id="container">
  <!-- Only one booru supported rn -->
  <MediaSelect bind:media={query.media}/>
  <div id="asdf">
    <BooruSelect bind:booru={booru}/>
    <SortSelect bind:sort={query.sort}/>
  </div>
  <SearchInput bind:search={query.search}/>
</div>

<style>
  div#container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: .5rem;
    background: var(--BACKGROUND-3);

    padding: .5rem;
    width: fit-content;
    height: fit-content;

    border: 2px solid black;
    border-radius: .5rem;
  }

  div#asdf {
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 1rem;

    width: 100%;
  }
</style>
