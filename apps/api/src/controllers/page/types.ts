import type { CmsPage, CmsPageInput } from "@repo/types";
import type { PagePreview } from "../../services/page/getPagePreview";
import type { SyncPageToGitHubResult } from "../../services/page/syncPageToGitHub";

export type PagesControllerHandlers = {
  createPage: (payload: CmsPageInput) => CmsPage;
  getPage: (id: string) => CmsPage;
  getPagePreviewById: (id: string) => PagePreview;
  listPages: () => CmsPage[];
  syncPageToGitHub: (id: string) => Promise<SyncPageToGitHubResult>;
};

export type PreviewControllerHandlers = {
  getPagePreviewBySlug: (slug: string) => PagePreview;
};
