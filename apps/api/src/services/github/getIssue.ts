import type { GitHubIssue } from "@repo/types";
import type { GitHubIssueGateway } from "../ports";

export function getIssue(
  gitHubIssueGateway: GitHubIssueGateway,
  issueNumber: number
): Promise<GitHubIssue> {
  return gitHubIssueGateway.getIssue(issueNumber);
}
