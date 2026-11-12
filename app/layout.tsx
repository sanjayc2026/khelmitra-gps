import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GPS Location App",
  description: "Next.js project with Geolocation API integrated",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}