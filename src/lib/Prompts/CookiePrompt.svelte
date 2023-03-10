<script lang="ts">
	import GenericPrompt from "./GenericPrompt.svelte";
	export let shouldPrompt: boolean;
</script>

<GenericPrompt
	bind:shouldPrompt="{shouldPrompt}"
	paragraphs="{[
		'This site needs to make use of cookies and local storage in order to improve performance and provide login services.',
		'We do not use cookies for tracking or advertising.',
		'These cookies are required for the site to function and you therefore must accept them in order to use the site.',
	]}"
	buttonText="Accept Cookies"
	key="accept_cookies"
/>
