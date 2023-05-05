<script lang="ts">
	import type { Post } from "js/booru";
	import type { Favourite } from "js/types";
  import { favourites } from "js/settings";

  export let post: Post;

  let favourited = $favourites.map(f => f.id).includes(post.id);

  function add_favourite(post: Post) {
      let favourite: Favourite = {
        id: post.id,
        booru: post.booru,
        thumbnail: post.preview?.url ?? post.thumbnail.url,
      };
      favourites.update(favs => [...favs, favourite]);
  }

  function remove_favourite(post: Post) {
      favourites.update(favs => favs.filter(f => f.id !== post.id));
  }

  function toggle() {
    if (favourited) remove_favourite(post);
    else add_favourite(post);
    favourited = !favourited;
  }
</script>

<button on:click="{toggle}">
  <img
    alt="Favourite"
    src="/images/heart-solid.svg"
    data-favourited="{favourited}"
  >
</button>

<style lang="scss">
  button {
    width: 3rem;
    height: 3rem;
    border: none;
    background: none;
    appearance: none;
    cursor: pointer;
  }
  img {
    width: 100%;
    height: 100%;
    &[data-favourited="true"] {
      filter: invert(18%) sepia(40%) saturate(6934%) hue-rotate(354deg) brightness(100%) contrast(100%);
    }
  }
</style>
