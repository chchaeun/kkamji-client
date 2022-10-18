import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

const apiV2 = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL_V2,
});

export { api, apiV2 };
