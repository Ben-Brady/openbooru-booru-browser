import { writable, type Writable } from 'svelte/store';
import { browser } from "$app/environment";
import { type Query, Rule34 } from "js/booru";


class Setting<T> {
    #key: string
    #default: T
    #store: Writable<T>

    constructor(key: string, default_value: T) {
        this.#key = key
        this.#default = default_value
        this.#store = writable(this.get())
    }

    get(): T {
        if (!browser) return this.#default

        let stored_value = localStorage.getItem(this.#key)
        if (stored_value === null) {
            return this.#default
        } else {
            return JSON.parse(stored_value)
        }
    }

    set(value: T) {
        if (!browser) return
        let data = JSON.stringify(value);
        localStorage.setItem(this.#key, data)
        this.#store.set(value)
    }

    subscribe(func: (value: T) => void): void {
        this.#store.subscribe(func)
    }
}

export const current_booru = new Setting("booru-name", Rule34.short_name)
export const tracking_cookies = new Setting("tracking-cookies", false)
export const current_query = new Setting<Query>("query", {})
export default {
    current_booru,
    current_query,
    tracking_cookies,
}
