<script lang="ts">
	import { onMount } from "svelte";
	import Modal from "lib/Modal.svelte";

	export let opacity: number = 0.8;
	export let paragraphs: string[];
	export let buttonText: string;
	export let key: string;
	export let shouldPrompt: boolean = false;

	function accept() {
		localStorage.setItem(key, "yes");
		shouldPrompt = false;
	}

	onMount(() => {
		let useragent = navigator.userAgent.toLowerCase();
		if (useragent.includes("bot")) {
			shouldPrompt = false;
		} else if (localStorage.getItem(key)) {
			shouldPrompt = false;
		} else {
			shouldPrompt = true;
		}
	});
</script>

{#if shouldPrompt}
	<main style="{`background: rgba(0, 0, 0, ${opacity});`}">
		<Modal visible>
			<div id="container">
				{#each paragraphs as paragraph}
					<p>
						{paragraph}
					</p>
				{/each}
				<button on:click="{accept}">
					{buttonText}
				</button>
			</div>
		</Modal>
	</main>
{/if}

<style>
	main {
		position: absolute;
		z-index: 10;
		width: 100vw;
		height: 100vh;
	}

	div#container {
		max-width: 30rem;
		padding: 0.5rem;

		background-color: var(--BACKGROUND-4);
		border: 0.2em solid var(--BORDER-1);
		border-radius: 1rem;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}

	p {
		margin-top: 0.1rem;
		margin-bottom: 0.5rem;
		text-align: center;
	}
</style>
