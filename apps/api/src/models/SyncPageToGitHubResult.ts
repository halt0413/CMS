import type { GitHubIssueCreateResult } from "@repo/types";

export type SyncPageToGitHubResult = {
  issue: GitHubIssueCreateResult;
  pageId: string;
};
