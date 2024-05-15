import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { tokenReceived, loggedOut } from "@lib/features/auth/auth.slice";
import { Mutex } from "async-mutex";
import { RootState } from "@lib/store";

// create a new mutex
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: "/",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;

    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const refreshBaseQuery = fetchBaseQuery({
  baseUrl: "/",
  credentials: "include",
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await refreshBaseQuery(
          "/api/v1/refresh-token",
          api,
          extraOptions
        );
        const data = refreshResult.data;
        if (hasAccessToken(data)) {
          api.dispatch(tokenReceived(data.accessToken));
          // retry the initial query
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(loggedOut());
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

interface AccessToken {
  accessToken: string;
}

function hasAccessToken(obj: unknown): obj is AccessToken {
  return (
    (obj as AccessToken)?.accessToken !== undefined &&
    typeof (obj as AccessToken).accessToken === "string"
  );
}
