export type CmsPage = {
  slug: string;
  title: string;
  body: string;
  status: "draft" | "published";
};

export type CmsIssueInput = {
  title: string;
  slug: string;
  body: string;
  status: "draft" | "published";
};
