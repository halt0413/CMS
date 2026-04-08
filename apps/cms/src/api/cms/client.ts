import { getApiConfig } from "./getApiConfig";

export async function cmsFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const config = getApiConfig();
  const response = await fetch(new URL(path, config.baseUrl), {
    ...init,
    credentials: init?.credentials ?? "include",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {})
    },
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`CMS API request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}
