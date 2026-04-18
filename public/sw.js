const IMAGE_CACHE_NAME = "sersahara-image-cache-v1";

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter(
            (key) =>
              key.startsWith("sersahara-image-cache-") &&
              key !== IMAGE_CACHE_NAME,
          )
          .map((key) => caches.delete(key)),
      );
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") return;

  const url = new URL(request.url);
  const sameOrigin = url.origin === self.location.origin;
  const isImageRequest = request.destination === "image";
  const isPublicImagePath = /\.(png|jpg|jpeg|webp|svg|gif|avif)$/i.test(
    url.pathname,
  );

  if (!sameOrigin || (!isImageRequest && !isPublicImagePath)) return;

  event.respondWith(
    (async () => {
      const cache = await caches.open(IMAGE_CACHE_NAME);
      const cached = await cache.match(request);

      if (cached) {
        return cached;
      }

      try {
        const response = await fetch(request);
        if (response.ok) {
          cache.put(request, response.clone());
        }
        return response;
      } catch {
        return new Response("", { status: 504, statusText: "Gateway Timeout" });
      }
    })(),
  );
});
