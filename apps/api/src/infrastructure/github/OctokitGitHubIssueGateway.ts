import { createIssueFromCmsPage } from "@repo/github";
import type { CmsPage, GitHubIssueCreateResult } from "@repo/types";
import { ConfigurationError } from "../../lib/errors/AppError";
import type { GitHubIssueGateway } from "../../services/ports/index";

type OctokitGitHubIssueGatewayConfig = {
  owner?: string;
  repo?: string;
  token?: string;
};

export class OctokitGitHubIssueGateway implements GitHubIssueGateway {
  constructor(private readonly config: OctokitGitHubIssueGatewayConfig) {}

  async createFromPage(page: CmsPage): Promise<GitHubIssueCreateResult> {
    const { owner, repo, token } = this.config;

    if (!owner || !repo || !token) {
      throw new ConfigurationError(
        "GITHUB_TOKEN, GITHUB_OWNER and GITHUB_REPO are required"
      );
    }

    const issue = await createIssueFromCmsPage({
      owner,
      repo,
      token,
      page
    });

    return {
      id: issue.id,
      number: issue.number,
      title: issue.title,
      url: issue.html_url
    };
  }
}
