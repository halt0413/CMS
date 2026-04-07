import type { CmsPage, CmsPageItemResponse } from "@repo/types";
import { cmsFetch } from "../../shared/api/client";

export async function getContent(id: string): Promise<CmsPage> {
  const response = await cmsFetch<CmsPageItemResponse>(`/contents/${id}`);
  return response.item;
}
