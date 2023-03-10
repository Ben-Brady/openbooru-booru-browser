import type { Post } from "js/booru/types";
import Links from "js/links";
import { SITE_URL } from "js/config";
import { boorus } from "js/booru";
import { Sort } from "js/booru/query";

let lastUpdated = new Date(0);

let cached_posts: Post[] = [];
async function updateCache() {
	cached_posts = [];
	for (let booru of boorus) {
		let posts = await booru.search({ sort: Sort.HighestRated }, 0);
		cached_posts = cached_posts.concat(posts);
	}
	lastUpdated = new Date();
	return cached_posts;
}

async function getPosts(): Promise<Post[]> {
	const curDate = new Date();
	const timeSinceUpdated = (Number(curDate) - Number(lastUpdated)) / 1000;

	if (timeSinceUpdated > 3600) {
		return updateCache();
	} else {
		return cached_posts;
	}
}

function generateSitemapUrl(path: string, changefreq: string, priority: string) {
	return (
		"<url>" +
		`<loc>${SITE_URL + path}</loc>` +
		`<changefreq>${changefreq}</changefreq>` +
		`<priority>${priority}</priority>` +
		"</url>"
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
	urls.push(generateSitemapUrl("/", "monthly", "1"));
	urls.push(generateSitemapUrl("/posts", "monthly", "1"));
	urls.push(generateSitemapUrl("/info", "monthly", "1"));

	const posts = await getPosts();
	for (const post of posts) {
		let url = Links.post(post.id, post.booru);
		let xml = generateSitemapUrl(url, "monthly", "0.8");
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
