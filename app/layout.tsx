import type { Metadata } from "next";
import "./globals.css";
import { Lora, Jost } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";

const lora = Lora({
  subsets: ["latin", "latin-ext"],
  variable: "--font-serif",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

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
    <html lang="en" className={`${lora.variable} ${jost.variable}`}>
      <body className="font-sans antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
