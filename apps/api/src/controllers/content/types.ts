import type { CmsPage, CmsPageInput, CmsPagePatch } from "@repo/types";
import type { PagePreview } from "../../services/page/getPagePreview";

export type ContentsControllerHandlers = {
  createContent: (payload: CmsPageInput) => CmsPage;
  deleteContent: (id: string) => {
    deleted: true;
    id: string;
  };
  getContent: (id: string) => CmsPage;
  getContentPreviewById: (id: string) => PagePreview;
  listContents: () => CmsPage[];
  updateContent: (id: string, payload: CmsPagePatch) => CmsPage;
};
