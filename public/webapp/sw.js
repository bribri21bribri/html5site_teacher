var cachename = "v4";
//var urlsToCache = ["/webapp/","/webapp/index.html","/webapp/site.css","/webapp/images/","/webapp/manifest.json"];
//var urlsToCache = ["/webapp/","/webapp/images/","/webapp/index.html","/webapp/site.css","/webapp/sw.js","/webapp/manifest.json"];
var urlsToCache = ["/webapp/","/webapp/index.html","/webapp/site.css","/webapp/sw.js"];
//會將靜態的檔案存到cache storage
self.addEventListener("install",function(event){
   event.waitUntil(caches.open(cachename).then(function(cache){
    return cache.addAll(urlsToCache);
   }))
})

//檢查cache storage中有無使用者要瀏覽的網頁
self.addEventListener("fetch",function(event){
    //console.log(event.request);
    event.respondWith(
        caches.match(event.request).then(function(response){
            return response || fetch(event.request);
        //    console.log(response);
            // if(response){
            //     return response
            // }
            // return fetch(event.request); 
        })
    )
})

//刪除舊的cache storage
self.addEventListener("activate",function(event){
    event.waitUntil(
        caches.keys().then(function(names){
            Promise.all(names.map(function(name){
                if(name != cachename){
                    return caches.delete(name);
                }
            }))
        })
    )
})