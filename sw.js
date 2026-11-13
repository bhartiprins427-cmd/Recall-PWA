// Optional drop-in service worker: keeps the app and the KaTeX files available offline.
const V='recall-v3',CORE=['./','index.html','manifest.json','icon.svg','icon-192.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(CORE.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
const put=(r,res)=>{if(res&&(res.ok||res.type=='opaque')){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res};
self.addEventListener('fetch',e=>{
 const r=e.request;if(r.method!='GET')return;
 const u=new URL(r.url),same=u.origin==location.origin;
 if(!same&&!/(^|\.)(jsdelivr\.net|googleapis\.com|gstatic\.com)$/.test(u.hostname))return;
 e.respondWith(same
  ?fetch(r).then(res=>put(r,res)).catch(()=>caches.match(r).then(h=>h||caches.match('index.html')))
  :caches.match(r).then(h=>h||fetch(r).then(res=>put(r,res))));
});
