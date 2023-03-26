<script lang="ts">
  import BooruButton from "./Button.svelte";
  import BooruSelect from "./Selection.svelte";
	import Settings from "js/settings";
	import type { Booru } from "js/booru/types";
  
  export let booru: Booru
  
  let displayBooruSelect = false;
  const toggle = () => displayBooruSelect = !displayBooruSelect;
  const hide = () => displayBooruSelect = false;
</script>

<BooruButton booru={booru} on:click={toggle}/>
{#if displayBooruSelect}
  <BooruSelect
    on:click={event => {
      Settings.current_booru = event.detail;
      booru = event.detail;
      hide()
    }}
    bind:current_booru={booru}
  />
{/if}
