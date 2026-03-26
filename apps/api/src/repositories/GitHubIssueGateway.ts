import type { CmsPage, GitHubIssueCreateResult } from "@repo/types";

export interface GitHubIssueGateway {
  createFromPage(page: CmsPage): Promise<GitHubIssueCreateResult>;
}
