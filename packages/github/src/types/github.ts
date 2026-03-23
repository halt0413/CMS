export type RepoRef = {
  owner: string;
  repo: string;
};

export type IssueInput = {
  title: string;
  body: string;
  labels?: string[];
};
