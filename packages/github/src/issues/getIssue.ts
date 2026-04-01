import type { GitHubIssueGetParams } from "@repo/types";
import { createGitHubClient } from "../client/createGitHubClient";

export async function getIssue({
  issueNumber,
  owner,
  repo,
  token
}: GitHubIssueGetParams) {
  const octokit = createGitHubClient(token);
  const response = await octokit.rest.issues.get({
    owner,
    repo,
    issue_number: issueNumber
  });

  return response.data;
}
