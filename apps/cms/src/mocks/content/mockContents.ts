import type { CmsPage } from "@repo/types";
import { notFound } from "next/navigation";

export type ContentType = string;

export type MockContentItem = CmsPage & {
  contentType: ContentType;
};

export const mockContents: MockContentItem[] = [
  {
    id: "cnt_portfolio",
    slug: "portfolio",
    title: "portfolio",
    body: "",
    status: "draft",
    createdAt: "2026-04-01T10:00:00.000Z",
    updatedAt: "2026-04-02T08:30:00.000Z",
    contentType: "プロフィール"
  },
  {
    id: "cnt_reward-pocket",
    slug: "reward-pocket",
    title: "ご褒美ポケット",
    body:
      "子供が親から課されたお手伝いをしてお小遣いをもらうという体験を通じて、子供の金銭感覚・生活力・自立心を養う家庭向けアプリ",
    status: "draft",
    createdAt: "2026-03-28T04:15:00.000Z",
    updatedAt: "2026-04-02T10:45:00.000Z",
    contentType: "作品"
  },
  {
    id: "cnt_api-docs",
    slug: "api-docs",
    title: "API ドキュメント",
    body: "CMS の公開 API と認証フローを整理した内部向けドキュメント。",
    status: "published",
    createdAt: "2026-03-12T02:20:00.000Z",
    updatedAt: "2026-04-01T06:10:00.000Z",
    publishedAt: "2026-04-01T06:10:00.000Z",
    contentType: "ドキュメント"
  },
  {
    id: "cnt_tech-stack",
    slug: "tech-stack",
    title: "技術スタック",
    body: "TypeScript / Next.js / Hono / pnpm を中心に構成している技術一覧ページ。",
    status: "published",
    createdAt: "2026-03-15T03:40:00.000Z",
    updatedAt: "2026-04-03T05:25:00.000Z",
    publishedAt: "2026-04-03T05:25:00.000Z",
    contentType: "技術スタック"
  }
];

export function getMockContentById(id: string): MockContentItem | undefined {
  return mockContents.find((content) => content.id === id);
}

export function requireMockContent(id: string): MockContentItem {
  const content = getMockContentById(id);

  if (!content) {
    notFound();
  }

  return content;
}
