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
        console.log(data);

        if (data.isLoggedIn === equalTo) {
          console.log("redirect");
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
  return axios.get<T>("/api/v1/login/is-logged-in", {
    withCredentials: true,
    headers: {
      Accept: "application/json",
    },
  });
}
