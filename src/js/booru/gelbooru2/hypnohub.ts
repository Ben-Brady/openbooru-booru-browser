import type { Booru } from "../types";
import { Gelbooru2 } from "./generic";

export class HypnoHub extends Gelbooru2 implements Booru {
	url = "https://hypnohub.net";
	api_url = "https://hypnohub.net";
	short_name = "hypnohub";
	display_name = "Hypno Hub";
}
