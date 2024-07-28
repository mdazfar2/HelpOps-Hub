const cacheName = "HelpOpsHub-v1.0.0";
const filesToCache = [
  "/",
  "/about",
  "/team",
  "/contact",
  "/resources",
  "/blogs",
  "/createblog",
  "/devopsforum",
  "/profile",
  "/HelpOps-H Fevicon.webp",
  "/linkedin-icon.svg",
  "/youtube-icon.svg",
  "/discord-icon.svg",
  "/google.webp",
  "/github.webp",
  "/404.webp",
  "/i1.webp",
  "/i2.webp",
  "/i3.webp",
  "/i4.webp",
  "/b1.webp",
  "/b2.webp",
  "/b3.webp",
  "/b4.webp",
  "/b5.webp",
  "/b6.webp",
  "/mission.webp",
  "/Arrow.webp",
  "/benefit.webp",
  "/maintainer.webp",
  "/maintainer2.webp",
  "/maintainer3.webp",
  "/Devops-Dark.mp4",
  "/Mobile-Devops.mp4",
  "/HelpOps-H.mp4",
  "/_next/static/css/app/layout.css?v=1722187274213",
  "/_next/static/css/app/page.css?v=1722187274213",
  "/_next/static/chunks/main-app.js?v=1722187274213",
  "/_next/static/chunks/app-pages-internals.js",
  "/_next/static/chunks/app/page.js",
  "/_next/static/chunks/app/layout.js",
  "/_next/static/chunks/polyfills.js"
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(cacheName).then(cache => {
      cache.addAll(filesToCache);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== cacheName)
        .map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request, {ignoreVary: true}).then(res => {
      return res || fetch(fetchEvent.request);
    })
  )
});

// self.addEventListener("fetch", fetchEvent => {
//   fetchEvent.respondWith(
//     caches.match(fetchEvent.request).then(res => {
//       return res || fetch(fetchEvent.request).catch(err => {
//         console.error('Fetch failed for: ', fetchEvent.request.url, err);
//         return new Response('', { status: 204 });
//       });
//     })
//   );
// });

// Handle protocol-specific URLs
// self.addEventListener('fetch', event => {
//     if (event.request.url.startsWith('web+app:')) {
//       const url = new URL(event.request.url);
//       const appUrl = url.searchParams.get('url');
//       if (appUrl) {
//         event.respondWith(
//           clients.matchAll().then(clients => {
//             if (clients && clients.length) {
//               clients[0].navigate(appUrl);
//               clients[0].focus();
//             }
//             return new Response('', {status: 204});
//           })
//         );
//       }
//     }
// });