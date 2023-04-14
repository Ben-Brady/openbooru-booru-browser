<script lang="ts">
  import BooruButton from "./Button.svelte";
  import BooruSelect from "./Selection.svelte";
	import { current_booru } from "js/settings";
	import type { Booru } from "js/booru/types";

  export let booru: Booru

  let displayBooruSelect = false;
  const toggle = () => displayBooruSelect = !displayBooruSelect;
  const hide = () => displayBooruSelect = false;
</script>

<BooruButton booru={booru} on:click={toggle}/>
{#if displayBooruSelect}
  <div>
    <BooruSelect
      on:click={event => {
        current_booru.set(event.detail);
        hide()
      }}
      bind:current_booru={booru}
    />
  </div>
{/if}

<style>
  div {
    position: absolute;
    border: var(--BORDER-1) solid .1rem;
    background: var(--BACKGROUND-3);
  }
</style>
