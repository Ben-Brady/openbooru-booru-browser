<script lang="ts">
  import { MediaType } from "js/booru/types";

  export let media: MediaType[]|undefined;

  let media_types = [
    {text: "Gifs", value: MediaType.Animation},
    {text: "Images", value: MediaType.Image},
    {text: "Videos", value: MediaType.Video},
  ]

  function createToggleCallback(media_type: MediaType): () => void {
    return () => {
      if (media === undefined) {
        media = []
      }

      if (media.includes(media_type)) {
        media = media.filter(v => v !== media_type)
      } else {
        media = media.concat(media_type)
      }
    }
  }
</script>

<div id="container">
  {#each media_types as { text, value }}
    <button
      on:click={createToggleCallback(value)}
      data-selected={String(media && media.includes(value))}
    >
      <div class="blacked">
        <span data-selected={String(media && media.includes(value))}>
          {text}
        </span>
      </div>
    </button>
  {/each}
</div>

<style lang="scss">
  #container {
    display: flex;
    flex-flow: nowrap row;

    width: 100%;
    height: 4em;
    border: solid #c54242(0,0%,100%,.12) 1px;
  }

  div.blacked {
    &:hover {
      background: rgba(0, 0, 0, .12);
    }
  }

  button {
    /* Disable Button CSS*/
    border: 0;
    appearance: none;

    /* Centre span */
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    width: 100%;
    height: 100%;
    background: var(--BACKGROUND-3);
    color: white;
    font-weight: bold;


    &:hover {
      filter: brightness(1.1);
      transition: 100ms ease-out;
    }

    &[data-selected="true"] {
      transition: 50ms ease-in-out;
      background: var(--BACKGROUND-3-HOVER);
    }

    border: solid #000000 1px;

    --BORDER-RADIUS: .5rem;
    &:first-child {
      border-right: 0;
      border-top-left-radius: var(--BORDER-RADIUS);
      border-bottom-left-radius: var(--BORDER-RADIUS);
    }


    &:last-child{
      border-left: 0;
      border-top-right-radius: var(--BORDER-RADIUS);
      border-bottom-right-radius: var(--BORDER-RADIUS);
    }
  }
</style>
