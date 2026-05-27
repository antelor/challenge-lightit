export function normalizeWebsite(url?: string) {
	if (typeof url !== "string" || url.trim().length === 0) {
		return "#";
	}

	if (
		url.startsWith("http://") ||
		url.startsWith("https://")
	) {
		return url;
	}

	return `https://${url}`;
}