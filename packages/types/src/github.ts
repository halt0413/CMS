export type GitHubRepoRef = {
  owner: string;
  repo: string;
};

export type GitHubIssueLabel = string;

export type GitHubIssueInput = {
  title: string;
  body: string;
  labels?: GitHubIssueLabel[];
};

export type GitHubIssue = {
  id: number;
  number: number;
  title: string;
  body: string | null;
  url: string;
  state: "open" | "closed";
  labels: GitHubIssueLabel[];
};

export type GitHubIssueLink = Pick<GitHubIssue, "id" | "number" | "url">;

export type GitHubIssueCreateResult = GitHubIssueLink & {
  title: string;
};

export type GitHubIssueCreateParams = GitHubRepoRef & {
  token: string;
  input: GitHubIssueInput;
};

export type RepoRef = GitHubRepoRef;
export type IssueInput = GitHubIssueInput;
