import type { CmsPage, CmsPageInput, CmsPagePatch } from "@repo/types";
import type { PagePreview } from "../../services/page/getPagePreview";

export type ContentsControllerHandlers = {
  createContent: (payload: CmsPageInput) => Promise<CmsPage>;
  deleteContent: (id: string) => Promise<{
    deleted: true;
    id: string;
  }>;
  getContent: (id: string) => Promise<CmsPage>;
  getContentPreviewById: (id: string) => Promise<PagePreview>;
  listContents: () => Promise<CmsPage[]>;
  updateContent: (id: string, payload: CmsPagePatch) => Promise<CmsPage>;
};
