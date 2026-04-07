import type { CmsPageDeleteResponse } from "@repo/types";
import { cmsFetch } from "../../../../api/cms/client";

export function deleteContent(id: string): Promise<CmsPageDeleteResponse> {
  return cmsFetch<CmsPageDeleteResponse>(`/contents/${id}`, {
    method: "DELETE"
  });
}
