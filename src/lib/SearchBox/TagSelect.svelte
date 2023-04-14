<script lang="ts">
  import { get_booru, type Booru } from "js/booru"
	import { current_booru } from "js/settings";

  let booru: Booru;
  current_booru.subscribe(value => { booru = get_booru(value) })

  async function searchTags(search: string) {
    return await booru.search_tags(search)
  }

  let search = "";
</script>

<input bind:value={search}/>
{#await searchTags(search) then tags}
  {#if tags.length > 0}
    <div>

    </div>
  {/if}

{/await}

<style lang="scss">
  input {
    margin-top: 1rem;
    width: 10rem;
    border-radius: .5rem;
    border: 0;
  }

  div {
    position: fixed;
    background-color: var(--BACKGROUND-2);
    width: 10rem;
    height: 100px;
  }
</style>
