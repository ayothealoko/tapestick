import { useAuthControllerIsLoggedInMutation } from "@lib/features/api/api.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// if isLoggedIn !== equalTo redirect
export function useLoggedInRedirect(equalTo: boolean, redirect: string) {
  const [getIsLoggedIn, { isLoading, error, data }] =
    useAuthControllerIsLoggedInMutation();
  const router = useRouter();
  console.log(error);
  useEffect(() => {
    if (!data && !error && !isLoading) {
      getIsLoggedIn();
    } else if (data?.isLoggedIn === equalTo) {
      router.push(redirect);
    } else if (true && isError401(error) && !equalTo) {
      // equalTo to is false when error 401
      router.push(redirect);
    }
  }, [data, error, isLoading, getIsLoggedIn, router, redirect, equalTo]);
}

function isError401(err: any): boolean {
  if (err !== undefined && err.status === 401) {
    return true;
  }
  return false;
}
