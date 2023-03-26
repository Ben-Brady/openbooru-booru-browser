<script lang="ts">
  import { Sort } from "js/booru/types"

  export let sort: Sort|undefined;
</script>

<div>
  <img src="/images/sort.svg" alt="Sort"/>
  <select bind:value={sort}>
    <option label="Hotest" value={Sort.Hotest}/>
    <option label="Newest" value={Sort.Newest}/>
    <option label="Highest Rated" value={Sort.Top_Rated}/>
    <option label="Lowest Rated" value={Sort.Lowest_Rated}/>
  </select>
</div>

<style>
  div {
    height: 1.5rem;
    width: 100%;
    display: flex;
    gap: .5rem;
    justify-content: left;
    align-items: center
  }

  img {
    width: 1.5rem;
    height: 1.5rem;
  }

  select {
    /* A reset of styles, including removing the default dropdown arrow */
    appearance: none;
    
    /* Additional resets for further consistency */
    background-color: transparent;
    border: none;
    text-decoration: underline;
    padding: 0 1em 0 0;
    margin: 0;
    width: 100%;
    
    width: min-content;
    font-family: inherit;
    font-size: inherit;
    cursor: inherit;
    line-height: inherit;
  }
</style>