import { NotFoundError } from "../../lib/errors/AppError";
import type { PageRepository } from "../ports";
import type { PagePreview } from "./getPagePreview";

export async function getPagePreviewById(
  pageRepository: PageRepository,
  id: string
): Promise<PagePreview> {
  const page = await pageRepository.findById(id);

  if (!page) {
    throw new NotFoundError("Page not found");
  }

  return page;
}
