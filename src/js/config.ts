import {
	PUBLIC_SITE_NAME,
	PUBLIC_SITE_DESCRIPTION,
	PUBLIC_SITE_URL,
	PUBLIC_SITE_KEYWORDS,
	PUBLIC_CORS_PROXY,
} from "$env/static/public";
export const SITE_NAME = PUBLIC_SITE_NAME;
export const SITE_DESC = PUBLIC_SITE_DESCRIPTION;
export const SITE_URL = PUBLIC_SITE_URL;
export const SITE_KEYWORDS: string[] = PUBLIC_SITE_KEYWORDS.split(",");
export const CORS_PROXY = PUBLIC_CORS_PROXY;
export const DEPLOYMENT: "production" | "dev" = "production";
