import type {
  GitHubIssue,
  GitHubIssueInput,
  GitHubIssueLabel,
  GitHubIssueUpdateInput
} from "@repo/types";

export type GitHubControllerHandlers = {
  addIssueLabels: (
    issueNumber: number,
    labels: GitHubIssueLabel[]
  ) => Promise<GitHubIssue>;
  createIssue: (input: GitHubIssueInput) => Promise<GitHubIssue>;
  getIssue: (issueNumber: number) => Promise<GitHubIssue>;
  listIssues: () => Promise<GitHubIssue[]>;
  updateIssue: (
    issueNumber: number,
    input: GitHubIssueUpdateInput
  ) => Promise<GitHubIssue>;
};
