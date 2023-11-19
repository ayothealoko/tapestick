import {
  useGetGitDirQuery,
  useGetStatusQuery,
  usePostSessionQuery,
} from "../api/server";

import { skipToken } from "@reduxjs/toolkit/query/react";
export function useStatus() {
  const { data: gitDir, isSuccess: isGitDirSucces } = useGetGitDirQuery();
  const { data: session, isSuccess: isSessionSuccess } = usePostSessionQuery(
    isGitDirSucces ? gitDir : skipToken
  );

  const status = useGetStatusQuery(isSessionSuccess ? session : skipToken);

  return status;
}
