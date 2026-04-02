import type {
  CmsPage,
  CmsPagePatch,
  CmsPageUpdateResponse
} from "@repo/types";
import { cmsFetch } from "./client";

export async function updateContent(
  id: string,
  payload: CmsPagePatch
): Promise<CmsPage> {
  const response = await cmsFetch<CmsPageUpdateResponse>(`/contents/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload)
  });

  return response.updated;
}
