import type { Booru } from "./types";
import { Rule34 } from "./gelbooru2/rule34";
import { Safebooru } from "./gelbooru2/safebooru";
import { HypnoHub } from "./gelbooru2/hypnohub";
import { RealBooru } from "./gelbooru2/realbooru";
import { XBooru } from "./gelbooru2/xbooru";

export const boorus = [
	new Rule34(),
	new Safebooru(),
	new HypnoHub(),
	new RealBooru(),
	new XBooru(),
];

const lookup = new Map<string, Booru>();
for (let booru of boorus) {
	lookup.set(booru.short_name, booru);
}

export function booru_from_string(booru_name: string): Booru | undefined {
	return lookup.get(booru_name);
}
