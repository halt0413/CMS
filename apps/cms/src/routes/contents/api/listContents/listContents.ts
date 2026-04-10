import type { CmsPageListResponse } from "@repo/types";
import { cmsFetch } from "../../../../api/cms/client";
import { toContentItem, type ContentItem } from "../contentItem";

export async function listContents(): Promise<ContentItem[]> {
  const response = await cmsFetch<CmsPageListResponse>("/contents");
  return response.items.map(toContentItem);
}
