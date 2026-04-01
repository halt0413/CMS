import type { GitHubIssue } from "@repo/types";
import type { GitHubIssueGateway } from "../ports";

export function listIssues(
  gitHubIssueGateway: GitHubIssueGateway
): Promise<GitHubIssue[]> {
  return gitHubIssueGateway.listIssues();
}
