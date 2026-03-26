import { toPageContent } from "@repo/content";
import type {
  ApiItemResponse,
  CmsPage,
  CmsPageCreateResponse,
  CmsPageListResponse,
  CmsPreviewResponse,
  GitHubSyncResponse
} from "@repo/types";
import type { PagePreview } from "../../../models/PagePreview";
import type { SyncPageToGitHubResult } from "../../../models/SyncPageToGitHubResult";

export function toCmsPageListResponse(items: CmsPage[]): CmsPageListResponse {
  return {
    items,
    total: items.length
  };
}

export function toCmsPageItemResponse(page: CmsPage): ApiItemResponse<CmsPage> {
  return {
    item: page
  };
}

export function toCmsPageCreateResponse(created: CmsPage): CmsPageCreateResponse {
  return {
    created
  };
}

export function toCmsPreviewResponse(page: PagePreview): CmsPreviewResponse {
  return {
    slug: page.slug,
    status: "preview",
    content: toPageContent(page)
  };
}

export function toGitHubSyncResponse(
  result: SyncPageToGitHubResult
): GitHubSyncResponse {
  return {
    synced: {
      pageId: result.pageId,
      issue: result.issue
    }
  };
}
