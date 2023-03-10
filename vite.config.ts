/* eslint-disable no-useless-escape */

import { sveltekit } from "@sveltejs/kit/vite";
import type { UserConfig } from "vite";
import * as path from "path";
import * as dotenv from "dotenv";
dotenv.config();

const config: UserConfig = {
	plugins: [sveltekit()],
	resolve: {
		alias: {
			lib: path.resolve(__dirname, "src/lib"),
			js: path.resolve(__dirname, "src/js"),
			routes: path.resolve(__dirname, "src/routes"),
		},
	},
	server: {
		headers: {
		},
	},
};

export default config;
