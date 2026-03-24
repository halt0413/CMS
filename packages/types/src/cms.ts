export type CmsContentStatus = "draft" | "published";

export type CmsPageInput = {
  slug: string;
  title: string;
  body: string;
  status: CmsContentStatus;
};

export type CmsIssueInput = CmsPageInput;
