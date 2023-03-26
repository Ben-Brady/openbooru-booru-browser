import { browser } from "$app/environment";

type CacheStore = {
	expiration: number;
	value: any;
};

function generate_cache_key(key: string) {
	return "cache-" + key;
}

function get(key: string): null | any {
	key = generate_cache_key(key);
	let json = sessionStorage.getItem(key);
	if (json == null) return null;

	let store: CacheStore = JSON.parse(json);
	if (Date.now() > store.expiration) {
		sessionStorage.removeItem(key);
		return null;
	}

	return store.value;
}

function set(key: string, value: any, ttl: number = 5) {
	key = generate_cache_key(key);

	let store = {
		value: value,
		expiration: Date.now() + ttl * 1000,
	};
	sessionStorage.setItem(key, JSON.stringify(store));
}

function use_cache<T>(key: string, ttl: number = 5, func: () => T): T {
	if (!browser) {
		return func();
	}

	let cached_value = get(key);
	if (cached_value) {
		return cached_value;
	} else {
		let value = func();
		set(key, value, ttl);
		return value;
	}
}

async function use_cache_async<T>(key: string, ttl: number = 5, func: () => Promise<T>): Promise<Awaited<T>> {
	if (!browser) {
		return await func();
	}

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
