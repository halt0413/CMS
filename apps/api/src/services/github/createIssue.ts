import type { GitHubIssue, GitHubIssueInput } from "@repo/types";
import type { GitHubIssueGateway } from "../ports";

export function createIssue(
  gitHubIssueGateway: GitHubIssueGateway,
  input: GitHubIssueInput
): Promise<GitHubIssue> {
  return gitHubIssueGateway.createIssue(input);
}
