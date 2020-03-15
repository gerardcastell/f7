!function(e){var t={};function n(s){if(t[s])return t[s].exports;var r=t[s]={i:s,l:!1,exports:{}};return e[s].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,s){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(s,r,function(t){return e[t]}.bind(null,r));return s},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=4)}([function(e,t,n){"use strict";try{self["workbox:precaching:5.0.0"]&&_()}catch(e){}},function(e,t,n){"use strict";try{self["workbox:core:5.0.0"]&&_()}catch(e){}},function(e,t,n){"use strict";try{self["workbox:routing:5.0.0"]&&_()}catch(e){}},function(e,t,n){"use strict";try{self["workbox:strategies:5.0.0"]&&_()}catch(e){}},function(e,t,n){"use strict";n.r(t);n(1);const s=(e,...t)=>{let n=e;return t.length>0&&(n+=` :: ${JSON.stringify(t)}`),n};class r extends Error{constructor(e,t){super(s(e,t)),this.name=e,this.details=t}}n(2);const c=e=>{const t=new URL(String(e),location.href);return t.origin===location.origin?t.pathname:t.href};n(0);const a=[],o={get:()=>a,add(e){a.push(...e)}};const i={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},l=e=>[i.prefix,e,i.suffix].filter(e=>e&&e.length>0).join("-"),h=e=>e||l(i.precache),u=new Set;const f=(e,t)=>e.filter(e=>t in e),d=async({cacheName:e,request:t,event:n,matchOptions:s,plugins:r=[]})=>{const c=await self.caches.open(e),a=await y({plugins:r,request:t,mode:"read"});let o=await c.match(a,s);for(const t of r)if("cachedResponseWillBeUsed"in t){const r=t.cachedResponseWillBeUsed;o=await r.call(t,{cacheName:e,event:n,matchOptions:s,cachedResponse:o,request:a})}return o},p=async({request:e,response:t,event:n,plugins:s=[]})=>{let r=t,c=!1;for(let t of s)if("cacheWillUpdate"in t){c=!0;const s=t.cacheWillUpdate;if(r=await s.call(t,{request:e,response:r,event:n}),!r)break}return c||(r=r&&200===r.status?r:void 0),r||null},y=async({request:e,mode:t,plugins:n=[]})=>{const s=f(n,"cacheKeyWillBeUsed");let r=e;for(const e of s)r=await e.cacheKeyWillBeUsed.call(e,{mode:t,request:r}),"string"==typeof r&&(r=new Request(r));return r},w={put:async({cacheName:e,request:t,response:n,event:s,plugins:a=[],matchOptions:o})=>{const i=await y({plugins:a,request:t,mode:"write"});if(!n)throw new r("cache-put-with-no-response",{url:c(i.url)});let l=await p({event:s,plugins:a,response:n,request:i});if(!l)return void 0;const h=await self.caches.open(e),w=f(a,"cacheDidUpdate");let g=w.length>0?await d({cacheName:e,matchOptions:o,request:i}):null;try{await h.put(i,l)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of u)await e()}(),e}for(let t of w)await t.cacheDidUpdate.call(t,{cacheName:e,event:s,oldResponse:g,newResponse:l,request:i})},match:d},g=async({request:e,fetchOptions:t,event:n,plugins:s=[]})=>{if("string"==typeof e&&(e=new Request(e)),n instanceof FetchEvent&&n.preloadResponse){const e=await n.preloadResponse;if(e)return e}const c=f(s,"fetchDidFail"),a=c.length>0?e.clone():null;try{for(let t of s)if("requestWillFetch"in t){const s=t.requestWillFetch,r=e.clone();e=await s.call(t,{request:r,event:n})}}catch(e){throw new r("plugin-error-request-will-fetch",{thrownError:e})}let o=e.clone();try{let r;r="navigate"===e.mode?await fetch(e):await fetch(e,t);for(const e of s)"fetchDidSucceed"in e&&(r=await e.fetchDidSucceed.call(e,{event:n,request:o,response:r}));return r}catch(e){0;for(const t of c)await t.fetchDidFail.call(t,{error:e,event:n,originalRequest:a.clone(),request:o.clone()});throw e}};let m;async function v(e,t){const n=e.clone(),s={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},r=t?t(s):s,c=function(){if(void 0===m){const e=new Response("");if("body"in e)try{new Response(e.body),m=!0}catch(e){m=!1}m=!1}return m}()?n.body:await n.blob();return new Response(c,r)}function R(e){if(!e)throw new r("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:t,url:n}=e;if(!n)throw new r("add-to-cache-list-unexpected-type",{entry:e});if(!t){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const s=new URL(n,location.href),c=new URL(n,location.href);return s.searchParams.set("__WB_REVISION__",t),{cacheKey:s.href,url:c.href}}class _{constructor(e){this._cacheName=h(e),this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map}addToCacheList(e){const t=[];for(const n of e){"string"==typeof n?t.push(n):n&&void 0===n.revision&&t.push(n.url);const{cacheKey:e,url:s}=R(n),c="string"!=typeof n&&n.revision?"reload":"default";if(this._urlsToCacheKeys.has(s)&&this._urlsToCacheKeys.get(s)!==e)throw new r("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(s),secondEntry:e});if("string"!=typeof n&&n.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==n.integrity)throw new r("add-to-cache-list-conflicting-integrities",{url:s});this._cacheKeysToIntegrities.set(e,n.integrity)}if(this._urlsToCacheKeys.set(s,e),this._urlsToCacheModes.set(s,c),t.length>0){const e="Workbox is precaching URLs without revision "+`info: ${t.join(", ")}\nThis is generally NOT safe. `+"Learn more at https://bit.ly/wb-precache";console.warn(e)}}}async install({event:e,plugins:t}={}){const n=[],s=[],r=await self.caches.open(this._cacheName),c=await r.keys(),a=new Set(c.map(e=>e.url));for(const[e,t]of this._urlsToCacheKeys)a.has(t)?s.push(e):n.push({cacheKey:t,url:e});const o=n.map(({cacheKey:n,url:s})=>{const r=this._cacheKeysToIntegrities.get(n),c=this._urlsToCacheModes.get(s);return this._addURLToCache({cacheKey:n,cacheMode:c,event:e,integrity:r,plugins:t,url:s})});return await Promise.all(o),{updatedURLs:n.map(e=>e.url),notUpdatedURLs:s}}async activate(){const e=await self.caches.open(this._cacheName),t=await e.keys(),n=new Set(this._urlsToCacheKeys.values()),s=[];for(const r of t)n.has(r.url)||(await e.delete(r),s.push(r.url));return{deletedURLs:s}}async _addURLToCache({cacheKey:e,url:t,cacheMode:n,event:s,plugins:c,integrity:a}){const o=new Request(t,{integrity:a,cache:n,credentials:"same-origin"});let i,l=await g({event:s,plugins:c,request:o});for(const e of c||[])"cacheWillUpdate"in e&&(i=e);if(!(i?await i.cacheWillUpdate({event:s,request:o,response:l}):l.status<400))throw new r("bad-precaching-response",{url:t,status:l.status});l.redirected&&(l=await v(l)),await w.put({event:s,plugins:c,response:l,request:e===t?o:new Request(e),cacheName:this._cacheName,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,n=this.getCacheKeyForURL(t);if(n){return(await self.caches.open(this._cacheName)).match(n)}}createHandler(e=!0){return async({request:t})=>{try{const e=await this.matchPrecache(t);if(e)return e;throw new r("missing-precache-entry",{cacheName:this._cacheName,url:t instanceof Request?t.url:t})}catch(n){if(e)return fetch(t);throw n}}}createHandlerBoundToURL(e,t=!0){if(!this.getCacheKeyForURL(e))throw new r("non-precached-url",{url:e});const n=this.createHandler(t),s=new Request(e);return()=>n({request:s})}}let U;const L=()=>(U||(U=new _),U);const q=(e,t)=>{const n=L().getURLsToCacheKeys();for(const s of function*(e,{ignoreURLParametersMatching:t,directoryIndex:n,cleanURLs:s,urlManipulation:r}={}){const c=new URL(e,location.href);c.hash="",yield c.href;const a=function(e,t=[]){for(const n of[...e.searchParams.keys()])t.some(e=>e.test(n))&&e.searchParams.delete(n);return e}(c,t);if(yield a.href,n&&a.pathname.endsWith("/")){const e=new URL(a.href);e.pathname+=n,yield e.href}if(s){const e=new URL(a.href);e.pathname+=".html",yield e.href}if(r){const e=r({url:c});for(const t of e)yield t.href}}(e,t)){const e=n.get(s);if(e)return e}};let T=!1;function K(e){T||((({ignoreURLParametersMatching:e=[/^utm_/],directoryIndex:t="index.html",cleanURLs:n=!0,urlManipulation:s}={})=>{const r=h();self.addEventListener("fetch",c=>{const a=q(c.request.url,{cleanURLs:n,directoryIndex:t,ignoreURLParametersMatching:e,urlManipulation:s});if(!a)return void 0;let o=self.caches.open(r).then(e=>e.match(a)).then(e=>e||fetch(a));c.respondWith(o)})})(e),T=!0)}const b=e=>{const t=L(),n=o.get();e.waitUntil(t.install({event:e,plugins:n}).catch(e=>{throw e}))},x=e=>{const t=L();e.waitUntil(t.activate())};n(3);var C;(function(e){L().addToCacheList(e),e.length>0&&(self.addEventListener("install",b),self.addEventListener("activate",x))})([{'revision':'055e307907f91c718e6f426f2cbf41ac','url':'./index.html'},{'revision':'4b8c5f9bc4f853831ab48d5064e375eb','url':'css/app.css'},{'revision':'9ee96e3a07dec6235d3f1a86787a92b7','url':'fonts/Framework7Icons-Regular.eot'},{'revision':'3b973a05c0e1544f7ee8fa23c2a9315a','url':'fonts/Framework7Icons-Regular.ttf'},{'revision':'535bcf7dd3feb41ec20507c3c5b81efb','url':'fonts/Framework7Icons-Regular.woff'},{'revision':'1dfb73e22b9119f547fb880568f56ea2','url':'fonts/Framework7Icons-Regular.woff2'},{'revision':'e79bfd88537def476913f3ed52f4f4b3','url':'fonts/MaterialIcons-Regular.eot'},{'revision':'a37b0c01c0baf1888ca812cc0508f6e2','url':'fonts/MaterialIcons-Regular.ttf'},{'revision':'012cf6a10129e2275d79d6adac7f3b02','url':'fonts/MaterialIcons-Regular.woff'},{'revision':'570eb83859dc23dd0eec423a49e147fe','url':'fonts/MaterialIcons-Regular.woff2'},{'revision':'9e717621b3f80fc888d07d322e70f74e','url':'js/app.js'},{'revision':'5356fa2f66e46e6c05e4cbe319ac7f1d','url':'js/app.js.LICENSE.txt'},{'revision':'91e8a51c938162819e93acea21d757c0','url':'manifest.json'},{'revision':'4e35a6dad5f1ab5b385f86dfe97579b8','url':'static/icons/128x128.png'},{'revision':'47efa07843a29aff095e50015e084e85','url':'static/icons/144x144.png'},{'revision':'ab189ff1c3604cbecd2ccc180b6f7c25','url':'static/icons/152x152.png'},{'revision':'9ad7d46019f56396237834ced5038973','url':'static/icons/192x192.png'},{'revision':'28969ffd71e59d0bb2ca642ac8bb0134','url':'static/icons/256x256.png'},{'revision':'aa0c2f038e42624eb7ee396b272ee852','url':'static/icons/512x512.png'},{'revision':'4e94b1d1edaea36f052ec015c03ff26b','url':'static/icons/apple-touch-icon.png'},{'revision':'4e35a6dad5f1ab5b385f86dfe97579b8','url':'static/icons/favicon.png'}]||[]),K(C),"serviceWorker"in navigator&&window.addEventListener("load",(function(){console.log("helodaaa")}))}]);
//# sourceMappingURL=service-worker.js.map