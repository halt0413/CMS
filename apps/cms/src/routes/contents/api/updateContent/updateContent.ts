import type { CmsPageUpdateRequest, CmsPageUpdateResponse } from "@repo/types";
import { cmsFetch } from "../../../../api/cms/client";
import { toContentItem, type ContentItem } from "../contentItem";

export async function updateContent(
  id: string,
  payload: CmsPageUpdateRequest
): Promise<ContentItem> {
  const response = await cmsFetch<CmsPageUpdateResponse>(`/contents/${id}`, {
    body: JSON.stringify(payload),
    method: "PATCH"
  });

  return toContentItem(response.updated);
}
