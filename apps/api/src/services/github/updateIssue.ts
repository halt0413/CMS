import type { GitHubIssue, GitHubIssueUpdateInput } from "@repo/types";
import type { GitHubIssueGateway } from "../ports";

export function updateIssue(
  gitHubIssueGateway: GitHubIssueGateway,
  issueNumber: number,
  input: GitHubIssueUpdateInput
): Promise<GitHubIssue> {
  return gitHubIssueGateway.updateIssue(issueNumber, input);
}
