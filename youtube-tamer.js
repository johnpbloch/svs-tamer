/*jslint sloppy: true, browser: true */
(function () {
	var locationObject = window.location,
		links = document.querySelectorAll('.guide-system-feeds .guide-item'),
		newLocation,
		shouldWeRedirect,
		arrayify;

	arrayify = function (item) {
		return [].slice.call(item);
	};

	links = arrayify(links);

	links.forEach(function (el) {
		var nSearch = '?';
		if (el.search.length) {
			nSearch = el.search.length + '&';
		}
		nSearch += 'reallyclicked=1';
		el.search = nSearch;
	});

	shouldWeRedirect = function () {
		var path = locationObject.pathname,
			query = locationObject.search,
			explicit = false,
			pathMatches = false;
		if (query.length > 1) {
			explicit = query.match(/[?&]reallyclicked=/i);
		}
		pathMatches = path.match(/^\/feed\/(social|recommended)/);
		pathMatches = pathMatches || path === '/';
		return (pathMatches && !explicit);
	};

	if (shouldWeRedirect()) {
		newLocation = locationObject.protocol + '//' + locationObject.host + '/feed/subscriptions';
		window.location = newLocation;
	}
}());
