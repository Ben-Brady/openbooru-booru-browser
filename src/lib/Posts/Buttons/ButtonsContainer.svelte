<script lang="ts">
	export let position: "left" | "right";
</script>

<div id="{position}">
	<slot />
</div>

<style>
	div {
		position: absolute;
		z-index: 2;
		border-radius: 0.5rem;
		margin: 0.4rem;

		display: flex;
		justify-content: space-around;
		align-items: center;
		gap: 0.2rem;
	}

	div#left {
		left: 0;
	}

	div#right {
		right: 1rem;
	}
</style>
