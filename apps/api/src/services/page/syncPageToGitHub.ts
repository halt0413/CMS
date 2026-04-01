import { NotFoundError } from "../../lib/errors/AppError";
import type { GitHubIssueGateway, PageRepository } from "../ports";

export type SyncPageToGitHubResult = {
  issue: Awaited<ReturnType<GitHubIssueGateway["createFromPage"]>>;
  pageId: string;
};

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
