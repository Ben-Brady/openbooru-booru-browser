<script>
	import Item from "./Section.svelte";
</script>

<nav>
	<Item path="/" name="Home" image="/images/home.svg" />
	<Item path="/info" name="Info" image="/images/info.svg" />
</nav>

<style>
	nav {
		position: sticky;
		top: 0;
		left: 0;
		height: var(--NAVBAR-HEIGHT);
		max-height: var(--NAVBAR-HEIGHT);
		width: 100vw;
		z-index: 1;

		/* Grid */
		display: flex;
		object-fit: fill;
		align-items: center;
	}

	nav {
		background-color: var(--BACKGROUND-2);
		outline: black 0 solid;
		outline-width: 1px;
	}

	@media screen and (max-width: 40rem), (orientation: portrait) {
		nav {
			justify-content: space-around;
		}
	}
</style>
