<script lang="ts">
	export let image: string;
	export let name: string;
	export let path: string;
	export let callback: (() => void) | null = null;

	function onClick(e: Event) {
		if (callback === null) return;
		e.preventDefault();
		callback();
	}
</script>

<a href="{path}" title="{name}" on:click="{onClick}">
	<img src="{image}" alt="{name}" height="32" width="32" />
	<span>
		{name}
	</span>
</a>

<style lang="scss">
	a {
		/* Shape */
		min-width: 5rem;
		height: calc(100% - 0.6rem);
		border-radius: 1rem;
		margin: 0.3rem;
		padding: 0 0.5rem;

		/* Center containinng items */
		display: flex;
		gap: 1rem;
		align-items: center;
		justify-content: left;
		transition: 0.2s ease-in-out;
	}

	a {
		cursor: pointer;
		border: 3px solid var(--BORDER-1);
		background-color: var(--BACKGROUND-3);

		&:hover {
		background-color: var(--BACKGROUND-3-HOVER);
		}
	}

	span {
		font-size: 1.3rem;
		color: black;
		text-decoration: none;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		transition: 0.2s ease-in-out;

		a:hover & {
			filter: invert(90%);
		}
	}

	img {
		height: 1.5rem;
		width: 1.5rem;
		position: relative;
		left: 0.3rem;
	}

	@media screen and (max-width: 40rem), (orientation: portrait) {
		a {
			width: 100%;
			padding: 0;
			margin: 0.1rem;
			justify-content: center;
		}
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
