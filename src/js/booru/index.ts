import type { Booru } from "./types";
import { Rule34 } from "./rule34";

export const boorus = [
    Rule34
];

const lookup = {};
for (let booru of boorus) {
    lookup[booru.name] = booru
}

export function booru_from_string(booru_name: string): Booru | undefined {
    return lookup[booru_name]
}