export function isOAuthStateExpired(
  createdAt: string,
  now: string,
  ttlSeconds: number
): boolean {
  const createdAtMs = Date.parse(createdAt);
  const nowMs = Date.parse(now);

  if (!Number.isFinite(createdAtMs) || !Number.isFinite(nowMs)) {
    return true;
  }

  return nowMs - createdAtMs > ttlSeconds * 1000;
}
