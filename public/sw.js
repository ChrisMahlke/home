// Service Worker for offline capabilities
const CACHE_NAME = "home-v3";
const STATIC_CACHE = "static-v3";
const DYNAMIC_CACHE = "dynamic-v3";

// Optimized cache strategy - separate static and dynamic assets
const STATIC_URLS = [
  "/",
  "/index.html",
  "/favicon.svg",
  "/manifest.json",
  "/src/main.tsx",
  "/src/App.tsx",
  "/src/index.css",
];

// Dynamic assets that should be cached on demand
const DYNAMIC_URLS = [
  // Add any dynamic content URLs here
];

// Install event - cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => {
        return cache.addAll(STATIC_URLS);
      })
      .then(() => {
        // Skip waiting to activate immediately
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches and claim clients
self.addEventListener("activate", (event) => {
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Claim all clients immediately
      self.clients.claim(),
    ])
  );
});

// Fetch event - optimized caching strategy
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Skip non-GET requests and non-HTTP(S) requests
  if (request.method !== "GET" || !request.url.startsWith("http")) {
    return;
  }

  // Handle different types of requests with appropriate strategies
  if (request.destination === "document") {
    // For HTML pages, use network-first with cache fallback
    event.respondWith(networkFirstStrategy(request));
  } else if (request.destination === "script" || request.destination === "style") {
    // For static assets, use cache-first with network fallback
    event.respondWith(cacheFirstStrategy(request, STATIC_CACHE));
  } else {
    // For other assets, use stale-while-revalidate
    event.respondWith(staleWhileRevalidateStrategy(request));
  }
});

// Network-first strategy for HTML pages
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
  } catch (error) {
    // Network failed, try cache
  }

  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  // Return offline page if no cache available
  return caches.match("/index.html");
}

// Cache-first strategy for static assets
async function cacheFirstStrategy(request, cacheName) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    // Return a fallback response if both cache and network fail
    return new Response("Offline content not available", { status: 503 });
  }
}

// Stale-while-revalidate strategy for other assets
async function staleWhileRevalidateStrategy(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cachedResponse = await cache.match(request);

  // Return cached response immediately if available
  const fetchPromise = fetch(request)
    .then((networkResponse) => {
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    })
    .catch(() => {
      // Network failed, return cached response or fallback
      return cachedResponse || new Response("Offline content not available", { status: 503 });
    });

  return cachedResponse || fetchPromise;
}

// Background sync for offline actions
self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync") {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Handle any background sync tasks
  // Example: sync offline form submissions, analytics data, etc.

  // Get all clients
  const clients = await self.clients.matchAll();

  // Notify clients that sync is complete
  clients.forEach((client) => {
    client.postMessage({
      type: "SYNC_COMPLETE",
      timestamp: Date.now(),
    });
  });
}

// Handle push notifications (if needed in the future)
self.addEventListener("push", (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body || "New update available",
      icon: "/favicon.svg",
      badge: "/favicon.svg",
      tag: "homepage-update",
      requireInteraction: false,
      actions: [
        {
          action: "open",
          title: "Open",
        },
        {
          action: "close",
          title: "Close",
        },
      ],
    };

    event.waitUntil(self.registration.showNotification(data.title || "Homepage Update", options));
  }
});

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "open") {
    event.waitUntil(
      self.clients.matchAll().then((clients) => {
        if (clients.length > 0) {
          clients[0].focus();
        } else {
          self.clients.openWindow("/");
        }
      })
    );
  }
});
