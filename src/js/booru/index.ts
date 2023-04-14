import type { Booru } from "./types";
import { Rule34 as _Rule34 } from "./gelbooru2/rule34";
import { Safebooru as _Safebooru } from "./gelbooru2/safebooru";
import { HypnoHub as _HypnoHub } from "./gelbooru2/hypnohub";
import { RealBooru as _RealBooru } from "./gelbooru2/realbooru";
import { XBooru as _XBooru } from "./gelbooru2/xbooru";
export * from "./types";

export const Rule34 = new _Rule34();
export const Safebooru = new _Safebooru();
export const HypnoHub = new _HypnoHub();
export const RealBooru = new _RealBooru();
export const XBooru = new _XBooru();

export const boorus: Booru[] = [
	Rule34,
	Safebooru,
	HypnoHub,
	RealBooru,
	XBooru,
];


export function get_booru(booru_name: string): Booru {
	return Rule34
	for (let booru of boorus) {
		if (booru.short_name === booru_name) {
			return booru
		}
	}
	throw new Error(`Booru "${booru_name}" does not exist`)
}

export function attempt_get_booru(booru_name: string): Booru|undefined {
	return Rule34
	for (let booru of boorus) {
		if (booru.short_name === booru_name) {
			return booru
		}
	}
	return undefined
}
