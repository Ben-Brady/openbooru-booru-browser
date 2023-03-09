export function generateUrl(url: URL | undefined): string | undefined {
	if (url && url.hostname.includes("rule34.xxx")) {
		return url?.toString();
	} else {
		return url?.toString();
	}
}
