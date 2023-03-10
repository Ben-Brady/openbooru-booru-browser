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

export default { get, set };
