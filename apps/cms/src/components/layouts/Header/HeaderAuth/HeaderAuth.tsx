import { getLoginHref } from "../../../../api/auth/getLoginHref";
import { useCurrentUserQuery } from "../../../../hooks/useCurrentUserQuery";
import styles from "./HeaderAuth.module.css";

export function HeaderAuth() {
  const { data: currentUser, isPending } = useCurrentUserQuery();
  const loginHref = getLoginHref("/contents");

  if (isPending) {
    return <p className={styles.loginMuted}>読み込み中</p>;
  }

  if (currentUser) {
    return (
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
    );
  }

  if (loginHref) {
    return (
      <a className={styles.loginButton} href={loginHref}>
        ログイン
      </a>
    );
  }

  return <p className={styles.loginMuted}>ログイン</p>;
}
