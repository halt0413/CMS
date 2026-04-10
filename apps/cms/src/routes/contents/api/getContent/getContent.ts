import type { CmsPageItemResponse } from "@repo/types";
import { cmsFetch } from "../../../../api/cms/client";
import { toContentItem, type ContentItem } from "../contentItem";

export async function getContent(id: string): Promise<ContentItem> {
  const response = await cmsFetch<CmsPageItemResponse>(`/contents/${id}`);
  return toContentItem(response.item);
}
