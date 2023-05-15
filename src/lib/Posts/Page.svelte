<script lang="ts">
	import { goto } from "$app/navigation";
	import { browser } from "$app/environment";
	import { createInfiniteQuery } from '@tanstack/svelte-query'
	import type { Booru, Query } from "js/booru/types";
	import SearchBox from "lib/SearchBox/index.svelte";
	import Column from "lib/Posts/Column/index.svelte";
	import { generate_posts_link } from "js/links";

	export let booru: Booru;
	export let query: Query;

	let page_width = 0;

	$: {
		if (browser) {
			let url = generate_posts_link(query, booru.short_name);
			goto(url);
		}
	}

	async function fetchNextPage({ pageParam: pid = 0 }) {
		let posts = await booru.search(query, pid);
		let next_page_param = posts.length > 0 ? pid + 1 : undefined;
		return {
			posts,
			next_page_param,
		};
	}

	$: infinite_query = createInfiniteQuery({
		queryKey: [booru.short_name, query],
		queryFn: fetchNextPage,
		getNextPageParam: (lastGroup) => lastGroup.next_page_param,
		staleTime: Infinity,
		cacheTime: 60 * 1000
	})
	$: posts = $infinite_query.data?.pages.map(p => p.posts).flat() ?? [];
	$: loading = $infinite_query.isLoading;
	$: requestPosts = async () => {
		navigator.locks.request("posts-search", { ifAvailable: true, }, async (lock) => {
			if (lock === null) return;
			await $infinite_query.fetchNextPage();
		});
	};
</script>

<svelte:window bind:innerWidth="{page_width}"/>
{#if browser && page_width < 640}
	<Column
		finished={false}
		loading={loading}
		posts={posts}
		requestPosts={requestPosts}
	/>
{:else}
	<div id="container">
		<div id="search">
			<SearchBox
				bind:booru={booru}
				bind:query={query}
			/>
		</div>
		<Column
			finished={false}
			loading={loading}
			posts={posts}
			requestPosts={requestPosts}
		/>
	</div>
{/if}

<style>
	div#search {
		margin-top: 1rem;
		margin-left: 1rem;
	}

	div#container {
		display: grid;
		grid-template-columns: 18rem 1fr;
		/* grid-template-columns: 1fr; */
		width: 100%;
		height: 100%;
	}

	div#container:nth-child(1) {
		border-left: 1px solid black;
	}
</style>
