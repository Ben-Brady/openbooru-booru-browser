import { type Post, Sort, boorus } from "js/booru";
import { generate_post_link } from "js/links";
import { SITE_URL } from "js/config";
import Cache from "js/cache";

async function get_posts() {
	return await Cache.use_cache_async("sitemap", 3600 * 24, async () => {
		let all_posts: Post[] = [];
		for (let booru of boorus) {
			let posts = await booru.search({ sort: Sort.Top_Rated }, 0);
			all_posts.push(...posts);
		}
		return all_posts;
	});
}

function generate_url(path: string, changefreq: string, priority: string) {
	return (
		`<url>` +
		`<loc>${SITE_URL + path}</loc>` +
		`<changefreq>${changefreq}</changefreq>` +
		`<priority>${priority}</priority>` +
		`</url>`
	);
}

export async function GET() {
		const prefix =
		`<?xml version="1.0" encoding="UTF-8"?>` +
		`<urlset ` +
		`xmlns="https://www.sitemaps.org/schemas/sitemap/0.9" ` +
		`xmlns:news="https://www.google.com/schemas/sitemap-news/0.9" ` +
		`xmlns:xhtml="https://www.w3.org/1999/xhtml" ` +
		`xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0" ` +
		`xmlns:image="https://www.google.com/schemas/sitemap-image/1.1" ` +
		`xmlns:video="https://www.google.com/schemas/sitemap-video/1.1" ` +
		">";
		const suffix = "</urlset>";

		const urls: string[] = [];
		urls.push(generate_url("/", "monthly", "1"));
		urls.push(generate_url("/posts", "monthly", "1"));
		urls.push(generate_url("/info", "monthly", "1"));

		let posts = await get_posts();

		for (const post of posts) {
			let url = generate_post_link(post.id, post.booru);
			let xml = generate_url(url, "monthly", "0.8");
			urls.push(xml);
		}

		const body = prefix + urls.join("") + suffix;
		return new Response(body, {
			headers: {
				"Cache-Control": "max-age=3600",
				"Content-Type": "application/xml",
			},
		});
}
