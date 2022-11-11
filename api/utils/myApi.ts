import axios from "axios";

const apiV1 = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL_V1,
});

const apiV2 = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL_V2,
});

export { apiV1, apiV2 };
