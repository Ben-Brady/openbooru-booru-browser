<script lang="ts">
  import MediaSelect from "./MediaSelect.svelte";
  import SearchInput from "./SearchInput.svelte";
  import SortSelect from "./SortSelect.svelte";
  import BooruSelect from "./BooruSelect/index.svelte";
  import { type Query, type Booru, Sort } from "js/booru/types";
  
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

<div>
  <!-- <BooruSelect bind:booru={booru}/> -->
  <MediaSelect bind:media={query.media}/>
  <SortSelect bind:sort={query.sort}/>
  <SearchInput bind:search={query.search}/>
</div>

<style>
  div {
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
</style>