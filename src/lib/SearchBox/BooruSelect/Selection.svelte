<script lang="ts">
	import { browser } from "$app/environment";
  import type { Booru } from "js/booru/types";
  import { Rule34, E621  } from "js/booru";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

	const boorus = [ Rule34, E621 ];

	export let selected_booru: Booru;
	let active_booru: Booru|null = browser ? selected_booru : null
</script>

<div id="popout">
	<div id="options">
		{#each boorus as booru}
			<button
				name="{booru.short_name}"
				class={active_booru?.short_name === booru.short_name ? "option active" : "option" }
				on:click={() => dispatch("click", booru)}
			>
				<img src="{booru.icon}" alt="{booru.display_name}" />
				<span>{booru.display_name}</span>
			</button>
		{/each}
	</div>
</div>

<style>
	#popout {
		background: var(--COLOR-4);
		border: .2rem solid var(--COLOR-5);
		padding: .2rem;
		border-radius: .5rem;

		width: min-content;
		height: min-content;
	}

	#options {
		width: 8rem;

		display: flex;
		flex-flow: column nowrap;
		gap: .2rem;
	}

	.option {
		border: none;
		background: none;
		cursor: pointer;

		width: 100%;

		border-radius: .2rem;

		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		gap: .5rem;
	}

	.option:hover {
		background: var(--COLOR-3);
	}

	.active {
		background: var(--BAC-3);
		border: .1rem solid var(--COLOR-5);
	}

	.option>img {
		width: 1.5rem;
	}

	.option>span {
		font-weight: 600;
		color: #b0e0b0;
	}

</style>
