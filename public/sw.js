if (!self.define) {
  let e,
    s = {};
  const a = (a, i) => (
    (a = new URL(a + ".js", i).href),
    s[a] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = a), (e.onload = s), document.head.appendChild(e);
        } else (e = a), importScripts(a), s();
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, n) => {
    const c =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[c]) return;
    let t = {};
    const r = (e) => a(e, c),
      d = { module: { uri: c }, exports: t, require: r };
    s[c] = Promise.all(i.map((e) => d[e] || r(e))).then((e) => (n(...e), t));
  };
}
define(["./workbox-5081dea0"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/_next/static/373iAklPFBhdWfKjoo4DM/_buildManifest.js",
          revision: "9860f64930e96a4802d2302c9ae6c9d1",
        },
        {
          url: "/_next/static/373iAklPFBhdWfKjoo4DM/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/_next/static/chunks/13-6dd655783db98e3c.js",
          revision: "6dd655783db98e3c",
        },
        {
          url: "/_next/static/chunks/149-6bd6bb68ea85fe89.js",
          revision: "6bd6bb68ea85fe89",
        },
        {
          url: "/_next/static/chunks/261.42be7f910a3c5d97.js",
          revision: "42be7f910a3c5d97",
        },
        {
          url: "/_next/static/chunks/265-aa7ae41a947d17db.js",
          revision: "aa7ae41a947d17db",
        },
        {
          url: "/_next/static/chunks/297-30291f5dbcc8eed0.js",
          revision: "30291f5dbcc8eed0",
        },
        {
          url: "/_next/static/chunks/390-bfb03c4e442aa585.js",
          revision: "bfb03c4e442aa585",
        },
        {
          url: "/_next/static/chunks/493-f90eedb66ad98b51.js",
          revision: "f90eedb66ad98b51",
        },
        {
          url: "/_next/static/chunks/51-1a23017db5740304.js",
          revision: "1a23017db5740304",
        },
        {
          url: "/_next/static/chunks/790-702400d6b1e222f7.js",
          revision: "702400d6b1e222f7",
        },
        {
          url: "/_next/static/chunks/868-8a804b4df824f66a.js",
          revision: "8a804b4df824f66a",
        },
        {
          url: "/_next/static/chunks/framework-b7833aee64fda6ab.js",
          revision: "b7833aee64fda6ab",
        },
        {
          url: "/_next/static/chunks/main-7572357abac3e2d7.js",
          revision: "7572357abac3e2d7",
        },
        {
          url: "/_next/static/chunks/pages/_app-866feb4d9356876c.js",
          revision: "866feb4d9356876c",
        },
        {
          url: "/_next/static/chunks/pages/_error-7bba2022e5a6af8b.js",
          revision: "7bba2022e5a6af8b",
        },
        {
          url: "/_next/static/chunks/pages/challenges-c56d525ba3b07d31.js",
          revision: "c56d525ba3b07d31",
        },
        {
          url: "/_next/static/chunks/pages/challenges/%5Bcid%5D-65b52b6e91a4006a.js",
          revision: "65b52b6e91a4006a",
        },
        {
          url: "/_next/static/chunks/pages/challenges/%5Bcid%5D/quizzes-329b3cca663c2687.js",
          revision: "329b3cca663c2687",
        },
        {
          url: "/_next/static/chunks/pages/challenges/%5Bcid%5D/quizzes/%5Bqid%5D-dc0ddf0d8df8a0b6.js",
          revision: "dc0ddf0d8df8a0b6",
        },
        {
          url: "/_next/static/chunks/pages/challenges/%5Bcid%5D/quizzes/%5Bqid%5D/edit-8832836146bb8d24.js",
          revision: "8832836146bb8d24",
        },
        {
          url: "/_next/static/chunks/pages/challenges/%5Bcid%5D/quizzes/%5Bqid%5D/like-49931ffa5f160512.js",
          revision: "49931ffa5f160512",
        },
        {
          url: "/_next/static/chunks/pages/challenges/%5Bcid%5D/quizzes/%5Bqid%5D/my-a09f9f203a9c8ada.js",
          revision: "a09f9f203a9c8ada",
        },
        {
          url: "/_next/static/chunks/pages/challenges/%5Bcid%5D/quizzes/like-a787de111a15333f.js",
          revision: "a787de111a15333f",
        },
        {
          url: "/_next/static/chunks/pages/challenges/%5Bcid%5D/quizzes/my-aaa6c0f7b93129d7.js",
          revision: "aaa6c0f7b93129d7",
        },
        {
          url: "/_next/static/chunks/pages/challenges/%5Bcid%5D/write-b3ecd77e5d54de3c.js",
          revision: "b3ecd77e5d54de3c",
        },
        {
          url: "/_next/static/chunks/pages/dashboard-c5ae88b3a00e743e.js",
          revision: "c5ae88b3a00e743e",
        },
        {
          url: "/_next/static/chunks/pages/index-0ad6443a4ae67743.js",
          revision: "0ad6443a4ae67743",
        },
        {
          url: "/_next/static/chunks/pages/introduce-9e7323ee42f242a4.js",
          revision: "9e7323ee42f242a4",
        },
        {
          url: "/_next/static/chunks/pages/login-66297ecddef8e5c2.js",
          revision: "66297ecddef8e5c2",
        },
        {
          url: "/_next/static/chunks/pages/manual-9626a69933af59ec.js",
          revision: "9626a69933af59ec",
        },
        {
          url: "/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",
          revision: "837c0df77fd5009c9e46d446188ecfd0",
        },
        {
          url: "/_next/static/chunks/webpack-8263548e80aa7ac5.js",
          revision: "8263548e80aa7ac5",
        },
        {
          url: "/_next/static/css/1b1cf59279a9b628.css",
          revision: "1b1cf59279a9b628",
        },
        {
          url: "/_next/static/css/2afd07dda348b93f.css",
          revision: "2afd07dda348b93f",
        },
        {
          url: "/_next/static/css/a8873e438006bdce.css",
          revision: "a8873e438006bdce",
        },
        {
          url: "/_next/static/css/cc4b0ceb626a31fb.css",
          revision: "cc4b0ceb626a31fb",
        },
        { url: "/favicon.ico", revision: "f3419febb3c559450087c6f353d424b0" },
        {
          url: "/firebase-config.ts",
          revision: "2d1a3a95e98923003a37a108acb2fa9f",
        },
        {
          url: "/firebase-message-sw.js",
          revision: "bd5eddb7d4419047af24b88fc772e56e",
        },
        {
          url: "/image/kkamji-banner-1.png",
          revision: "95144d50b1c60af02375e9ed3582824b",
        },
        {
          url: "/image/kkamji-banner-2.png",
          revision: "b6cfe47913453c7c0c0fcf252bb5aec1",
        },
        {
          url: "/image/kkamji-banner-3.png",
          revision: "bbcb81cc1bc9252a1f6f1e88b3d9d6e3",
        },
        {
          url: "/image/kkamji-home.gif",
          revision: "7fc0d8174c4a628940411521f02f50ff",
        },
        {
          url: "/image/kkamji-home.png",
          revision: "e5776dabf35fbb9d91990162e8bd69e8",
        },
        {
          url: "/image/kkamji-login.png",
          revision: "7afd0a075455c9b7c05767322eeae2ce",
        },
        {
          url: "/image/kkamji-mobile-banner-1.png",
          revision: "90fac06a49c7d27097a37b406784bd01",
        },
        {
          url: "/image/kkamji-mobile-banner-2.png",
          revision: "85029e0b76975b5aa3cf48f8f0d1455b",
        },
        {
          url: "/image/kkamji-mobile-banner-3.png",
          revision: "3128c38a02a9cd1432a282736cec7db1",
        },
        {
          url: "/image/kkamji-mobile-review.png",
          revision: "a05520c3ee16e99e6706c24134bdacf0",
        },
        {
          url: "/image/kkamji-review.png",
          revision: "cd9bb88a86dd7e02d27d24a8c9985421",
        },
        {
          url: "/image/kkamji192.png",
          revision: "c41c3ba281c5994dd3c7c13703732f75",
        },
        {
          url: "/image/kkamji512.png",
          revision: "c694619c923d1a9c065251b06f97c163",
        },
        {
          url: "/image/splashscreens/ipad_splash.png",
          revision: "5e59576009b234b891c69fd0cf3e6007",
        },
        {
          url: "/image/splashscreens/ipadpro1_splash.png",
          revision: "da9f7a6181dc9979384a0d29aebe470c",
        },
        {
          url: "/image/splashscreens/ipadpro2_splash.png",
          revision: "059dcff1c73848525b99c6aee0d920cd",
        },
        {
          url: "/image/splashscreens/ipadpro3_splash.png",
          revision: "c89288140038b1fdf450021fd86eefd8",
        },
        {
          url: "/image/splashscreens/iphone5_splash.png",
          revision: "9dd93dcbefdd6880092144b5557b8671",
        },
        {
          url: "/image/splashscreens/iphone6_splash.png",
          revision: "12ba179df97c306deab27491772612b5",
        },
        {
          url: "/image/splashscreens/iphoneplus_splash.png",
          revision: "422fe9f46a1b0546b40a1a0ff5dc363e",
        },
        {
          url: "/image/splashscreens/iphonex_splash.png",
          revision: "2cc1f8b4c6a85f144c25119bf1dfe2f7",
        },
        {
          url: "/image/splashscreens/iphonexr_splash.png",
          revision: "e5c0de4797595f56db1b8c0cea5ea6d6",
        },
        {
          url: "/image/splashscreens/iphonexsmax_splash.png",
          revision: "6bee8b5d1a988d931589ad1911fe5d74",
        },
        { url: "/manifest.json", revision: "baaafdf251972cb8b0ab612b71e41646" },
        {
          url: "/mockServiceWorker.js",
          revision: "6bb3470c42866c530bfa18dad67a7f76",
        },
        { url: "/vercel.svg", revision: "4b4f1876502eb6721764637fe5c41702" },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: a,
              state: i,
            }) =>
              s && "opaqueredirect" === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: "OK",
                    headers: s.headers,
                  })
                : s,
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith("/api/auth/") && !!s.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      "GET"
    );
});
