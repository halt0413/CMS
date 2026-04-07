import type { MeResponse, AuthUser } from "@repo/types";
import Link from "next/link";
import { cookies } from "next/headers";
import styles from "./Header.module.css";

function getLoginHref(): string | null {
  const apiUrl = process.env.API_URL ?? process.env.CMS_API_BASE_URL;

  if (!apiUrl) {
    return null;
  }

  try {
    const loginUrl = new URL("/auth/github/login", apiUrl);
    loginUrl.searchParams.set("redirectTo", "/contents");
    return loginUrl.toString();
  } catch {
    return null;
  }
}

async function getCurrentUser(): Promise<AuthUser | null> {
  const apiUrl = process.env.API_URL ?? process.env.CMS_API_BASE_URL;

  if (!apiUrl) {
    return null;
  }

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  if (!cookieHeader) {
    return null;
  }

  try {
    const response = await fetch(new URL("/me", apiUrl), {
      cache: "no-store",
      headers: {
        Cookie: cookieHeader
      }
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as MeResponse;
    return data.user;
  } catch {
    return null;
  }
}

export async function Header() {
  const currentUser = await getCurrentUser();
  const loginHref = getLoginHref();

  return (
    <div className={styles.sidebar}>
      <header className={styles.brand}>
        {currentUser ? (
          <div className={styles.brandIdentity}>
            <img
              alt={`${currentUser.login} GitHub avatar`}
              className={styles.avatar}
              height="36"
              src={currentUser.avatarUrl}
              width="36"
            />
            <p className={styles.handle}>{currentUser.name ?? currentUser.login}</p>
          </div>
        ) : loginHref ? (
          <Link className={styles.loginButton} href={loginHref}>
            ログイン
          </Link>
        ) : (
          <p className={styles.loginMuted}>ログイン</p>
        )}
      </header>

      <nav className={styles.nav}>
        <section className={styles.section}>
          <p className={styles.sectionTitle}>コンテンツ</p>
          <div className={styles.stack}>
            <Link className={`${styles.link} ${styles.linkActive}`} href="/contents">
              <span className={styles.linkMark} />
              portfolio
            </Link>
          </div>
        </section>
      </nav>
    </div>
  );
}
