self.importScripts("lib/idb.js");
self.importScripts(
  "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"
);

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
  const url = process.env.NEXT_PUBLIC_API_BASE_URL;
  const request = event?.request;
  let response;

  if (request?.method === "GET" && String(request.url).includes(url)) {
    const pathname = String(request.url).split(url)[1].slice(3);
    const encrypt_pathname = CryptoJS.SHA256(pathname).toString();

    console.log(encrypt_pathname);
    if (!event?.request) {
      return;
    }

    response = fetch(event?.request).then((res) => {
      const clonedRes = res.clone();
      clonedRes.json().then((data) => {
        idbPromise.then((db) => {
          const tx = db.transaction(storeName, "readwrite");
          const store = tx.objectStore(storeName);

          const encrypt_data = CryptoJS.AES.encrypt(
            JSON.stringify(data),
            url
          ).toString();

          store.put({ id: encrypt_pathname, value: encrypt_data });
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
