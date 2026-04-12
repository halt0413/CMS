import type { CmsPage, CmsPageInput } from "@repo/types";
import type { PagePreview } from "../../services/page/getPagePreview";
import type { SyncPageToGitHubResult } from "../../services/page/syncPageToGitHub";

export type PagesControllerHandlers = {
  createPage: (payload: CmsPageInput) => Promise<CmsPage>;
  getPage: (id: string) => Promise<CmsPage>;
  getPagePreviewById: (id: string) => Promise<PagePreview>;
  listPages: () => Promise<CmsPage[]>;
  syncPageToGitHub: (id: string) => Promise<SyncPageToGitHubResult>;
};

export type PreviewControllerHandlers = {
  getPagePreviewBySlug: (slug: string) => Promise<PagePreview>;
};
