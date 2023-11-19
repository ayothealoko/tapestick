import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetGitDir, PostSession, Status } from "shared-code";

const endpoints = {
  gitDir: "/v1/gitDir",
  session: "/v1/session",
  status: "/v1/status",
};

export const serverApi = createApi({
  reducerPath: "serverApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_API,
  }),
  endpoints: (build) => ({
    getGitDir: build.query<GetGitDir, void>({
      query: () => ({
        url: endpoints.gitDir,
        method: "GET",
      }),
    }),
    postSession: build.query<PostSession, { gitDir: string }>({
      query: (data) => ({
        url: endpoints.session,
        method: "POST",
        body: data,
      }),
    }),
    getStatus: build.query<Status, PostSession>({
      query: (data) => ({
        url: `${endpoints.status}?session=${data.session}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetGitDirQuery, usePostSessionQuery, useGetStatusQuery } =
  serverApi;
