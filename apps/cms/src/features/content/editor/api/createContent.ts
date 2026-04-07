import type {
  CmsPage,
  CmsPageCreateRequest,
  CmsPageCreateResponse
} from "@repo/types";
import { cmsFetch } from "../../shared/api/client";

export async function createContent(
  payload: CmsPageCreateRequest
): Promise<CmsPage> {
  const response = await cmsFetch<CmsPageCreateResponse>("/contents", {
    method: "POST",
    body: JSON.stringify(payload)
  });

  return response.created;
}
