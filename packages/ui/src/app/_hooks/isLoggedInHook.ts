import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// if isLoggedIn !== equalTo redirect
export function useLoggedInRedirect(equalTo: boolean, redirect: string) {
  const router = useRouter();
  useEffect(() => {
    isLoggeedInRequest()
      .then((res) => {
        const data = res.data;

        if (data.isLoggedIn === equalTo) {
          router.push(redirect);
        }
      })
      .catch();
  }, []);
}

interface IsLoggedInResponse {
  isLoggedIn: boolean;
}

async function isLoggeedInRequest<T = IsLoggedInResponse>(): Promise<
  AxiosResponse<T, any>
> {
  return axios.get<T>("/api/v1/auth/is-logged-in", {
    withCredentials: true,
    headers: {
      Accept: "application/json",
    },
  });
}
