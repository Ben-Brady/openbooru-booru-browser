import type { Booru } from "../types";
import { Gelbooru2 } from "./base";

export class Rule34 extends Gelbooru2 implements Booru {
	url = "https://rule34.xxx";
	api_url = "https://api.rule34.xxx";
	short_name = "r34";
	display_name = "Rule34.xxx";
}
