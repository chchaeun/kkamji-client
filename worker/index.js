self.importScripts("lib/idb.js");

const dbName = "api-store";
const storeName = "store";

const idbPromise = idb.openDB(dbName, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(storeName)) {
      db.createObjectStore(storeName, { keyPath: "id" });
    }
  },
});

self.addEventListener("fetch", (event) => {
  const url = "https://dev.kkamjidot.com";
  const request = event?.request;
  let response;

  if (request?.method === "GET" && String(request.url).includes(url)) {
    const pathname = String(request.url).split(url)[1].slice(3);

    if (!event?.request) {
      return;
    }

    response = fetch(event?.request).then((res) => {
      const clonedRes = res.clone();
      clonedRes.json().then((data) => {
        idbPromise.then((db) => {
          const tx = db.transaction(storeName, "readwrite");
          const store = tx.objectStore(storeName);
          store.put({ id: pathname, value: data });
          return tx;
        });
      });
      return res;
    });
  }
  if (response) {
    event?.respondWith(response);
  }
});
