export function generateUrl(url: URL | string | undefined): string | undefined {
	if (url) {
		return url?.toString();
	} else {
		return undefined;
	}
}
