import { browser } from "$app/environment";
import { DEPLOYMENT } from "js/config";

type CacheStore = {
	expiration: number;
	value: any;
};

function generate_cache_key(key: string) {
	return "cache-" + key;
}

let _store = new Map<string, string>();
let serverStorage = {
	getItem: (key: string): string | null => {
		let value = _store.get(key);
		if (value === undefined) return null;
		else return value;
	},
	setItem: (key: string, value: string) => _store.set(key, value),
	removeItem: (key: string) => _store.delete(key),
	clear: () => _store.clear(),
};

function get(key: string): null | any {
	let storage = browser ? sessionStorage : serverStorage;
	let cache_key = generate_cache_key(key);

	let json = storage.getItem(cache_key);
	if (json == null) return null;

	let store: CacheStore = JSON.parse(json);
	if (Date.now() > store.expiration) {
		storage.removeItem(cache_key);
		return null;
	}

	return store.value;
}

function set(key: string, value: any, ttl: number = 5000) {
	let storage = browser ? sessionStorage : serverStorage;
	let cache_key = generate_cache_key(key);

	let store = {
		value: value,
		expiration: Date.now() + ttl,
	};

	try {
		storage.setItem(cache_key, JSON.stringify(store));
	} catch {
		storage.clear();
	}
}

function removed_outdated_entries() {
	if (!browser) return;

	for (let key of Object.keys(sessionStorage)) {
		let json = localStorage.getItem(key);
		if (json == null) continue;

		let store: CacheStore = JSON.parse(json);
		if (Date.now() > store.expiration) {
			localStorage.removeItem(key);
		}
	}
}

function use_cache<T>(key: string, ttl: number = 5000, func: () => T): T {
	// Cache is disabled in dev mode
	if (DEPLOYMENT == "dev") return func();
	removed_outdated_entries();

	let cached_value = get(key);
	if (cached_value) {
		return cached_value;
	} else {
		let value = func();
		set(key, value, ttl);
		return value;
	}
}

async function use_cache_async<T>(
	key: string,
	ttl: number = 5000,
	func: () => Promise<T>,
): Promise<Awaited<T>> {
	// Cache is disabled in dev mode
	if (DEPLOYMENT == "dev") return await func();
	removed_outdated_entries();

	let cached_value = get(key);
	if (cached_value) {
		return cached_value;
	} else {
		let value = await func();
		set(key, value, ttl);
		return value;
	}
}

export default { get, set, use_cache, use_cache_async };
