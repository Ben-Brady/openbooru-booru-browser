<script lang="ts">
	export let current = "";

	function getActiveClass(mode: string) {
		if (current === mode) {
			return "active";
		} else {
			return "";
		}
	}
</script>

<div>
	<a href="/info/about" class="{getActiveClass('about')}"> About Us </a>
	<a href="/info/contact" class="{getActiveClass('contact')}"> Contact Us </a>
</div>

<style>
	div {
		background: var(--BACKGROUND-2);

		padding-left: 5%;
		display: flex;
		align-items: left;
		justify-content: center;
		flex-flow: wrap column;
	}

	a {
		font-size: 1.5rem;
		color: black;
	}

	a.active {
		font-weight: bolder;
	}
</style>
