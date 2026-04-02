import type { Metadata } from "next";
import { Header } from "../components/layouts/Header/Header";
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
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
