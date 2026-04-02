import Link from "next/link";

export function Header() {
  return (
    <header className="shell__header">
      <div>
        <p className="eyebrow">Content Pipeline</p>
        <h1>CMS Console</h1>
      </div>
      <nav className="shell__nav">
        <Link href="/contents">Contents</Link>
        <Link href="/contents/new">New</Link>
        <Link href="/login">Login</Link>
      </nav>
    </header>
  );
}
