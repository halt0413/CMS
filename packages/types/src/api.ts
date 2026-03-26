import type { CmsPage, CmsPageInput } from "./cms";
import type { PublicContent } from "./content";
import type { GitHubIssueCreateResult } from "./github";

export type ApiIssue = {
  id: number;
  title: string;
  body: string;
};

export type ApiListResponse<T> = {
  items: T[];
  total: number;
};

export type ApiItemResponse<T> = {
  item: T;
};

export type IssueCreateRequest = Partial<Pick<ApiIssue, "title" | "body">>;

export type IssuesListResponse = {
  items: ApiIssue[];
};

export type IssueCreateResponse = {
  created: ApiIssue;
};

export type CmsPageCreateRequest = CmsPageInput;

export type CmsPageCreateResponse = {
  created: CmsPage;
};

export type CmsPageListResponse = ApiListResponse<CmsPage>;

export type PreviewResponse = {
  slug: string;
  status: "preview";
};

export type CmsPreviewResponse = PreviewResponse & {
  content: PublicContent;
};

export type GitHubSyncResponse = {
  synced: {
    pageId: CmsPage["id"];
    issue: GitHubIssueCreateResult;
  };
};

export type WebhookResponse<TPayload = unknown> = {
  received: true;
  payload: TPayload;
};
