import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Horse Coat Color Calculator",
  description: "A glam UI to explore horse coat genetics",
  manifest: "/manifest.json",
  icons: { icon: "/icons/icon-192.png", apple: "/icons/icon-192.png" }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
