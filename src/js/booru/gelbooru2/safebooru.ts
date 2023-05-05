import type { Booru } from "../types";
import { Gelbooru2 } from "./generic";

export class Safebooru extends Gelbooru2 implements Booru {
	url = "https://safebooru.org";
	api_url = "https://safebooru.org";
	short_name = "safebooru";
	display_name = "Safebooru";
}
