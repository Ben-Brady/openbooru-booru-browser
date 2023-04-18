import type { Media, Post, Booru, Image } from "../types";
import { guess_media_type, guess_mimetype } from "../utils";
import { DOMParser } from "@xmldom/xmldom";

export function parse_xml_nodes(xml: string, booru: Booru): Post[] {
	const parser = new DOMParser();
	const document = parser.parseFromString(xml, "application/xml")
	const post_nodes = Array.from(document.getElementsByTagName("post"));

	let posts: Post[] = [];
	post_nodes.forEach(node => {
		const gel_post = parse_node(node);
		try {
			const post = parse_post(gel_post, booru);
			posts.push(post);
		} catch { }
	})

	return posts;
}

function parse_post(post: GelbooruPost, booru: Booru): Post {
	let origin = booru.generate_url(post.id);
	let id = Number(post.id).toString();
	let tags = post.tags
		.trim()
		.split(" ")
		.filter(v => v != "")
		.map(tag => ({ name: tag }));
	let score = Number(post.score);
	let created_at = new Date(post.created_at);
	let source = post.source;
	let type = guess_media_type(post.file_url);

	let full: Media = {
		url: post.file_url,
		width: Number(post.width),
		height: Number(post.height),
		type: guess_media_type(post.file_url),
		mimetype: guess_mimetype(post.file_url),
	};

	let preview: Media = {
		url: post.sample_url,
		width: Number(post.sample_width),
		height: Number(post.sample_height),
		type: guess_media_type(post.sample_url),
		mimetype: guess_mimetype(post.sample_url),
	};

	let thumbnail: Image = {
		url: post.preview_url,
		width: Number(post.preview_width),
		height: Number(post.preview_height),
		type: "image",
		mimetype: guess_mimetype(post.preview_url),
	};

	return {
		id,
		created_at,
		type,
		tags,
		origin,
		score,
		source,
		full,
		preview,
		thumbnail,
		booru: booru.short_name,
		title: "",
		description: "",
	};
}

function parse_node(node: Element): GelbooruPost {
	if (!node.getAttribute) {
		throw new Error("Invalid Element")
	}
	function assert_get_attribute(key: string): string {
		let value = node.getAttribute(key);
		if (value === null) {
			throw new Error("Assertiong Error");
		} else {
			return value;
		}
	}
	return {
		file_url: assert_get_attribute("file_url"),
		width: assert_get_attribute("width"),
		height: assert_get_attribute("height"),
		sample_url: assert_get_attribute("sample_url"),
		sample_width: assert_get_attribute("sample_width"),
		sample_height: assert_get_attribute("sample_height"),
		preview_url: assert_get_attribute("preview_url"),
		preview_width: assert_get_attribute("preview_width"),
		preview_height: assert_get_attribute("preview_height"),
		score: assert_get_attribute("score"),
		parent_id: assert_get_attribute("parent_id"),
		rating: assert_get_attribute("rating"),
		tags: assert_get_attribute("tags"),
		id: assert_get_attribute("id"),
		change: assert_get_attribute("change"),
		md5: assert_get_attribute("md5"),
		creator_id: assert_get_attribute("creator_id"),
		has_children: assert_get_attribute("has_children"),
		created_at: assert_get_attribute("created_at"),
		status: assert_get_attribute("status"),
		source: assert_get_attribute("source"),
		has_notes: assert_get_attribute("has_notes"),
		has_comments: assert_get_attribute("has_comments"),
	};
}

export type GelbooruPost = {
	file_url: string;
	width: string;
	height: string;
	sample_url: string;
	sample_width: string;
	sample_height: string;
	preview_url: string;
	preview_width: string;
	preview_height: string;
	score: string;
	parent_id: string;
	rating: string;
	tags: string;
	id: string;
	change: string;
	md5: string;
	creator_id: string;
	has_children: string;
	created_at: string;
	status: string;
	source: string;
	has_notes: string;
	has_comments: string;
};
// 	file_url="https://api-cdn.rule34.xxx/images/6626/12a78cf55a628c59abc8742dd0a5b4fc.jpeg"
// 	width="768"
// 	height="1056"

// 	sample_url="https://api-cdn.rule34.xxx/images/6626/12a78cf55a628c59abc8742dd0a5b4fc.jpeg"
// 	sample_width="768"
// 	sample_height="1056"

// 	preview_url="https://api-cdn.rule34.xxx/thumbnails/6626/thumbnail_12a78cf55a628c59abc8742dd0a5b4fc.jpg"
// 	preview_width="109"
// 	preview_height="150"

// 	score="3"
// 	parent_id=""
// 	rating="q"
// 	tags=" lop_(star_wars_visions) lop_and_ochou lopunny_(cosplay) tagme "
// 	id="7560776"
// 	change="1678375135"
// 	md5="12a78cf55a628c59abc8742dd0a5b4fc"
// 	creator_id="1809909"
// 	has_children="false"
// 	created_at="Thu Mar 09 15:18:55 +0000 2023"
// 	status="active"
// 	source=""
// 	has_notes="false"
// 	has_comments="false"
