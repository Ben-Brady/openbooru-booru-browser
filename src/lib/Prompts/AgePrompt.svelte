<script lang="ts">
	import GenericPrompt from "./GenericPrompt.svelte";
	export let shouldPrompt: boolean;
</script>

<GenericPrompt
	bind:shouldPrompt="{shouldPrompt}"
	opacity="{1}"
	paragraphs="{[
		'In order to use this site you need to be able over the age of 18.',
		'Please confirm your age.',
	]}"
	buttonText="I Am Over 18"
	key="acceptable_age"
/>
