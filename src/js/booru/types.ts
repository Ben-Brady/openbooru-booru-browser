export interface Booru {
	api_url: string;
	short_name: string;
	display_name: string;
	icon: string;

	generate_url: (id: string) => string;

	is_working: () => Promise<boolean>;
	search: (query: Query, page: number) => Promise<Post[]>;
	get: (id: string) => Promise<Post | undefined>;
	search_tags: (search: string) => Promise<Tag[]>;
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
	preview: Media|undefined;
	full: Media;
};

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

export enum MediaType{
	Image = "image",
	Video = "video",
	Animation = "animation",
}


export enum TagNamespace {
	Generic = "generic",
	Copyright = "copyright",
	Character = "character",
	Creator = "creator",
	Meta = "meta",

}

export interface Tag {
	name: string;
	namespace?: TagNamespace;
	count?: number;
}

export interface Query {
	search?: string;
	sort?: Sort;
	media?: MediaType[];
}

export enum Sort {
	Newest = "Newest",
	Hotest = "Hotest",
	Top_Rated = "Top-Rated",
	Lowest_Rated = "Lowest-Rated",
}
