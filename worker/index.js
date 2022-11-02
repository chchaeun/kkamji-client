self.importScripts("lib/idb.js");

const idbPromise = idb.openDB("test-store", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("test")) {
      db.createObjectStore("test", { keyPath: "id" });
    }
  },
});

self.addEventListener("fetch", (event) => {
  const url = "https://dev.kkamjidot.com/v1/my/challenges";
  const request = event?.request;

  let response;

  if (request?.method === "GET" && request.url === url) {
    if (!event?.request) {
      return;
    }
    response = fetch(event?.request).then((res) => {
      const clonedRes = res.clone();
      clonedRes.json().then((data) => {
        for (let key in data) {
          idbPromise.then((db) => {
            const tx = db.transaction("test", "readwrite");
            const store = tx.objectStore("test");
            store.put({ id: key, value: data[key] });

            return tx;
          });
        }
      });
      return res;
    });
  }
  if (response) {
    event?.respondWith(response);
  }
});
