import { writable, type Unsubscriber, type Writable } from "svelte/store";
import { browser } from "$app/environment";
import { Rule34 } from "js/booru";
import type { Favourite } from "./types";

class Setting<T> {
	#key: string;
	#default: T;
	store: Writable<T>;

	constructor(key: string, default_value: T) {
		this.#key = key;
		this.#default = default_value;
		this.store = writable(this.get());
	}

	get(): T {
		if (!browser) return this.#default;

		let stored_value = localStorage.getItem(this.#key);
		if (stored_value === null) {
			return this.#default;
		} else {
			return JSON.parse(stored_value);
		}
	}

	set(value: T) {
		if (!browser) return;
		let data = JSON.stringify(value);
		localStorage.setItem(this.#key, data);
		this.store.set(value);
	}

	update(callback: (current: T) => T) {
		let value = this.get();
		let new_value = callback(value);
		this.set(new_value);
	}

	subscribe(func: (value: T) => void): Unsubscriber {
		return this.store.subscribe(func);
	}
}

export const previous_booru = new Setting("booru-name", Rule34.short_name);
export const tracking_cookies = new Setting("tracking-cookies", false);
export const favourites = new Setting<Favourite[]>("favourites", []);

