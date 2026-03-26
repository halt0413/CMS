import type { CmsPageInput, GitHubRepoRef } from "@repo/types";
import { toGitHubIssueInput } from "@repo/utils";
import { createIssue } from "./createIssue";

type CreateIssueFromCmsPageParams = GitHubRepoRef & {
  token: string;
  page: CmsPageInput;
};

export async function createIssueFromCmsPage({
  owner,
  repo,
  token,
  page
}: CreateIssueFromCmsPageParams) {
  return createIssue({
    owner,
    repo,
    token,
    input: toGitHubIssueInput(page)
  });
}
