import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { ChittemGptDock } from "@/components/chittem-gpt-dock";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/content/site-data";
import { getSiteUrl } from "@/lib/site";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: `${siteConfig.fullName} | ${siteConfig.title}`,
    template: `%s | ${siteConfig.fullName}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.fullName} | ${siteConfig.title}`,
    description: siteConfig.description,
    siteName: siteConfig.fullName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.fullName} | ${siteConfig.title}`,
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#efe5d4",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="site-shell">
          <SiteHeader />
          <main className="site-main">{children}</main>
          <ChittemGptDock />
        </div>
      </body>
    </html>
  );
}
