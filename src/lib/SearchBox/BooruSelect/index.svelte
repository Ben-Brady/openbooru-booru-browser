<script lang="ts">
  import BooruButton from "./Button.svelte";
  import BooruSelect from "./Selection.svelte";
	import type { Booru } from "js/booru/types";

  export let booru: Booru

  let displayBooruSelect = false;
  const toggle = () => displayBooruSelect = !displayBooruSelect;
  const hide = () => displayBooruSelect = false;
</script>

<BooruButton booru={booru} on:click={toggle}/>
<div hidden={!displayBooruSelect}>
  <BooruSelect
    on:click={event => {
      booru = event.detail;
      hide()
    }}
    bind:selected_booru={booru}
  />
</div>

<style>
  div {
    position: absolute;
    border: var(--BORDER-1) solid .1rem;
    background: var(--BACKGROUND-3);
  }
</style>
