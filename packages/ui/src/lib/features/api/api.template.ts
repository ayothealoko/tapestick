import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const tapestickEmptyApi = createApi({
  reducerPath: "tapestickApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: () => ({}),
});
