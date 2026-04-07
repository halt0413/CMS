type CmsApiConfig = {
  baseUrl: string;
  token: string;
};

export function getApiConfig(): CmsApiConfig {
  const baseUrl = process.env.CMS_API_BASE_URL ?? process.env.API_URL;
  const token = process.env.CMS_API_TOKEN ?? process.env.ADMIN_API_TOKEN;

  if (!baseUrl) {
    throw new Error("CMS_API_BASE_URL or API_URL is required");
  }

  if (!token) {
    throw new Error("CMS_API_TOKEN or ADMIN_API_TOKEN is required");
  }

  return { baseUrl, token };
}
