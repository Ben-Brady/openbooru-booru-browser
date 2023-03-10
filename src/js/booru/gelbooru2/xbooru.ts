import type { Booru } from "../types";
import { Gelbooru2 } from "./abstract";

export class XBooru extends Gelbooru2 implements Booru {
	url = "https://xbooru.com";
	api_url = "https://xbooru.com";
	short_name = "xbooru";
	display_name = "XBooru";
}
