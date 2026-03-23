import { createGitHubClient } from "../client/createGitHubClient";
import type { IssueInput, RepoRef } from "../types/github";

type CreateIssueParams = RepoRef & {
  token: string;
  input: IssueInput;
};

export async function createIssue({
  owner,
  repo,
  token,
  input
}: CreateIssueParams) {
  const octokit = createGitHubClient(token);

  const response = await octokit.rest.issues.create({
    owner,
    repo,
    title: input.title,
    body: input.body,
    labels: input.labels
  });

  return response.data;
}
