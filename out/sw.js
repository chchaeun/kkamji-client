if(!self.define){let e,s={};const a=(a,i)=>(a=new URL(a+".js",i).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(i,n)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let r={};const d=e=>a(e,c),t={module:{uri:c},exports:r,require:d};s[c]=Promise.all(i.map((e=>t[e]||d(e)))).then((e=>(n(...e),r)))}}define(["./workbox-5081dea0"],(function(e){"use strict";importScripts("fallback-O0h4I9J6G5bt_eG8YWKSH.js","worker-O0h4I9J6G5bt_eG8YWKSH.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/O0h4I9J6G5bt_eG8YWKSH/_buildManifest.js",revision:"6d8106d1fa61bcae5e9963556499ff6c"},{url:"/_next/static/O0h4I9J6G5bt_eG8YWKSH/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/102.0cf6554fc5c927d2.js",revision:"0cf6554fc5c927d2"},{url:"/_next/static/chunks/185-8edb997dd5e94837.js",revision:"8edb997dd5e94837"},{url:"/_next/static/chunks/249.e5cd2aa6c508814f.js",revision:"e5cd2aa6c508814f"},{url:"/_next/static/chunks/265-d4dc07fc55ec25f7.js",revision:"d4dc07fc55ec25f7"},{url:"/_next/static/chunks/355-f4fe77e34afd75f4.js",revision:"f4fe77e34afd75f4"},{url:"/_next/static/chunks/390-de19712b7ad1326f.js",revision:"de19712b7ad1326f"},{url:"/_next/static/chunks/45aa72ff-409ea7f2e1596085.js",revision:"409ea7f2e1596085"},{url:"/_next/static/chunks/488-4c898469a1b1af38.js",revision:"4c898469a1b1af38"},{url:"/_next/static/chunks/577.807676dd232dff75.js",revision:"807676dd232dff75"},{url:"/_next/static/chunks/597-e9babcd687d83e16.js",revision:"e9babcd687d83e16"},{url:"/_next/static/chunks/790-f092330b27a8764f.js",revision:"f092330b27a8764f"},{url:"/_next/static/chunks/892-1c31aec91a19b802.js",revision:"1c31aec91a19b802"},{url:"/_next/static/chunks/906.eec2bc3300367dc4.js",revision:"eec2bc3300367dc4"},{url:"/_next/static/chunks/946-3cba03d538d890f1.js",revision:"3cba03d538d890f1"},{url:"/_next/static/chunks/fe5848d6.33a287051a3c6b60.js",revision:"33a287051a3c6b60"},{url:"/_next/static/chunks/framework-c54b3683db266e7c.js",revision:"c54b3683db266e7c"},{url:"/_next/static/chunks/main-1185b5f852fc440f.js",revision:"1185b5f852fc440f"},{url:"/_next/static/chunks/pages/_app-3f009e115eca31e9.js",revision:"3f009e115eca31e9"},{url:"/_next/static/chunks/pages/_error-0a0218806809431a.js",revision:"0a0218806809431a"},{url:"/_next/static/chunks/pages/_offline-734e68bc8c7fdd3b.js",revision:"734e68bc8c7fdd3b"},{url:"/_next/static/chunks/pages/challenges/%5Bcid%5D-08ff400877e594e3.js",revision:"08ff400877e594e3"},{url:"/_next/static/chunks/pages/challenges/%5Bcid%5D/quizzes-18009ba56ecce8ac.js",revision:"18009ba56ecce8ac"},{url:"/_next/static/chunks/pages/challenges/%5Bcid%5D/quizzes/%5Bqid%5D-191b13061289a55e.js",revision:"191b13061289a55e"},{url:"/_next/static/chunks/pages/challenges/%5Bcid%5D/quizzes/%5Bqid%5D/like-49830aee9eb53633.js",revision:"49830aee9eb53633"},{url:"/_next/static/chunks/pages/challenges/%5Bcid%5D/quizzes/%5Bqid%5D/my-d3ad478f0bfb673b.js",revision:"d3ad478f0bfb673b"},{url:"/_next/static/chunks/pages/challenges/%5Bcid%5D/quizzes/like-317cb4d99e4ff910.js",revision:"317cb4d99e4ff910"},{url:"/_next/static/chunks/pages/challenges/%5Bcid%5D/quizzes/my-10dc1afef2758c14.js",revision:"10dc1afef2758c14"},{url:"/_next/static/chunks/pages/challenges/%5Bcid%5D/write-2b0aed0b63978481.js",revision:"2b0aed0b63978481"},{url:"/_next/static/chunks/pages/index-2a14926d41680389.js",revision:"2a14926d41680389"},{url:"/_next/static/chunks/pages/login-7bc5e62f562ecb71.js",revision:"7bc5e62f562ecb71"},{url:"/_next/static/chunks/pages/manual-e948dc1352dd8acb.js",revision:"e948dc1352dd8acb"},{url:"/_next/static/chunks/pages/password-notice-f0e2ca3d65bde028.js",revision:"f0e2ca3d65bde028"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-03f088e39b627eb2.js",revision:"03f088e39b627eb2"},{url:"/_next/static/css/0e0ce94891030bf0.css",revision:"0e0ce94891030bf0"},{url:"/_next/static/css/1b1cf59279a9b628.css",revision:"1b1cf59279a9b628"},{url:"/_next/static/css/a8873e438006bdce.css",revision:"a8873e438006bdce"},{url:"/_offline",revision:"O0h4I9J6G5bt_eG8YWKSH"},{url:"/favicon.ico",revision:"f3419febb3c559450087c6f353d424b0"},{url:"/firebase-messaging-sw.js",revision:"4b113c0b160e043f65fbda2dd27321d1"},{url:"/image/kkamji-banner-1.png",revision:"95144d50b1c60af02375e9ed3582824b"},{url:"/image/kkamji-banner-2.png",revision:"b6cfe47913453c7c0c0fcf252bb5aec1"},{url:"/image/kkamji-banner-3.png",revision:"bbcb81cc1bc9252a1f6f1e88b3d9d6e3"},{url:"/image/kkamji-home.gif",revision:"7fc0d8174c4a628940411521f02f50ff"},{url:"/image/kkamji-home.png",revision:"e5776dabf35fbb9d91990162e8bd69e8"},{url:"/image/kkamji-login.png",revision:"7afd0a075455c9b7c05767322eeae2ce"},{url:"/image/kkamji-mobile-banner-1.png",revision:"90fac06a49c7d27097a37b406784bd01"},{url:"/image/kkamji-mobile-banner-2.png",revision:"85029e0b76975b5aa3cf48f8f0d1455b"},{url:"/image/kkamji-mobile-banner-3.png",revision:"3128c38a02a9cd1432a282736cec7db1"},{url:"/image/kkamji-mobile-review.png",revision:"a05520c3ee16e99e6706c24134bdacf0"},{url:"/image/kkamji-review.png",revision:"cd9bb88a86dd7e02d27d24a8c9985421"},{url:"/image/kkamji192.png",revision:"c41c3ba281c5994dd3c7c13703732f75"},{url:"/image/kkamji512.png",revision:"c694619c923d1a9c065251b06f97c163"},{url:"/image/landing/professor.png",revision:"10fa3c119aafc338fd16baa7b26e2464"},{url:"/image/landing/profile1.png",revision:"b10b101cd99d6cefb800228c6ac14a96"},{url:"/image/landing/profile2.png",revision:"b34b24592927b7495979b393f387d091"},{url:"/image/landing/profile3.png",revision:"f98fa7a536e406a11a5279d3a284290e"},{url:"/image/landing/profile4.png",revision:"0f5e9e537248e02a5d79428da107d70e"},{url:"/image/landing/quiz1.png",revision:"69692e0e2f0ead4555e817c0c0e5f665"},{url:"/image/landing/quiz2.png",revision:"cdf482dcb89fa92a8dde7c9b93dc21c7"},{url:"/image/landing/quiz3.png",revision:"28deec6d7e977ad0c26913210a5de860"},{url:"/image/landing/quiz4.png",revision:"1a7c0183c0b1ba159f6afbf889c92894"},{url:"/image/landing/screen.png",revision:"a76a210db8c3d4f90e7f00166fe1c6e2"},{url:"/image/landing/speech1.png",revision:"1dcd8e44ea033b5c9a4ea01e684fa486"},{url:"/image/landing/speech2.png",revision:"b40f14f01997fcd602e13151cb5f2da8"},{url:"/image/landing/speech3.png",revision:"1ef557745e6f77dbde2c72f718f644cb"},{url:"/image/landing/speech4.png",revision:"7c4eb5a5e5504a9d75852bbf50fe8b61"},{url:"/image/splashscreens/ipad_splash.png",revision:"5e59576009b234b891c69fd0cf3e6007"},{url:"/image/splashscreens/ipadpro1_splash.png",revision:"da9f7a6181dc9979384a0d29aebe470c"},{url:"/image/splashscreens/ipadpro2_splash.png",revision:"059dcff1c73848525b99c6aee0d920cd"},{url:"/image/splashscreens/ipadpro3_splash.png",revision:"c89288140038b1fdf450021fd86eefd8"},{url:"/image/splashscreens/iphone5_splash.png",revision:"9dd93dcbefdd6880092144b5557b8671"},{url:"/image/splashscreens/iphone6_splash.png",revision:"12ba179df97c306deab27491772612b5"},{url:"/image/splashscreens/iphoneplus_splash.png",revision:"422fe9f46a1b0546b40a1a0ff5dc363e"},{url:"/image/splashscreens/iphonex_splash.png",revision:"2cc1f8b4c6a85f144c25119bf1dfe2f7"},{url:"/image/splashscreens/iphonexr_splash.png",revision:"e5c0de4797595f56db1b8c0cea5ea6d6"},{url:"/image/splashscreens/iphonexsmax_splash.png",revision:"6bee8b5d1a988d931589ad1911fe5d74"},{url:"/image/workbox-a9d556a3.js",revision:"d9a8638b9413504e1ea6c41d53c2e3e3"},{url:"/lib/idb.js",revision:"fed8a1759f6a97e8a034b0d26b4af289"},{url:"/manifest.json",revision:"baaafdf251972cb8b0ab612b71e41646"},{url:"/mockServiceWorker.js",revision:"6bb3470c42866c530bfa18dad67a7f76"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s},{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET")}));