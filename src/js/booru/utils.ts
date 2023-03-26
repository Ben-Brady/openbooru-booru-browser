import { MediaType } from "./types";

const IMAGE_EXTENTIONS = ["png", "jpeg", "jpg", "webp"];
const ANIMATION_EXTENTIONS = ["gif"];
const VIDEO_EXTENTIONS = ["webm", "mp4"];

export function guess_media_type(url: string | URL): MediaType {
	url = new URL(url.toString());

	let extention = url.pathname.split(".").pop();
	if (extention === undefined) {
		throw new Error("Invalid Post Type");
	} else if (IMAGE_EXTENTIONS.includes(extention)) {
		return MediaType.Image;
	} else if (ANIMATION_EXTENTIONS.includes(extention)) {
		return MediaType.Animation;
	} else if (VIDEO_EXTENTIONS.includes(extention)) {
		return MediaType.Video;
	} else {
		throw new Error(`Invalid Post Type: ${url}`);
	}
}

const MIMETYPE_LOOKUP: Map<string, string> = new Map([
	[".webp", "image/webp"],
	[".png", "image/png"],
	[".jpeg", "image/jpeg"],
	[".jpg", "image/jpeg"],

	[".svg", "image/svg+xml"],
	[".apng", "image/apng"],

	[".gif", "image/gif"],
	[".mp4", "video/mp4"],
	[".webm", "video/webm"],
]);

export function guess_mimetype(url: string | URL): string {
	url = new URL(url.toString());
	let ext = "." + url.pathname.split(".").pop();
	let mimetype = MIMETYPE_LOOKUP.get(ext);

	if (mimetype === undefined) {
		throw new Error("Could not guess MimeType");
	} else {
		return mimetype;
	}
}
