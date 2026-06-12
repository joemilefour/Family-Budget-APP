const CACHE_NAME = "family-budget-dashboard-v2";
const APP_SHELL = [
  "./",
  "./family-budget-dashboard.html",
  "./manifest.webmanifest",
  "./budget-app-icon.svg",
  "./supabase-setup.sql",
  "./shared-app-setup-notes.md"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) =>
      cached || fetch(event.request).catch(() => caches.match("./family-budget-dashboard.html"))
    )
  );
});
