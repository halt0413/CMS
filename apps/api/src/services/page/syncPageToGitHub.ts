import type { GitHubIssueGateway } from "../../repositories/GitHubIssueGateway";
import type { PageRepository } from "../../repositories/PageRepository";
import { NotFoundError } from "../errors/AppError";
import type { SyncPageToGitHubResult } from "../../models/SyncPageToGitHubResult";

type SyncPageToGitHubDependencies = {
  gitHubIssueGateway: GitHubIssueGateway;
  pageRepository: PageRepository;
};

export async function syncPageToGitHub(
  pageId: string,
  { gitHubIssueGateway, pageRepository }: SyncPageToGitHubDependencies
): Promise<SyncPageToGitHubResult> {
  const page = pageRepository.findById(pageId);

  if (!page) {
    throw new NotFoundError("Page not found");
  }

  const issue = await gitHubIssueGateway.createFromPage(page);

  return {
    pageId: page.id,
    issue
  };
}
