import { openDB } from "idb";
import { AxiosRequestHeaders } from "axios";
import { authorizationHeader } from "./authHeader";
import { apiV1, apiV2 } from "./myApi";
import { getJwtToken } from "./getJwtToken";

const CryptoJS = require("crypto-js");

interface Props {
  url: string;
  headers?: AxiosRequestHeaders;
  params?: any;
  apiVersion?: 1 | 2;
}

const getStoreUrl = (url: string, params: any) => {
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

  return storeUrl;
};

const fetchData = async ({
  url,
  headers = authorizationHeader(getJwtToken()),
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
      const store = idbPromise.transaction("store").objectStore("store");

      const storeUrl = getStoreUrl(url, params);
      const encrypt_storeUrl = CryptoJS.SHA256(storeUrl).toString();

      const data = await store
        .get(encrypt_storeUrl)
        .then((value) => {
          const bytes = CryptoJS.AES.decrypt(
            value.value,
            process.env.NEXT_PUBLIC_API_BASE_URL
          );
          const decrypt_value = bytes.toString(CryptoJS.enc.Utf8);

          return JSON.parse(decrypt_value);
        })
        .catch(() => {
          throw new Error("No Data");
        });

      return data;
    }
  }
};

export { fetchData };
