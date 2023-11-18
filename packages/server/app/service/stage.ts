import { setStageModel } from "../model/git/stage.js";

export async function postStageService(gitDir: URL, files: URL[]) {
  return setStageModel(gitDir, files);
}
