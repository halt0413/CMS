"use server";

import { revalidatePath } from "next/cache";
import { createCmsPage, syncCmsPageToGitHub } from "../../lib/api";

function getText(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export async function createPageAction(formData: FormData) {
  const status = getText(formData, "status") === "published" ? "published" : "draft";

  await createCmsPage({
    slug: getText(formData, "slug"),
    title: getText(formData, "title"),
    body: getText(formData, "body"),
    status
  });

  revalidatePath("/dashboard");
}

export async function syncPageAction(formData: FormData) {
  const id = getText(formData, "id");

  if (!id) {
    throw new Error("Page id is required");
  }

  await syncCmsPageToGitHub(id);
  revalidatePath("/dashboard");
}
