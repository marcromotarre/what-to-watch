if(!self.define){let e,s={};const a=(a,i)=>(a=new URL(a+".js",i).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(i,t)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let c={};const r=e=>a(e,n),o={module:{uri:n},exports:c,require:r};s[n]=Promise.all(i.map((e=>o[e]||r(e)))).then((e=>(t(...e),c)))}}define(["./workbox-50de5c5d"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/UoTfM6wQR1CptBaq8nzoQ/_buildManifest.js",revision:"47291c81202e895a055f81eff43ebccb"},{url:"/_next/static/UoTfM6wQR1CptBaq8nzoQ/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/339-1ad6ccba32cca0da.js",revision:"1ad6ccba32cca0da"},{url:"/_next/static/chunks/40-296a8f7e00cd5f89.js",revision:"296a8f7e00cd5f89"},{url:"/_next/static/chunks/621-605d5ef618358e1c.js",revision:"605d5ef618358e1c"},{url:"/_next/static/chunks/738-598dd03e9ab76c23.js",revision:"598dd03e9ab76c23"},{url:"/_next/static/chunks/739-8c15c31157856740.js",revision:"8c15c31157856740"},{url:"/_next/static/chunks/framework-2c79e2a64abdb08b.js",revision:"2c79e2a64abdb08b"},{url:"/_next/static/chunks/main-123c22ad16d66ad9.js",revision:"123c22ad16d66ad9"},{url:"/_next/static/chunks/pages/_app-fec3b77f66f8a08b.js",revision:"fec3b77f66f8a08b"},{url:"/_next/static/chunks/pages/_error-54de1933a164a1ff.js",revision:"54de1933a164a1ff"},{url:"/_next/static/chunks/pages/configuracion-bbd9bdfa8a764070.js",revision:"bbd9bdfa8a764070"},{url:"/_next/static/chunks/pages/index-ecaa7e3bb2b7d3e6.js",revision:"ecaa7e3bb2b7d3e6"},{url:"/_next/static/chunks/pages/just-imdb-35f2871f48e79a63.js",revision:"35f2871f48e79a63"},{url:"/_next/static/chunks/pages/movies-0cba2af07bd3ae46.js",revision:"0cba2af07bd3ae46"},{url:"/_next/static/chunks/pages/platforms-71c27ccd88538ea3.js",revision:"71c27ccd88538ea3"},{url:"/_next/static/chunks/pages/widget-dc3488b76eee529b.js",revision:"dc3488b76eee529b"},{url:"/_next/static/chunks/pages/widget/%5Bid%5D-f418d5aa4c996099.js",revision:"f418d5aa4c996099"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-87b3a303122f2f0d.js",revision:"87b3a303122f2f0d"},{url:"/_next/static/css/b79f5190fece38b4.css",revision:"b79f5190fece38b4"},{url:"/_next/static/media/Inter-Black.2d3c1242.ttf",revision:"2d3c1242"},{url:"/_next/static/media/Inter-Bold.191af3d4.ttf",revision:"191af3d4"},{url:"/_next/static/media/Inter-ExtraBold.9c260c85.ttf",revision:"9c260c85"},{url:"/_next/static/media/Inter-ExtraLight.69b43c98.ttf",revision:"69b43c98"},{url:"/_next/static/media/Inter-Light.4e3a4b8b.ttf",revision:"4e3a4b8b"},{url:"/_next/static/media/Inter-Medium.dde90d17.ttf",revision:"dde90d17"},{url:"/_next/static/media/Inter-Regular.1b761fdd.ttf",revision:"1b761fdd"},{url:"/_next/static/media/Inter-SemiBold.2a2f0a2a.ttf",revision:"2a2f0a2a"},{url:"/_next/static/media/Inter-Thin.2ec59019.ttf",revision:"2ec59019"},{url:"/_next/static/media/disney-plus-app-icon.7d477378.png",revision:"2fe0446e30320d3b5a8f1f8d13e8dd9a"},{url:"/_next/static/media/filmaffinity-app-icon.311954b3.png",revision:"af1e8d79afc00809093d162963527f24"},{url:"/_next/static/media/filmaffinity-chip-icon.9eaaff22.png",revision:"2b751481af151025c706b2918df793aa"},{url:"/_next/static/media/imdb-app-icon.de0d8ee3.png",revision:"aab14353296bf26cb26a05372228a8f8"},{url:"/_next/static/media/imdb-chip-icon.e58ff709.png",revision:"1cb3b047b55e36bec7f0081f5173b22f"},{url:"/_next/static/media/rotten-tomatoes-app-icon.2da873cf.png",revision:"9dab06b2e3019d3b686013f21b6cf539"},{url:"/app.webmanifest",revision:"959ce3121f1f92062e8b4767f89c147c"},{url:"/favicon.ico",revision:"c30c7d42707a47a3f4591831641e50dc"},{url:"/icon-192x192.png",revision:"af9a48c984ef214a253e44925e470797"},{url:"/icon-256x256.png",revision:"a605f54136b4f291570d0c6fe5276719"},{url:"/icon-384x384.png",revision:"77252279e5191a968db6ec38cf3a1823"},{url:"/icon-512x512.png",revision:"cbd58a945c8da58232a28bb36ddd3036"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/thirteen.svg",revision:"53f96b8290673ef9d2895908e69b2f92"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
