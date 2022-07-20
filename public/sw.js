const CACHE_NAME = "pwa-offline-v1";
const filesToCache = ["/", "/image/cat.jpeg", "/image/test192.png"];
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function (cache) {
        return cache.addAll(filesToCache);
      })
      .catch(function (error) {
        return console.log(error);
      })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches
      .match(event.request)
      .then(function (response) {
        return response || fetch(event.request);
      })
      .catch(function (error) {
        return console.log(error);
      })
  );
});

self.addEventListener("activate", function (event) {
  const newCacheList = ["pwa-offline-v1"];
  event.waitUntil(
    caches
      .keys()
      .then(function (cacheList) {
        return Promise.all(
          cacheList.map(function (cacheName) {
            if (newCacheList.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .catch(function (error) {
        return console.log(error);
      })
  );
});
