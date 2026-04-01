import type {
  CmsPage,
  GitHubIssue,
  GitHubIssueCreateResult,
  GitHubIssueInput,
  GitHubIssueLabel,
  GitHubIssueUpdateInput
} from "@repo/types";

export interface GitHubIssueGateway {
  addLabels(
    issueNumber: number,
    labels: GitHubIssueLabel[]
  ): Promise<GitHubIssue>;
  createFromPage(page: CmsPage): Promise<GitHubIssueCreateResult>;
  createIssue(input: GitHubIssueInput): Promise<GitHubIssue>;
  getIssue(issueNumber: number): Promise<GitHubIssue>;
  listIssues(): Promise<GitHubIssue[]>;
  updateIssue(issueNumber: number, input: GitHubIssueUpdateInput): Promise<GitHubIssue>;
}
