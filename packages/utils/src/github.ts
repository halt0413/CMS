import type { CmsPageInput, GitHubIssueInput } from "@repo/types";
import { normalizeSlug } from "./slug";

export function toGitHubIssueInput(input: CmsPageInput): GitHubIssueInput {
  const slug = normalizeSlug(input.slug);
  const title = input.title.trim();
  const labels = ["cms", input.status];
  const body = [
    `slug: ${slug}`,
    `status: ${input.status}`,
    "",
    input.body.trim()
  ].join("\n");

  return {
    title: `[CMS] ${title}`,
    body,
    labels
  };
}
