<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  import type { Booru } from "js/booru/types";

  export let booru: Booru;
</script>

<button on:click={() => dispatch("click")}>
  <img
    src={booru.icon}
    alt="{booru.display_name}"
  />
</button>


<style>
  button {
    background: none;
    border: none;

    cursor: pointer;
    border-radius: 25%;
    width: 2.8rem;
    height: auto;

  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 25%;
    border: .2rem solid var(--BORDER-1);
  }

  img:hover {
    border-color: var(--BORDER-5);
  }

  button:hover {
    filter: brightness(0.9);
  }

  img:active {
    transition: 100ms ease-in-out;
    transform: rotate(10deg);
  }
</style>
