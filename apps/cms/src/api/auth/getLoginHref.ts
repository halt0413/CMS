import { getCmsApiBaseUrl } from "../../api/cms/getApiConfig";

export function getLoginHref(redirectTo = "/contents"): string | null {
  try {
    const apiUrl = getCmsApiBaseUrl();
    const loginUrl = new URL("/auth/github/login", apiUrl);
    loginUrl.searchParams.set("redirectTo", redirectTo);
    return loginUrl.toString();
  } catch {
    return null;
  }
}
