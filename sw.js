const cacheName = 'idle-shark'
const assets = [
  "/.gitignore",
  "/LICENSE.md",
  "/README.md",
  "/cache.manifest",
  "/favicon.ico",
  "/index.html",
  "/manifest.json",
  "/sw.js",
  "/css/abandoned.css",
  "/css/chaotic.css",
  "/css/frigid.css",
  "/css/haven.css",
  "/css/shrouded.css",
  "/css/style.css",
  "/css/tempestuous.css",
  "/css/violent.css",
  "/data/raweventspritedata.json",
  "/data/rawspritedata.json",
  "/data/sharkeventsprites.tps",
  "/data/sharksprites.tps",
  "/img/favicon.png",
  "/img/recyclerbg.png",
  "/img/sharkeventsprites.png",
  "/img/sharkgame.png",
  "/img/sharklogo.png",
  "/img/sharksprites.png",
  "/img/wiki.ico",
  "/js/gateway.js",
  "/js/log.js",
  "/js/main.js",
  "/js/resources.js",
  "/js/save.js",
  "/js/settings.js",
  "/js/util.js",
  "/js/world.js",
  "/less/abandoned.less",
  "/less/chaotic.less",
  "/less/compilestyles.bat",
  "/less/frigid.less",
  "/less/haven.less",
  "/less/marine.less",
  "/less/shrouded.less",
  "/less/style.less",
  "/less/tempestuous.less",
  "/less/violent.less"
]

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
});

// Installing the Service Worker
self.addEventListener("install", async (event) => {
  try {
    const cache = await caches.open(cacheName);
    await cache.addAll(assets);
  } catch (error) {
    console.error("Service Worker installation failed:", error);
  }
});

// Fetching resources
self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      const cache = await caches.open(cacheName);

      try {
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) {
          console.log("cachedResponse: ", event.request.url);
          return cachedResponse;
        }

        const fetchResponse = await fetch(event.request);
        if (fetchResponse) {
          console.log("fetchResponse: ", event.request.url);
          await cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        }
      } catch (error) {
        console.log("Fetch failed: ", error);
        const cachedResponse = await cache.match("index.html");
        return cachedResponse;
      }
    })()
  );
});
