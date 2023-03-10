export function generateUrl(url: URL | string | undefined): string | undefined {
	if (url === undefined) {
		return undefined
	}
	
	url = new URL(url);
	if (url.pathname.includes(".mp4") && url.pathname.includes(".webp")) {
		return "/cors?url=" + url?.toString();
	} else {
		return url.toString()
	}
}
