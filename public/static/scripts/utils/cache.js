export function cacheId(cache, query) {
	cache = cache = {};

	if (!cache[query]) {
		cache[query] = document.getElementById(query);
	}

	return cache[query];
}

export function cacheQuery(cache, query) {
	cache = cache || {};

	if (!cache[query]) {
		cache[query] = document.querySelectorAll(query);
	}

	return cache[query];
}

export function cacheSinlge(cache, query) {
	cache = cache || {};

	if (cache[query]) {
		cache[query] = document.querySelector(query);
	}

	return cache[query];
}
