import type { Booru } from "./types";
import { Rule34 } from "./rule34";

export const boorus = [Rule34];

const lookup = new Map<string, Booru>();
for (let booru of boorus) {
	lookup.set(booru.short_name, booru);
}

export function booru_from_string(booru_name: string): Booru | undefined {
	return lookup.get(booru_name);
}
