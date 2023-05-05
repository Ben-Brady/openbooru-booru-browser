import type { Booru } from "../types";
import { Gelbooru2 } from "./generic";

export class RealBooru extends Gelbooru2 implements Booru {
	url = "https://realbooru.com";
	api_url = "https://realbooru.com";
	short_name = "realbooru";
	display_name = "Real Booru";
}
