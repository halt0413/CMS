import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "CMS Console",
  description: "CMS dashboard connected to the API service"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <div className="shell">
          <header className="shell__header">
            <div>
              <p className="eyebrow">Content Pipeline</p>
              <h1>CMS Console</h1>
            </div>
            <nav className="shell__nav">
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/editor">Editor</Link>
              <Link href="/login">Config</Link>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
