import { Link } from "@tanstack/react-router";
import { HeaderAuth } from "./HeaderAuth/HeaderAuth";
import styles from "./Header.module.css";

export function Header() {
  return (
    <div className={styles.sidebar}>
      <header className={styles.brand}>
        <HeaderAuth />
      </header>

      <nav className={styles.nav}>
        <section className={styles.section}>
          <p className={styles.sectionTitle}>コンテンツ</p>
          <div className={styles.stack}>
            <Link className={`${styles.link} ${styles.linkActive}`} to="/contents">
              <span className={styles.linkMark} />
              portfolio
            </Link>
          </div>
        </section>
      </nav>
    </div>
  );
}
