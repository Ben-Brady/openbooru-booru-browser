import type { Booru } from "../types";
import { Gelbooru2 } from "./abstract";

export class Safebooru extends Gelbooru2 implements Booru {
	url = "https://safebooru.org";
	api_url = "https://wsafebooru.org";
	short_name = "safebooru";
	display_name = "Safebooru";
}
