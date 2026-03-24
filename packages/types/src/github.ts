export type GitHubRepoRef = {
  owner: string;
  repo: string;
};

export type GitHubIssueInput = {
  title: string;
  body: string;
  labels?: string[];
};

export type GitHubIssueCreateParams = GitHubRepoRef & {
  token: string;
  input: GitHubIssueInput;
};

export type RepoRef = GitHubRepoRef;
export type IssueInput = GitHubIssueInput;
