import type { CmsPageInput } from "@repo/types";

export const seedPages: Array<{ id: string; input: CmsPageInput; now: string }> = [
  {
    id: "seed-welcome",
    input: {
      slug: "welcome",
      title: "Welcome",
      body: "Initial CMS page",
      status: "published"
    },
    now: "2026-03-26T00:00:00.000Z"
  },
  {
    id: "seed-roadmap",
    input: {
      slug: "roadmap",
      title: "Roadmap",
      body: "Draft page for upcoming updates",
      status: "draft"
    },
    now: "2026-03-26T00:00:00.000Z"
  }
];
