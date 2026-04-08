import {
  getMockContentById,
  mockContents,
  type MockContentItem
} from "../../mocks/content/mockContents";

export async function listContents(): Promise<MockContentItem[]> {
  return mockContents;
}

export async function getContent(id: string): Promise<MockContentItem | null> {
  return getMockContentById(id) ?? null;
}
