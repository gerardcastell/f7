import { registerRoute } from "workbox-routing";
import { ExpirationPlugin } from "workbox-expiration";
import { skipWaiting, clientsClaim } from "workbox-core";
import { precacheAndRoute, precacheController } from "workbox-precaching";
import {
  CacheFirst,
  StaleWhileRevalidate,
  NetworkFirst
} from "workbox-strategies";

skipWaiting();
clientsClaim();

precacheAndRoute(self.__WB_MANIFEST || []);

// registerRoute(
//   new RegExp("https:.*min.(css|js)"),
//   new StaleWhileRevalidate({
//     cacheName: "my-cache"
//   })
// );

registerRoute(
  /\.(?:js|css)$/,
  new StaleWhileRevalidate({
    cacheName: "static-resources",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 20 * 24 * 60 * 60 // 20 Days
      })
    ]
  })
);
