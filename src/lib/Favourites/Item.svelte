<script lang="ts">
  import type { Favourite } from "js/favoruites";
	import { generate_post_link } from "js/links";

  export let favourite: Favourite;

  let link = generate_post_link(favourite.id, favourite.booru);
</script>

<a href={link}>
  <img
    alt={`Post ${favourite.booru} ${favourite.id}`}
    src={favourite.thumbnail}
  />
</a>

<style lang="scss">
  a {
    display: block;
    width: 10rem;
    height: auto;

    border: 0.2rem solid var(--BORDER-1);
    &:hover {
      border-color: var(--BORDER-1-HOVER);
    }

    &, & img {
      border-radius: 2rem;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;

    border-radius: 2rem;
    border: 0.1rem solid var(--COLOR-BORDER-1);
  }
</style>
