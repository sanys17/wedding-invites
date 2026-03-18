import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Forevermore — Digital Wedding Invitations",
  description:
    "Beautifully crafted digital wedding invitations. Customize your design, share a link, and let your guests be enchanted.",
  openGraph: {
    title: "Forevermore — Digital Wedding Invitations",
    description: "Elegant digital invitations delivered as a shareable link.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
