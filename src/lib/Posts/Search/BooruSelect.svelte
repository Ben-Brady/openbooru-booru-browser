<script lang="ts">
	type BooruOption = {
		short_name: string;
		display_name: string;
		icon: string;
	};

	const boorus: BooruOption[] = [
		{
			short_name: "rule34",
			display_name: "Rule 34",
			icon: "https://rule34.xxx/favicon.ico",
		},
		{
			short_name: "e621",
			icon: "https://e621.net/favicon.ico",
			display_name: "E621",
		},
		{
			short_name: "gelbooru",
			icon: "https://gelbooru.com/favicon.ico",
			display_name: "Gelbooru",
		},
		{
			short_name: "safebooru",
			icon: "https://safebooru.org/favicon.ico",
			display_name: "Safebooru",
		},
	];
</script>

<div id="popout">
	<div id="options">
		{#each boorus as booru}
			<button name="{booru.short_name}" class="option">
				<img src="{booru.icon}" alt="{booru.display_name}" />
				<span>{booru.display_name}</span>
			</button>
		{/each}
	</div>
</div>
