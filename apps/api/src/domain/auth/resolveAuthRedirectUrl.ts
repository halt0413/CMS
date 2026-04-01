import { ConfigurationError } from "../../lib/errors/AppError";

export function resolveAuthRedirectUrl(
  cmsUrl: string,
  redirectTo?: string
): string {
  if (!cmsUrl) {
    throw new ConfigurationError("CMS_URL is required");
  }

  const baseUrl = new URL(cmsUrl);

  if (!redirectTo) {
    return baseUrl.toString();
  }

  if (redirectTo.startsWith("/")) {
    return new URL(redirectTo, baseUrl).toString();
  }

  const requestedUrl = new URL(redirectTo);

  // OAuth後のopen redirectを防ぐため、CMSと同一originに限定する
  if (requestedUrl.origin !== baseUrl.origin) {
    return baseUrl.toString();
  }

  return requestedUrl.toString();
}
