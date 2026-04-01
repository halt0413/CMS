import type { GitHubIssue, GitHubIssueLabel } from "@repo/types";
import type { GitHubIssueGateway } from "../ports";

export function updateIssueLabels(
  gitHubIssueGateway: GitHubIssueGateway,
  issueNumber: number,
  labels: GitHubIssueLabel[]
): Promise<GitHubIssue> {
  return gitHubIssueGateway.addLabels(issueNumber, labels);
}
