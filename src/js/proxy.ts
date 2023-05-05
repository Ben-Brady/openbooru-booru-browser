import { CORS_PROXY } from "js/config";
export function generateUrl(url: URL | string | undefined): string | undefined {
	if (url === undefined) {
		return undefined;
	}

	url = new URL(url);
	const isVideo = url.pathname.includes(".mp4") || url.pathname.includes(".webm");
	const isBlocked = url.hostname.includes("rule34.xxx") && isVideo;

	if (isBlocked) {
		return CORS_PROXY + encodeURIComponent(url.toString());
	} else {
		return url.toString();
	}
}
