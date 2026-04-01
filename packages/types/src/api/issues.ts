export type ApiIssue = {
  id: number;
  title: string;
  body: string;
};

export type IssueCreateRequest = Partial<Pick<ApiIssue, "title" | "body">>;

export type IssuesListResponse = {
  items: ApiIssue[];
};

export type IssueCreateResponse = {
  created: ApiIssue;
};
