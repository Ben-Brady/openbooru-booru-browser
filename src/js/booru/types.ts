export type { Query } from "./query";
import type { Query } from "./query";

export interface Booru {
	short_name: string;
	display_name: string;
	generate_url: (id: string) => string;

	is_working: () => Promise<boolean>;
	search: (query: Query, index: number) => Promise<Post[]>;
	get: (id: string) => Promise<Post | undefined>;
	search_tags: (search: string) => Promise<string[]>;
}

export type Post = {
	booru: string;
	id: string;
	type: MediaType;
	created_at: Date;
	title: string;
	description: string;
	tags: string[];
	score: number;
	source: string;
	origin: string;

	thumbnail: Image;
	preview: Media;
	full: Media;
};

export type MediaType = "image" | "video" | "animation";

export type Image = {
	width: number;
	height: number;
	url: string;
	mimetype: string;
	type: "image";
};

export type Animation = {
	width: number;
	height: number;
	url: string;
	mimetype: string;
	type: "animation";
};

export type Video = {
	width: number;
	height: number;
	url: string;
	mimetype: string;
	type: "video";
};

export type Media = Image | Animation | Video;


export type TagNamespace = "generic" | "copyright" | "character" | "creator" | "meta";
export interface Tag {
	name: string;
	namespace?: TagNamespace;
	count?: number;
};