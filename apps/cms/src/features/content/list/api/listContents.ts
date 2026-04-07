import type { CmsPage, CmsPageListResponse } from "@repo/types";
import { cmsFetch } from "../../shared/api/client";

export async function listContents(): Promise<CmsPage[]> {
  const response = await cmsFetch<CmsPageListResponse>("/contents");
  return response.items;
}
