<script lang="ts">
	export let measurementID: string;
</script>

<svelte:head>
	<script async src="https://www.googletagmanager.com/gtag/js?id={measurementID}"></script>
	<script data-measurementID="{measurementID}">
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			dataLayer.push(arguments);
		}
		gtag("js", new Date());

		gtag("config", document.currentScript.getAttribute("data-measurementID"));
	</script>
</svelte:head>
