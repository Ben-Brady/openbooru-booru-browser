<script lang="ts">
	import { TOS, ABOUT_US, CONTACT_US} from "js/links"
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
	<a href={ABOUT_US} class="{getActiveClass('about')}"> About Us </a>
	<a href={CONTACT_US} class="{getActiveClass('contact')}"> Contact Us </a>
	<a href={TOS} class="{getActiveClass('tos')}"> ToS </a>
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
	}

	a.active {
		font-weight: bolder;
	}
</style>
