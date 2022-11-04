import { openDB } from "idb";
import { AxiosRequestHeaders } from "axios";
import { authorizationHeader } from "./authHeader";
import { apiV1, apiV2 } from "./myApi";

interface Props {
  url: string;
  headers?: AxiosRequestHeaders;
  params?: any;
  apiVersion?: 1 | 2;
}

const fetchData = async ({
  url,
  headers = authorizationHeader,
  params,
  apiVersion = 1,
}: Props) => {
  const indexedDB = "indexedDB";
  const name = "api-store";
  const version = 1;

  const api = apiVersion === 1 ? apiV1 : apiV2;

  if (navigator.onLine) {
    const { data } = await api.get(url, { headers, params });
    return data;
  } else {
    if (indexedDB in window) {
      const idbPromise = await openDB(name, version);

      let storeUrl = url;

      if (params) {
        storeUrl += "?";
      }
      for (const key in params) {
        storeUrl += `${key}=${String(params[key])}&`;
      }

      if (storeUrl.at(-1) === "&") {
        storeUrl = storeUrl.slice(0, -1);
      }

      const store = idbPromise.transaction("store").objectStore("store");
      const data = await store
        .get(storeUrl)
        .then((value) => value.value)
        .catch((err) => {
          throw new Error("No Data");
        });

      return data;
    }
  }
};

export { fetchData };
